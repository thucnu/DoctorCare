import { connect } from "react-redux";
import React, { Component } from "react";
import "./DetailHandbook.scss";
import HomeHeader from "../../HomePage/HomeHeader";

import { getAllDetailHandbookById } from "../../../services/userService";
import _ from "lodash";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailHandbook: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailHandbookById({
        id: id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataDetailHandbook: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.props.language !== prevProps.language) {
    // }
  }

  // handleOnChangeSelect = async(event) => {
  //   if(this.props.match && this.props.match.params && this.props.match.params.id){
  //     let id = this.props.match.params.id;

  //     let res = await getAllDetailHandbookById({
  //       id: id,
  //     });
  //     if(res && res.errCode === 0){
  //       this.setState({
  //         dataDetailHandbook: res.data,
  //       })
  //     }
  //   }
  // }

  render() {
    let { dataDetailHandbook } = this.state;
    console.log("dataDetailHandbook", dataDetailHandbook);
    return (
      <div className="detail-handbook-container">
        <HomeHeader />
        <div className="detail-handbook-body">
          <div className="description-handbook">
            {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailHandbook.descriptionHTML,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
