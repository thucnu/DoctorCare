import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Register.scss";
import { handleRegisterApi } from "../../services/userService";
import { toast } from "react-toastify";

//new
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeEmailAddress = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleOnChangeFirstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };
  handleOnChangeLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };
  handleOnChangePhone = (event) => {
    this.setState({
      phonenumber: event.target.value,
    });
  };
  handleRedirect = () => {
    this.props.history.push("/login-user")
  }
  handleRegister = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleRegisterApi(
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        this.state.phonenumber
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        toast.success('Create a new user succeed!');
        setTimeout(this.handleRedirect, 3000)  
        this.props.userRegisterSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log("error", error.response);
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleRegister();
    }
  };
  render() {
    //JSX
    return (
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <div className="col-12 text-register">Đăng ký</div>
            <div className="col-12 form-group register-input">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập địa chỉ email..."
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmailAddress(event)}
              />
            </div>
            <div className="col-6 form-group register-input">
              <label>Họ:</label>
              <input
                type="input"
                className="form-control"
                placeholder="Nhập họ..."
                value={this.state.lastName}
                onChange={(event) => this.handleOnChangeLastName(event)}
              />
            </div>
            <div className="col-6 form-group register-input">
              <label>Tên:</label>
              <input
                type="input"
                className="form-control"
                placeholder="Nhập tên..."
                value={this.state.firstName}
                onChange={(event) => this.handleOnChangeFirstName(event)}
              />
            </div>
            <div className="col-12 form-group register-input">
              <label>Số điện thoại:</label>
              <input
                type="input"
                className="form-control"
                placeholder="Nhập số điện thoại..."
                value={this.state.phonenumber}
                onChange={(event) => this.handleOnChangePhone(event)}
              />
            </div>
            <div className="col-12 form-group register-input">
              <label>Mật khẩu:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-register"
                onClick={() => {
                  this.handleRegister();
                }}
              >
                Đăng ký
              </button>
            </div>
            <div className="col-12">
                <p>Bạn đã có tài khoản? <a href="/login-user">Đăng nhập</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userRegisterSuccess: (userInfor) =>
      dispatch(actions.userRegisterSuccess(userInfor)),
  };
};

export default connect( mapDispatchToProps)(Register);
