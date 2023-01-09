import React, { Component } from "react";
import { connect } from "react-redux";
import "./Handbook.scss";
import { withRouter } from "react-router";
import Slider from "react-slick";
import { getAllHandbook } from "../../../services/userService";

class Handbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }
  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailHandbook = (item) => {
    if(this.props.history){
      this.props.history.push(`/detail-handbook/${item.id}`)
    }
  }
  render() {
    let { dataHandbook } = this.state;
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataHandbook &&
                dataHandbook.length > 0 &&
                dataHandbook.map((item, index) => {
                  return (
                    <div
                      className="section-customize handbook-child"
                      key={index}
                      onClick={()=>this.handleViewDetailHandbook(item)}
                    >
                      <div
                        className="bg-image section-handbook"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="handbook-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    // isLoggedHomeIn: state.userHome.isLoggedHomeIn
    language: state.app.languge,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
