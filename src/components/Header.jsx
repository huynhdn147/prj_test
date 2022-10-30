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
                <img id="header-logo-img2" src="https://scontent.fhan1-1.fna.fbcdn.net/v/t39.30808-6/302104011_522951372969357_7606793892060228597_n.png?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yI22Iic9SrQAX9RZ7fv&_nc_ht=scontent.fhan1-1.fna&oh=00_AT8TOU7kY6OuIecsIxO7SY2s5SPI_APwDc-sHAl41A-P6g&oe=632C0048" alt="" />
                <div className=" home-page">
                <Link to="/home" style={{ textDecoration: "none", textTransform: "uppercase", textAlign:"center"}}>quản lý thanh toán công tác phí</Link>
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