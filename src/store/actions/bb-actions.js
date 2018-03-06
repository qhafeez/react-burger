import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const addIngredient = (ingName) =>{

	return {

		type:actionTypes.ADD_INGREDIENT,
		ingredientName: ingName

	}

}

export const removeIngredient = (ingName) =>{

	return {

		type:actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName

	}

}

export const setIngredients = (ingredients) =>{
	//this is synchronous code

	return {
			type: actionTypes.SET_INGREDIENTS,
			ingredients: ingredients
	}

}


export const fetchIngredientsFailed = () => {

	return {
		type:actionTypes.FETCH_INGREDIENTS_FAILED
	}

}




export const initIngredients = () =>{

	//this is avaiable because of redux-thunk
	//this is async code
	return dispatch =>{

			axiosInstance.get("https://react-q-burger.firebaseio.com/ingredients.json")
				 .then(response => {
				 	dispatch(setIngredients(response.data));
				 })
				 .catch(error =>{
				 	dispatch(fetchIngredientsFailed());				 	
				 });


	}

}



















