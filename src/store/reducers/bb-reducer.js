import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {

	ingredients:null,
	totalPrice:4,
	error: false,
	building:false,
	

};

const INGREDIENT_PRICES = {

	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7

}

const reducer = (state = initialState, action) => {

	//action.type  "type" is the property that is returned on the object from the action creator
	switch(action.type){

		case actionTypes.ADD_INGREDIENT:
			return{
				...state,
				ingredients: {
					//the ingredients object inside the state has to be cloned separately
					//otherwise it will point to the original state
					...state.ingredients,
					[action.ingredientName]:state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				building:true

			};

		case actionTypes.REMOVE_INGREDIENT:
			return{

				...state,
				ingredients: {
					//the ingredients object inside the state has to be cloned separately
					//otherwise it will point to the original state
					...state.ingredients,
					[action.ingredientName]:state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
				building:true


				
			};




			//SET_INGREDIENTS gets executed when the burgerBuilder component mounts
			//the values for the ingredients are retrieved from the server
			//they are all '0',
			//the price is hard coded to 4
		case actionTypes.SET_INGREDIENTS:
			return{
				...state,
				ingredients:{
					/*this was done so that the ingredients would appear in the order we want.
					  when they come from firebase, the order is arranged by firebase.
					*/
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat
				},
				totalPrice: 4,
				error:false,
				building:false
			};

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return{

				...state,
				error: true

			}

		

		

		default:
			return state;



	}



}

export default reducer;