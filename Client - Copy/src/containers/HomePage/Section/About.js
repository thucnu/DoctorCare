import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói gì về DoctorCare
        </div>
        <div className="section-about-content">
          <div className="section-about content-left">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/JA_xgZ1wLn0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="section-about content-right">
            <div>
              <p>
                <FormattedMessage id="about.paragraph5" />
              </p>
              <p>
                <FormattedMessage id="about.paragraph6" />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
   isLoggedHomeIn: state.userHome.isLoggedHomeIn,
    language: state.app.languge,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
