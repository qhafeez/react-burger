import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import Aux from "../Aux/Aux";
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
import BurgerBuilder from "../../Containers/BurgerBuilder/BurgerBuilder";
import { connect } from "react-redux";



class Layout extends Component {

	state = {

		showSideDrawer: false

	}

	sideDrawerClosedHandler = () =>{

		this.setState({showSideDrawer: false});

	}

	sideDrawerToggleHandler = () => {

		this.setState( (prevState) => {
			
			return {showSideDrawer: !prevState.showSideDrawer};

		} );
		

	}

	/*
	Toolbar and SideDrawer Components display Navigation Items
	We will pass them the authentication state so the logic inside the navigation Items component
	can decide whether to render the logout navigation item or not
	*/

	render() {

		return( 
			<Aux>

				<Toolbar isAuth={this.props.isAuthenticated}  openMethod={this.sideDrawerToggleHandler} />
				<SideDrawer isAuth={this.props.isAuthenticated}  show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					
					{this.props.children}

				</main>
				
			</Aux>
			)
}

}


const mapStateToProps = state =>{
	return{
		isAuthenticated: state.auth.token !== null
	}
}


export default connect(mapStateToProps)(Layout)
;