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
                <div>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <div>Chức năng</div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlyphongban">Quản lý phòng ban</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlycapbac">Quản lý cấp bậc</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                            <Link to="/quanlynhanvien">Quản lý nhân viên</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlychiphi">Quản lý chi phí</Link>
                    </li>            
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlydinhmuc" >Quản lý định mức</Link>
                    </li>            
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlychuyencongtac">Quản lý chuyến công tác</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/nhanviencongtac">Quản lý nhân viên công tác</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlydexuatthanhtoan">Quản lý đề xuất thanh toán</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/baocaonhanvien" >Báo cáo</Link>
                    </li>
                    </ul>
                </div>


            )
        }
        if (data.roleID === "RL03") {
            return (
                <div>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <div>Chức năng</div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link to="/quanlyphongban">Quản lý phòng ban</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlycapbac" >Quản lý cấp bậc</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlynhanvien" >Quản lý nhân viên</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlychiphi">Quản lý chi phí</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlydinhmuc">Quản lý định mức</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlychuyencongtac">Quản lý chuyến công tác</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/nhanviencongtac" >Quản lý nhân viên công tác</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlydexuatthanhtoan" >Quản lý đề xuất thanh toán</Link>
                    </li>
                    
                    <li className="list-group-item list-group-item-action">
                    <Link to="/duyetdexuatthanhtoan" >Duyệt đề xuất thanh toán</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/baocaotruongbophan">Báo cáo</Link>
                    </li>   
                    </ul>
                </div>
            )
        }
        if (data.roleID === "RL04") {
            return (
                <div>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <div>Chức năng</div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlyphongban">Quản lý phòng ban</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlycapbac">Quản lý cấp bậc</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/quanlynhanvien">Quản lý nhân viên</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/quanlychiphi">Quản lý chi phí</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/quanlydinhmuc" >Quản lý định mức</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/quanlychuyencongtac">Quản lý chuyến công tác</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/nhanviencongtac" >Quản lý nhân viên công tác</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/quanlydexuatthanhtoan">Quản lý đề xuất thanh toán</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/duyetdexuatthanhtoan" >Duyệt đề xuất thanh toán</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/quanlythanhtoan">Quản lý thanh toán</Link>
                    </li><li className="list-group-item list-group-item-action">
                    <Link to="/baocaolanhdao">Báo cáo </Link>
                    </li>
                    </ul>
                </div>

            )
        }
        if (data.roleID === "RL05") {
            return (
                <div>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <div>Chức năng</div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlyphongban">Quản lý phòng ban</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlycapbac">Quản lý cấp bậc</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlynhanvien">Quản lý nhân viên</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlychiphi">Quản lý chi phí</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlydinhmuc">Quản lý định mức</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlychuyencongtac">Quản lý chuyến công tác</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/nhanviencongtac">Quản lý nhân viên công tác</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlydexuatthanhtoan">Quản lý đề xuất thanh toán</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/duyetdexuatthanhtoan">Duyệt đề xuất thanh toán</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/baocaolanhdao">Báo cáo </Link>
                    </li>
                    </ul>
                </div>
            )
        }
        if (data.roleID === "RL01") {
            return (
                <div>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <div>Chức năng</div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlyphongban">Quản lý phòng ban</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlycapbac">Quản lý cấp bậc</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlynhanvien">Quản lý nhân viên</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlychiphi">Quản lý chi phí</Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                    <Link to="/quanlydinhmuc">Quản lý định mức</Link>
                    </li>
                </ul>
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
