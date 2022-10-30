import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',

        }
    }
    onChangeLogin = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        });
    }
    login = () => {
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/Users/authenticate',
            data: {
                maNhanVien: this.state.userName,
                passWord: this.state.passWord,
                // rememberme: this.state.moTa,
            }
        }).then((res) => {
            console.log(res)
            localStorage.setItem("token", res.data)
            alert("Đăng nhập thành công")

            window.location.reload()
        }).catch(err => {
            console.log(err);
            alert("Tài khoản hoặc mật khẩu chưa chính xác")

        })


    }
    loginGG = (event) => {
        event.preventDefault()
    }
    render() {

        return (
            <div className="container-login">
                <div className="login">
                    <div className="login-container">
                        <img id="header-logo-img" src="https://login.thanglong.edu.vn/images/logotlu.jpg" alt="" />
                        <h2 className="title-login">Đăng nhập</h2>
                        <form action className="form-login">
                            <div className="icon-user">
                                <i className="fas fa-user" />
                            </div>
                            <div>
                                <input type="text" name="userName" className="input-text" onChange={(value) => { this.onChangeLogin(value) }} />
                            </div>
                            <div className="icon-user mt-2">
                                <i className="fas fa-lock" />
                            </div>
                            <div>
                                <input type="password" name="passWord" className="input-text" onChange={(value) => { this.onChangeLogin(value) }} />
                            </div>
                            <div className="checkbox-login">
                                <input className="checkbox" type="checkbox" />
                                <label className="checkbox-label" htmlFor>Remember me</label>
                            </div>
                            <button type="button" className="btn-login" onClick={() => this.login()}>Login</button>
                            <div className="forgot-password">
                                <a href="#" className="forgot-pw">Forgot password ?</a>
                            </div>
                            <button className="login-gg" onClick={(event) => this.loginGG(event)}>
                                <i className="fab fa-google icon-login-gg" />
                                Sign in with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>



        );
    }
}


export default login;