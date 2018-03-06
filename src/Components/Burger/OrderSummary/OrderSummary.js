import React, {Component} from "react";

import Aux from "../../../HOC/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

	//this could be a functional component
	//does not have to be a class
	componentWillUpdate(){

		console.log("[Order summary] will update");
	}

 

render(){


		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey =>{
				return <li key={igKey}> <span style={{textTransform:"capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
			})
	return(

		<Aux>
			
			<h3>Your Order</h3>	
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				
				{ingredientSummary}

			</ul>
			<p><strong>Total Price: </strong>{this.props.price.toFixed(2)}</p>
			<p>Continue to checkout?</p>
			<Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
			<Button clicked={this.props.continue}btnType="Success" >CONTINUE</Button>
		</Aux>

		);
}


}

export default OrderSummary;