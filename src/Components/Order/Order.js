import React from "react";
import classes from "./Order.css";



const order = (props) => {

	const list = Object.keys(props.ingredients).map(ing =>{

		return <span key={ing} style={

			{
				textTranform: "capitalize",
				display: "inline-block",
				margin: "0 10px",
				border: "1px solid #ccc",
				padding: "5px"
			}

		}>{ing} ({props.ingredients[ing]}) </span>

	})

	return(
		<div className={classes.Order}>
			
			<p>Ingredients: {list}</p>
			<p>Price: <strong>{props.price.toFixed(2)}</strong></p>			

		</div>
		);


	}

export default order;