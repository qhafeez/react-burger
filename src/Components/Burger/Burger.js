import React from "react";

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	console.log(props);

	let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
									// console.log(igKey);
									//Object.keys() returns an array of the object
									//properties. This will return [salad, bacon, cheese, meat]
									console.log([...Array(props.ingredients[igKey])]);

				return [...Array(props.ingredients[igKey])].map((_, i)=>{
							//...Array(props.ingredients[igKey]) returns an array of
							//empty undefined spaces equal in length to the value stored
							//in each key.  ex: Array(props.ingredients[meat]) will return [undefined, undefined]
							//since the value of props.ingredients[meat] is 2

							// console.log(props.ingredients[igKey]);

					return <BurgerIngredient key={igKey+i} type={igKey} />;

				});


			})
			.reduce(function(arr,el) {
					
				return arr.concat(el);
			}, [])


console.log(transformedIngredients);

	



	

	if (transformedIngredients.length === 0){
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}

	



return(

		<div className={classes.Burger}  >
			<BurgerIngredient type="bread-top" />

			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />

		</div>

	);

}

export default burger;