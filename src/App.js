import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Link, Switch, withRouter, Redirect } from "react-router-dom";

import Layout from "./HOC/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import Orders from "./Containers/Orders/Orders";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";


class App extends Component {

  componentDidMount(){

    this.props.onTryAutoSignUp();


  }
	


  render() {
    

     let routes = (
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
           
       
          </Switch>
        );


      if(this.props.isAuthenticated){


        routes = (

          <Switch>

            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
             <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            
           
          </Switch>


          );


      }



    return (

     


      <div>

      
        <Layout>
        
            
           {routes}

         
        </Layout>
  
      
        

      </div>
    );
  }
}


const mapStateToProps = state =>{

  return{

    isAuthenticated: state.auth.token !== null

  }



}

const mapDispatchToProps = dispatch =>{

  return {

    onTryAutoSignUp: () => dispatch(actions.AuthCheckState())


  }

}

//withRouter is needed because without it, routing doesn't work properly.  Clickin the authenticate button would not take us to the authenticate page.  This happens because connect prevents the props from being passed to the App component.  withRouter fixes this.

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
