import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import Aux from "../../HOC/Aux/Aux";
import Burger from  "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";   


const INGREDIENT_PRICES = {

	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7

}

class BurgerBuilder extends Component {

	// constructor(props){
	// 	super(props);
	// 	this.state={}

	// };  This is older syle of syntax.  it still works

	state={
		// ingredients: null,

		// totalPrice:4,

		// purchasable:false,
		purchasing:false,
		
	
	}

componentDidMount () {

	console.log(this.props);

	this.props.onInitIngredients();

	

	

}




updatePurchasableState = (ingredients) =>{

//instructor's logic
	const sum = Object.keys(ingredients).map(igKey =>{

				return ingredients[igKey];

			}).reduce( (sum, el) => {

				return sum + el;


			}, 0);

			return sum > 0
		}


//my logic
// 	let sum=0;
// 		for(let key in ingredients){

// 			sum+= ingredients[key]

// 		}
// 		this.setState({purchasable:sum > 0});

// }



// addIngredientHandler = (type) =>{
// 	const oldCount = this.state.ingredients[type];
// 	const updatedCount = oldCount + 1;
// 	const updatedIngredients = {
// 		...this.state.ingredients
// 	};
	
// 	updatedIngredients[type] = updatedCount;
// 	const priceAddition = INGREDIENT_PRICES[type];
// 	const oldPrice = this.state.totalPrice;
// 	const newPrice = oldPrice + priceAddition;
	
// 	this.setState({
// 		ingredients: updatedIngredients,
// 		totalPrice: newPrice
// 	});




// this.updatePurchasableState(updatedIngredients);

// }



// removeIngredientHandler = (type) =>{

// 	const oldCount = this.state.ingredients[type];

// 	let updatedCount=0

// 	if(oldCount > 0){
		
// 		 updatedCount = oldCount - 1;
	
// 	} 
	
// 	const updatedIngredients = {
		
// 		...this.state.ingredients

// 	};
	
// 	updatedIngredients[type] = updatedCount;
// 	const priceSubtraction = INGREDIENT_PRICES[type];
// 	const oldPrice = this.state.totalPrice;
// 	const newPrice = oldPrice - priceSubtraction;
	
// 	this.setState({
// 		ingredients: updatedIngredients,
// 		totalPrice: newPrice
// 	});
// 	this.updatePurchasableState(updatedIngredients);

// }

purchaseHandler = () =>{



	if(this.props.isAuthenticated){

		this.setState({
			purchasing:true
		})
	
	} else {

		//since user is not authenticated, the redirect path in the
		//auth store will be set to "/checkout"
		//after they log in they will be redirected to cthe checkout page
		//this only sets the redirect path property.

		this.props.onSetAuthRedirectPath("/checkout");
		
		//this redirects to the authenticate page
		this.props.history.push("/auth");

	}

}

purchaseCancelHandler = () => {

	this.setState({purchasing:false});

}



purchaseContinueHandler = () => {


		//this sets the purchased property of the state to false
		//right before we are redirected by the method below	
		this.props.onInitPurchase();


		//this code uses the router to take us to the checkout component
		//history is a stack and .push adds the checkout component path to the top
		this.props.history.push('/checkout');
	
		//this code is not needed anymore since introducing redux
		// const queryParams =[];

		// 	for (let i in this.state.ingredients){

		// 		queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));

		// 	}

		// 	queryParams.push("price="+this.state.totalPrice);
			
		// const queryString = queryParams.join("&");
	}

	render(){

		
		const disabledInfo = {
			...this.props.ings
		}

		for(let key in disabledInfo){

			disabledInfo[key] = disabledInfo[key] <= 0
		}
		//returns an object that looks like {salad: true, meat:false, cheese: true} etc.


		let orderSummary = null;



		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

		if(this.props.ings){

			 burger = (
					<Aux>

						
						<Burger ingredients={this.props.ings}  />
							
						<BuildControls 
							
							ingredients={this.props.ings} 
							more={this.props.onIngredientAdded}
							less={this.props.onIngredientRemoved}
							disabled={disabledInfo}
							price = {this.props.totalPrice}
							purchasable={this.updatePurchasableState(this.props.ings)}
							ordered={this.purchaseHandler}
							isAuth={this.props.isAuthenticated}
						/>
					</Aux>
				);

			 orderSummary = <OrderSummary 
			 							
			 						  ingredients={this.props.ings}
									  cancel={this.purchaseCancelHandler}
									  continue={this.purchaseContinueHandler}
									  price={this.props.totalPrice}	
										/>;
		}


		return(

				<Aux> 
					
					<Modal loading={this.state.loading} show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>							

						
							{orderSummary}

							</Modal>

							{burger}
							
							

					
				</Aux>

			)

	}


}

const mapStateToProps = state => {

	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error:state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}

}

const mapDispatchToProps = dispatch => {

	return {

		onIngredientAdded: (ingName) =>dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))

	}

}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));





