import React from "react";

import burgerLogo from '../../Assets/Images/burger-logo.png';

import classes from  './Logo.css';

const logo = (props) => (

	<div className={classes.Logo}>
		<img src={burgerLogo} alt="MyBurgerLogo" />		
	</div>

)

export default logo;