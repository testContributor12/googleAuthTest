import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NavBar extends Component {
  checkIfLogged() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">LOG IN</a>;

      default:
        return <a href="/api/logout">LOG OUT</a>;
    }
  }

  render() {
    console.log(this.props.auth);

    return (
      <div className="headerShop">
        {this.checkIfLogged()}
        <Link to={this.props.auth ? "/checkout" : "/loginfull"}>
          {" "}
          <i className="fas fa-shopping-cart" />
        </Link>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
// function mapStateToProps(state){
//   return {auth:state.auth}
// }

export default connect(mapStateToProps)(NavBar);
