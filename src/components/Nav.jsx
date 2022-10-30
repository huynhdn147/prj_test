import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataNhanVien: [],
        }
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
        var { data } = this.state;

        if (data.roleID === "RL02") {
            return (
                <div className="list-group ">

                    <a href="#" className="list-group-item list-group-item-action disabled mt-3">QLNV</a>
                    <Link to="/quanlyphongban" className="list-group-item list-group-item-action">Quản lý phòng ban</Link>
                    <Link to="/quanlycapbac" className="list-group-item list-group-item-action ">Quản lý cấp bậc</Link>
                    <Link to="/quanlynhanvien" className="list-group-item list-group-item-action">Quản lý nhân viên</Link>
                    <Link to="/quanlychiphi" className="list-group-item list-group-item-action">Quản lý chi phí</Link>
                    <Link to="/quanlydinhmuc" className="list-group-item list-group-item-action">Quản lý định mức</Link>
                    <Link to="/quanlychuyencongtac" className="list-group-item list-group-item-action">Quản lý chuyến công tác</Link>
                    <Link to="/nhanviencongtac" className="list-group-item list-group-item-action">Quản lý nhân viên công tác</Link>
                    <Link to="/quanlydexuatthanhtoan" className="list-group-item list-group-item-action">Quản lý đề xuất thanh toán</Link>
                    <Link to="/baocaonhanvien" className="list-group-item list-group-item-action">Báo cáo</Link>



                </div>


            )
        }
        if (data.roleID === "RL03") {
            return (
                <div className="list-group ">

                    <a href="#" className="list-group-item list-group-item-action disabled mt-3">QLNV</a>
                    <Link to="/quanlyphongban" className="list-group-item list-group-item-action">Quản lý phòng ban</Link>
                    <Link to="/quanlycapbac" className="list-group-item list-group-item-action ">Quản lý cấp bậc</Link>
                    <Link to="/quanlynhanvien" className="list-group-item list-group-item-action">Quản lý nhân viên</Link>
                    <Link to="/quanlychiphi" className="list-group-item list-group-item-action">Quản lý chi phí</Link>
                    <Link to="/quanlydinhmuc" className="list-group-item list-group-item-action">Quản lý định mức</Link>
                    <Link to="/quanlychuyencongtac" className="list-group-item list-group-item-action">Quản lý chuyến công tác</Link>
                    <Link to="/nhanviencongtac" className="list-group-item list-group-item-action">Quản lý nhân viên công tác</Link>
                    <Link to="/quanlydexuatthanhtoan" className="list-group-item list-group-item-action">Quản lý đề xuất thanh toán</Link>
                    <Link to="/duyetdexuatthanhtoan" className="list-group-item list-group-item-action">Duyệt đề xuất thanh toán</Link>
                    <Link to="/baocaotruongbophan" className="list-group-item list-group-item-action">Báo cáo</Link>

                </div>
            )
        }
        if (data.roleID === "RL04") {
            return (
                <div className="list-group ">

                    <a href="#" className="list-group-item list-group-item-action disabled mt-3">QLNV</a>
                    <Link to="/quanlyphongban" className="list-group-item list-group-item-action">Quản lý phòng ban</Link>
                    <Link to="/quanlycapbac" className="list-group-item list-group-item-action ">Quản lý cấp bậc</Link>
                    <Link to="/quanlynhanvien" className="list-group-item list-group-item-action">Quản lý nhân viên</Link>
                    <Link to="/quanlychiphi" className="list-group-item list-group-item-action">Quản lý chi phí</Link>
                    <Link to="/quanlydinhmuc" className="list-group-item list-group-item-action">Quản lý định mức</Link>
                    <Link to="/quanlychuyencongtac" className="list-group-item list-group-item-action">Quản lý chuyến công tác</Link>
                    <Link to="/nhanviencongtac" className="list-group-item list-group-item-action">Quản lý nhân viên công tác</Link>
                    <Link to="/quanlydexuatthanhtoan" className="list-group-item list-group-item-action">Quản lý đề xuất thanh toán</Link>
                    <Link to="/duyetdexuatthanhtoan" className="list-group-item list-group-item-action">Duyệt đề xuất thanh toán</Link>
                    <Link to="/quanlythanhtoan" className="list-group-item list-group-item-action">Quản lý thanh toán</Link>
                    <Link to="/baocaolanhdao" className="list-group-item list-group-item-action">Báo cáo </Link>


                </div>

            )
        }
        if (data.roleID === "RL05") {
            return (
                <div className="list-group ">
                    <a href="#" className="list-group-item list-group-item-action disabled mt-3">QLNV</a>
                    <Link to="/quanlyphongban" className="list-group-item list-group-item-action">Quản lý phòng ban</Link>
                    <Link to="/quanlycapbac" className="list-group-item list-group-item-action ">Quản lý cấp bậc</Link>
                    <Link to="/quanlynhanvien" className="list-group-item list-group-item-action">Quản lý nhân viên</Link>
                    <Link to="/quanlychiphi" className="list-group-item list-group-item-action">Quản lý chi phí</Link>
                    <Link to="/quanlydinhmuc" className="list-group-item list-group-item-action">Quản lý định mức</Link>
                    <Link to="/quanlychuyencongtac" className="list-group-item list-group-item-action">Quản lý chuyến công tác</Link>
                    <Link to="/nhanviencongtac" className="list-group-item list-group-item-action">Quản lý nhân viên công tác</Link>
                    <Link to="/quanlydexuatthanhtoan" className="list-group-item list-group-item-action">Quản lý đề xuất thanh toán</Link>
                    <Link to="/duyetdexuatthanhtoan" className="list-group-item list-group-item-action">Duyệt đề xuất thanh toán</Link>
                    <Link to="/baocaolanhdao" className="list-group-item list-group-item-action">Báo cáo </Link>
                </div>
            )
        }
        if (data.roleID === "RL01") {
            return (
                <div className="list-group ">
                    <a href="#" className="list-group-item list-group-item-action disabled mt-3">QLNV</a>
                    <Link to="/quanlyphongban" className="list-group-item list-group-item-action">Quản lý phòng ban</Link>
                    <Link to="/quanlycapbac" className="list-group-item list-group-item-action ">Quản lý cấp bậc</Link>
                    <Link to="/quanlynhanvien" className="list-group-item list-group-item-action">Quản lý nhân viên</Link>
                    <Link to="/quanlychiphi" className="list-group-item list-group-item-action">Quản lý chi phí</Link>
                    <Link to="/quanlydinhmuc" className="list-group-item list-group-item-action">Quản lý định mức</Link>
                </div>
            )
        }
    }
    render() {

        return (
            <div className="nav-bar">

                {this.getTenUser()}
            </div>

        )
    }
}
