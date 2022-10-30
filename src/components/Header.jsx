import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import axios from 'axios'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataNhanVien: [],
            maNhanVien: "",
            hideBtnNav: true,

        }
    }

    logout = () => {
        localStorage.removeItem("token")
        alert("Đăng xuất thành công")
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/Users',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ data: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/NhanVien',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataNhanVien: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
    }
    getTenUser = () => {

        var tenNhanVienDeXuat = "";
        var tenChucVu = "";
        var { data } = this.state;

        this.state.dataNhanVien.map((value) => {

            if (data.maNhanVien === value.maNhanVien) {
                tenNhanVienDeXuat = value.tenNhanVien + " - " + value.maNhanVien;
                tenChucVu = value.tenChucVu;
            }
            if (data.maNhanVien === "admin") {
                tenNhanVienDeXuat = "admin"
                tenChucVu = "admin"
            }

        })
        // console.log(tenNhanVienDeXuat);
        return (
            <div className="user-login">Xin Chào: {tenNhanVienDeXuat}
                <br />
                Chức Vụ: {tenChucVu}
            </div>
        )
    }
    hideBtnNav = () => {
        if (this.state.hideBtnNav === true) {


        }
    }

    render() {


        return (
            <div className="header">
                <div className=" home-page">
                    {/* <i class="icon fa fa-bars fa-fw  icon-nav-bar" aria-hidden="true" ></i> */}
                    <Link to="/home" style={{ textDecoration: " none", textTransform: "uppercase" }}>Trang Chủ</Link>
                </div>
                <div className="logout_username">
                    {this.getTenUser()}
                    <Link style={{ textDecoration: " none", textTransform: "uppercase" }} className="logout" onClick={() => this.logout()} > Đăng xuất</Link>
                </div>
            </div>

        );
    }
}

export default Header;