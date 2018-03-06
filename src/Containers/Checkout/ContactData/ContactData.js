import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosInstance from "../../../axios-orders.js";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import * as actions from  "../../../store/actions/index";


class ContactData extends Component{

	state = {

			orderForm:{
				name:{

					elementType: "input",
					elementConfig: {
						type:"text",
						placeholder: "Your Name"
					},
					value: "",
					validation:{
						required:true,
						
					},
					valid:false,
					touched:false
					

				}, 


				
				street: {

					elementType: "input",
					elementConfig: {
						type:"text",
						placeholder: "Street"
					},
					value: "",
					validation:{
						required:true,
						
					},
					valid:false,
					touched:false
					

				},
				zipCode:{

					elementType: "input",
					elementConfig: {
						type:"text",
						placeholder: "ZIP Code"
					},
					value: "",
					validation:{
						required:true,
						minLength:5,
						maxLength:5,
						isNumeric: true
					},
					valid:false,
					touched:false
					

				},
				country: {

					elementType: "input",
					elementConfig: {
						type:"text",
						placeholder: "Country"
					},
					value: "",
					validation:{
						required:true,
						},
					valid:false,
					touched:false
					

				},
				email: {

					elementType: "input",
					elementConfig: {
						type:"text",
						placeholder: "Email Address"
					},
					value: "",
					validation:{
						required:true,
						isEmail: true
						
					},
					valid:false,
					touched:false
					

				},
				deliveryMethod: {

					elementType: "select",
					elementConfig: {
						options: [
			
							{value: "fastest", displayValue: "Fastest"},
							{value: "cheapest", displayValue: "Cheapest"}
							
						]
					},
					value: "fastest",
					validation:{},
					valid:true

				}
			},

			formIsValid:false,
			
		

	}


	orderHandler = (e) => {
			e.preventDefault();
		console.log(this.props.ings);


		const formData = {};

			for ( let formElementIdentifier in this.state.orderForm){

				formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

		}
			console.log(formData);
		

		const order ={

			ingredients: this.props.ings,
			price: this.props.totalPrice,
			orderData: formData
			
		}
	

			this.props.onOrderBurger(order, this.props.token);
		


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


	inputChangeHandler = (event, inputIdentifier) => {

			console.log(inputIdentifier);

			const updatedOrderForm= {
				...this.state.orderForm
			}


			const updatedFormElement = {
				...updatedOrderForm[inputIdentifier]
			}

			updatedFormElement.value=event.target.value;
			updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
			updatedFormElement.touched=true;

			let formIsValid = true;
			for(let inputIdentifier in updatedOrderForm){

				formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

			}

			console.log(formIsValid);
			
			console.log(updatedFormElement);
			updatedOrderForm[inputIdentifier] = updatedFormElement;


			this.setState({
				orderForm: updatedOrderForm,
				formIsValid:formIsValid

			});

	}

	render(){
		
			const formElementsArray =[];
			for (let key in this.state.orderForm){

				formElementsArray.push({
					id:key,
					config: this.state.orderForm[key]
				})

			}

		let form = (<form onSubmit={this.orderHandler}>
					{
						formElementsArray.map(formElement =>{

							return <Input key={formElement.id} 
										elementType={formElement.config.elementType} 
										elementConfig={formElement.config.elementConfig} 
										value={formElement.config.value} 
										changed={(event)=>this.inputChangeHandler(event, formElement.id)} 
										invalid={!formElement.config.valid}
										shouldValidate={formElement.config.validation}
										touched={formElement.config.touched}/>
																					
					})
				}
					
					<Button  btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
				</form>);

		if (this.props.loading){
			form = <Spinner />;
		}

		return(

			<div className={classes.ContactData}>
				
				<h4>Enter your Contact Data</h4>
				
					{form}

			</div>


			)


	}


}

const mapStateToProps = state => {

	return {

		ings:state.burgerBuilder.ingredients,
		totalPrice:state.burgerBuilder.totalPrice,
		loading:state.order.loading,
		token:state.auth.token

	}

}

const mapDispatchToProps = dispatch =>{
	return{
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData,token))
	};
}

//there is no mapDispatch in this case,
//if there were no mapState, the first argument would have to be 'null'

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));