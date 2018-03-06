import React, { Component }  from "react";
import {Route, Redirect} from "react-router-dom";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"


class Checkout extends Component {



	// state = {

	// 	ingredients: null,
				
	// 		price: 0

	// 		}


		//this code is no longer needed since introducing redux

		// componentWillMount(){

			
		// 	

		// 	// const query = new URLSearchParams(this.props.location.search);
			

		// 	// const ingredients={};
		// 	// let price = 0;
		// 	// for( let param of query.entries()){
		// 	// 	//example [['salad', '1'], ['bacon', '2']]

		// 	// 	if(param[0] === 'price'){

		// 	// 		price = param[1];

		// 	// 	} else{
				
		// 	// 		ingredients[param[0]] = +param[1]
				
		// 	// 	}
		// 	// }

		// 	this.setState({ingredients: ingredients,
		// 				   price: price});

		// 	console.log(ingredients);

		// }

		checkoutCanceledHandler = () =>{
			console.log("canceled handler clicked");
			this.props.history.goBack();

		}

		checkoutContinuedHandler = () =>{
			 console.log("continued handler clicked");
				this.props.history.replace("/checkout/contact-data");
		}


	

	
	render(){

		let summary = <Redirect to="/" />;



		if(this.props.ings){
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

			summary = <div>
						{purchasedRedirect}
						<CheckoutSummary 
							ingredients = {this.props.ings} 
							checkoutCanceled = {this.checkoutCanceledHandler}
							checkoutContinued = {this.checkoutContinuedHandler}
							/>

						<Route path={this.props.match.path + "/contact-data"} exact component={ContactData}	/> 
					</div>
}

		

		return(
				summary
			)

	}

}

const mapStateToProps = state => {

	return{
		ings:state.burgerBuilder.ingredients,
	 	totalPrice: state.burgerBuilder.totalPrice,
	 	purchased:state.order.purchased
	}
}



//there is no mapDispatch in this case,
//if there were no mapState, the first argument would have to be 'null'
export default connect(mapStateToProps)(Checkout);