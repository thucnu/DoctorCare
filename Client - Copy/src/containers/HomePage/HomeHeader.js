import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
  }

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let { userHomeInfo, isLoggedHomeIn, processLogout } = this.props;
    console.log(userHomeInfo)

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <p>Hỗ trợ</p>
              </div>

              {isLoggedHomeIn ? (
                <div>
                  <span className="welcome">
                    <FormattedMessage id="homeheader.welcome" />,
                    {userHomeInfo && userHomeInfo.firstName ? userHomeInfo.firstName : ""}!
                  </span>
                  <div
                    className="btn btn-logout"
                    onClick={processLogout}
                    title="Log out"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </div>
              ) : (
                <div className="login-register">
                  <a href="/login-user">Đăng nhập</a>
                  <a href="/register">Đăng ký</a>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-left">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              {/* <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm..." />
              </div> */}
              <div className="text">
                <p>
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <FormattedMessage id="banner.paragraph1" />
                </p>
                <p>
                  <i className="fa fa-user-md" aria-hidden="true"></i>
                  <FormattedMessage id="banner.paragraph2" />
                </p>
                <p>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  <FormattedMessage id="banner.paragraph3" />
                </p>
                <p>
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                  <FormattedMessage id="banner.paragraph4" />
                </p>
              </div>
            </div>
            <div className="content-right"></div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
   isLoggedHomeIn: state.userHome.isLoggedHomeIn,
    userInfo: state.user.userInfo,
    userHomeInfo: state.userHome.userHomeInfo,
    language: state.app.languge,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
