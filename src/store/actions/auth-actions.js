import * as actionTypes from "./actionTypes";

/*this is a new axios instance.  it is not the one
  from axios-orders.  we are doing this because
  we don't use the baseURL that is set up in that one	
*/
import axios from "axios";





export const authStart = () =>{

	return {
		type:actionTypes.AUTH_START
	}


}

export const authSuccess = (token, userId) =>{

	return {
		type:actionTypes.AUTH_SUCCESS,
		idToken:token,  //this will be referred to as action.idToken in the reducer
		userId:userId	//this will be referred to as action.userId in the reducer
	}

	
}

export const authFail = (error) =>{

	return {
		type:actionTypes.AUTH_FAIL,
		error:error
	}

	
}

export const logout = () =>{

	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	console.log("logout");
	return{

		type:actionTypes.AUTH_LOGOUT,

	}

}

export const checkAuthTimeout = (expirationTime) =>{

	return dispatch => {
		console.log("checkAuthTimeout");
		setTimeout(()=>{

			dispatch(logout());

		}, expirationTime * 1000);
			//the expiration time that is returned from firebase is 3600 seconds
			//setTimeout expects time in milliseconds.  this turns it into 36000 milliseconds
			//this will dispatch the logout action in 36000 ms, which is one hour
	};

};

export const auth = (email, password, isSignup) =>{

	//dispatch is made available by redux-thunk
	//this is the asynchronous code
	return dispatch =>{
		
			//...
			dispatch(authStart());
			const authData = {

				email:email,
				password:password,
				returnSecureToken:true
			}

				//default is the signUp URL
			let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBESOP3JoGq_CMFN9vONWjCJHemDmnfG1w";

			if(!isSignup){

				//this is the verifyPassword URL
				url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBESOP3JoGq_CMFN9vONWjCJHemDmnfG1w";
			}


			axios.post(url, authData)
				.then(response =>{
					console.log(response);

						//getTime() converts the date to milliseconds. Multiplying expiresIn by 1000 also converts that value to milliseconds.  This allows them to be added together.  This will be a value one hour in the future from the time of login
					const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

					localStorage.setItem("token", response.data.idToken);
					localStorage.setItem("expirationDate", expirationDate);
					localStorage.setItem("userId", response.data.localId);

					dispatch(authSuccess(response.data.idToken, response.data.localId));
					dispatch(checkAuthTimeout(response.data.expiresIn));
					//this sets the app to logout after one hour
				})
				.catch(error =>{
					console.log(error);
					dispatch(authFail(error.response.data.error));
				})

		}


}


export const setAuthRedirectPath = (path) => {

	return {
		type:actionTypes.SET_AUTH_REDIRECT_PATH,
		path:path
	}

}

export const AuthCheckState = () =>{

	return dispatch => {

	const token = localStorage.getItem("token");
	

	if(!token){

		dispatch(logout());


	} else{
		const userId = localStorage.getItem("userId");

		//localStorage.getItem("expirationDate") will return a string. passing it as an argument will return a new Date object

		const expirationDate = new Date(localStorage.getItem("expirationDate"));

		if(expirationDate > new Date()){

			//if the expirationDate is greater than the new Date() at the time this code is run,
			//it means we are logged in
			console.log(expirationDate.getTime() - new Date().getTime());
			console.log("AuthCheckState if(expdate > new Date)")
			dispatch(authSuccess(token, userId));
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));

		} else{

			//if the expirationDate is less than the new Date() at the time this code is run
			//it means the app should log out as we are only supposed to be logged in for one hour

			dispatch(logout());

		}

		

	}

}


}

