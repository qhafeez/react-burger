import React, { Component } from "react";

import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.css"; 
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import axiosInstance from "../../axios-orders";
import Spinner from  "../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";



class Auth extends Component {


	componentDidMount(){
		if(!this.props.building && this.props.authRedirectPath !== "/"){



			//this sets the redirect path in the state to the homepage because
			//at the bottom of this file we pass "/" as the argument to the function
			
			this.props.setAuthRedirectPath();

		}
	}

	state = {

		controls: {

			email:{

					elementType: "input",
					elementConfig: {
						type:"email",
						placeholder: "Email Address"
					},
					value: "",
					validation:{
						required:true,
						isEmail:true
						
					},
					valid:false,
					touched:false
					

				},
				password:{

					elementType: "input",
					elementConfig: {
						type:"password",
						placeholder: "Password"
					},
					value: "",
					validation:{
						required:true,
						minLength:6
						
					},
					valid:false,
					touched:false
					

				}


		},
		isSignup:true,
		


	}


	checkValidity(value, rules){

					//value is the value property in the orderForm object
					//rules is the validation property (which is an object) in each orderForm object

		let isValid = true;

		if (rules.required){
			console.log("first if");
			isValid = value.trim() !== "" && isValid;
			

		}

		if (rules.minLength){
			console.log("second if");
			isValid = value.length >= rules.minLength  && isValid ;
			
		}

		if( rules.maxLength){
			console.log("third if");
			isValid = value.length <= rules.maxLength  && isValid ;
			
		}

		 if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

         if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }


		return isValid;

	}

	inputChangeHandler = (event, controlName) => {




		const updatedControls = {



		//this copies the controls object
		//from our state
			...this.state.controls,

		//this creates and object that will
		//update the object within our controls object
			[controlName]:{
				...this.state.controls[controlName],
				value: event.target.value,
				valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched:true
			}
			
		}

		this.setState({
			controls:updatedControls
		})


	}

	submitHandler = (event) =>{
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.isSignup);


	}

	switchAuthModeHandler = () =>{

		this.setState(prevState =>{
			return{
				isSignUp: !prevState.isSignUp
			}
		});
		console.log(this.state.isSignUp)
	}




	render(){



		const formElementsArray =[];
			for (let key in this.state.controls){

				formElementsArray.push({
					id:key,
					config: this.state.controls[key]
				});

			}

			let form = formElementsArray.map(formElement => {

				return <Input 

					key={formElement.id}
					elementType={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig} 
					value={formElement.config.value} 
					changed={(event)=>this.inputChangeHandler(event, formElement.id)} 
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}	

				/>

			});

			if(this.props.loading){

				form = <Spinner />;

			}

			let errorMessage = null;

			if(this.props.error){

				errorMessage = (
									//the error property is an object returned from
									//firebase. message is one of it's properties
									<p>{this.props.error.message}</p>
								)

			}

			let authRedirect = null;

			if(this.props.isAuthenticated){
				//redirect to home page after successful redirect

				

					authRedirect = <Redirect to={this.props.authRedirectPath} />
				
				
			}


		return(


				<div className={classes.Auth}>
						{authRedirect}
						{errorMessage}
					<form onSubmit={this.submitHandler}>
							{form}
						<Button btnType="Success">Submit</Button>
					</form>	
						<Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? "Sign In" : "SIGN UP"}</Button>
				</div>

			);

	}

}

const mapStateToProps = state =>{

	return{

		loading:state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token,
		building: state.burgerBuilder.building,
		authRedirectPath:state.auth.authRedirectPath


	}


}
	
const mapDispatchToProps = dispatch =>{

	return {

		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axiosInstance));