import React from "react";
import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl";


const buildControls = (props) =>{

	const controls = Object.keys(props.ingredients).map(ingredient =>{

		return <BuildControl 
					key={ingredient} 
					label={ingredient} 
					added={() => props.more(ingredient.toLowerCase())}
					removed={() => props.less(ingredient.toLowerCase())}
					disabled={props.disabled[ingredient.toLowerCase()]}
					  />
					
			});

return(
	<div className={classes.BuildControls}>
		<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
		
		{controls}
		<button className={classes.OrderButton} 
		disabled={!props.purchasable} 
		onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}</button>

	</div>
)

	}


export default buildControls;