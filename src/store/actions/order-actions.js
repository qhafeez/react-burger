import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) =>{

	//this is synchronous code

	//the id is the id of the order that is created in the firebase database

	return {
		type:actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}

}

export const purchaseBurgerStart = () =>{

	return {

		type:actionTypes.PURCHASE_BURGER_START

	}

}

export const purchaseBurgerFail = (error) => {

	//this is synchronous code

	//error comes from the error message we would receive from
	//axios

	return {
		type:actionTypes.PURCHASE_BURGER_FAIL,
		error: error

	}

}

export const purchaseBurger = (orderData, token) => {
	

	return dispatch =>{
		dispatch(purchaseBurgerStart());

		axiosInstance.post("/orders.json?auth=" + token, orderData)
				 .then(response => {

				 		console.log(response.data);
				 		//the id of the order is located on response.data.name
				 		dispatch(purchaseBurgerSuccess(response.data.name, orderData))
				 	

				 	})
				 .catch(error => {
				 		
				 	dispatch(purchaseBurgerFail(error));



				 });

	};

}

export const purchaseInit = () =>{

	return {
		type:actionTypes.PURCHASE_INIT
	}

}

export const fetchOrdersStart = () =>{

	return {
		type:actionTypes.FETCH_ORDERS_START
	}	

}

export const fetchOrdersSuccess = (orders) =>{

	return {
		type:actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}	

}

export const fetchOrdersFail = (error) =>{

	return {
		type:actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}	

}

export const fetchOrders = (token) => {

	return dispatch => {
			dispatch(fetchOrdersStart());
		axiosInstance.get("/orders.json?auth="+token).then(response =>{

							const orders = response.data;
							const fetchedOrders=[];

							console.log(orders);

						for (let key in orders){

							fetchedOrders.push({

								...orders[key],
								id:key

							})
						}

						console.log(fetchedOrders);

						dispatch(fetchOrdersSuccess(fetchedOrders))

						}).catch(error => {

							console.log(error);
							
							dispatch(fetchOrdersFail(error));

						})


	}

}



