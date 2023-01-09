import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn, isLoggedHomeIn } = this.props;
    let linkToLogin = isLoggedIn ? "/system/manager-doctor" : "/home";
    let linkToLoginHome = "/home";
    return (
      <React.Fragment>
        <Redirect to={linkToLoginHome} />
        <Redirect to={linkToLogin} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedHomeIn: state.userHome.isLoggedHomeIn,
    isLoggedIn: state.user.isLoggedIn,
    isLoggedHomeIn: state.userHome.isLoggedHomeIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
