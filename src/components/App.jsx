import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import '../css/App.css';
// import Nav from './Nav';
import { connect } from "react-redux";
import React, { Component } from 'react';
import Home from '../components/Home';
import QuanLyNhanVien from './QuanLyNhanVien';
import QuanLyPhongBan from './QuanLyPhongBan';
import QuanLyChiPhi from "./QuanLyChiPhi";
import QuanLyDinhMuc from "./QuanLyDinhMuc";
import QuanLyCapBac from "./QuanLyCapBac";
import Login from "./Login";
import QuanLyChuyenCongTac from "./QuanLyChuyenCongTac";
import NhanVienCongTac from "./NhanVienCongTac";
import QuanLyDeXuatThanhToan from "./QuanLyDeXuatThanhToan";
import DuyetDeXuatThanhToan from "./DuyetDeXuatThanhToan";
import QuanLyThanhToan from "./QuanLyThanhToan";
import BaoCaoNhanVien from "./BaoCaoNhanVien";
import BaoCaoTruongBoPhan from "./BaoCaoTruongBoPhan";
import BaoCaoLanhDao from "./BaoCaoLanhDao";

import Footer from "./Footer";
import Header from "./Header";

import AlertComponents from "./AlertComponents";
class App extends Component {

    // git pull origin master
    // ->git push origin master
    constructor(props) {
        super(props);
        this.state = {
            isLogin: localStorage.getItem("token") != null,

        }
    }
    onLogin = () => {
        alert("ok")
    }

    render() {
        return (

            <Router>

                <div >

                    {/* <Header></Header> */}
                    <div >
                        <AlertComponents></AlertComponents>
                        <Switch>
                            <Route path="/login" render={() => {
                                return localStorage.getItem("token") ? <Redirect to="/home" /> : <Login />
                            }} >

                            </Route>
                            <Route exact path="/" render={() => {
                                return localStorage.getItem("token") ? <Redirect to="/home" /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route exact path="/home" render={() => {
                                return localStorage.getItem("token") ? <Home /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/quanlyphongban" render={() => {
                                return localStorage.getItem("token") ? <QuanLyPhongBan /> : <Redirect to="/login" />
                            }} >

                            </Route>
                            {/* <Route path="/test">
                            <Test></Test>
                        </Route> */}
                            <Route path="/quanlynhanvien" render={() => {
                                return localStorage.getItem("token") ? <QuanLyNhanVien /> : <Redirect to="/login" />
                            }}>

                            </Route>

                            <Route path="/quanlycapbac" render={() => {
                                return localStorage.getItem("token") ? <QuanLyCapBac /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/quanlychiphi" render={() => {
                                return localStorage.getItem("token") ? <QuanLyChiPhi /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/quanlydinhmuc" render={() => {
                                return localStorage.getItem("token") ? <QuanLyDinhMuc /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/quanlychuyencongtac" render={() => {
                                return localStorage.getItem("token") ? <QuanLyChuyenCongTac /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/quanlydexuatthanhtoan" render={() => {
                                return localStorage.getItem("token") ? <QuanLyDeXuatThanhToan /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/duyetdexuatthanhtoan" render={() => {
                                return localStorage.getItem("token") ? <DuyetDeXuatThanhToan /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/quanlythanhtoan" render={() => {
                                return localStorage.getItem("token") ? <QuanLyThanhToan /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/nhanviencongtac" render={() => {
                                return localStorage.getItem("token") ? <NhanVienCongTac /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/baocaonhanvien" render={() => {
                                return localStorage.getItem("token") ? <BaoCaoNhanVien /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/baocaotruongbophan" render={() => {
                                return localStorage.getItem("token") ? <BaoCaoTruongBoPhan /> : <Redirect to="/login" />
                            }}>

                            </Route>
                            <Route path="/baocaolanhdao" render={() => {
                                return localStorage.getItem("token") ? <BaoCaoLanhDao /> : <Redirect to="/login" />
                            }}>

                            </Route>
                        </Switch >

                    </div>
                    {/* <Footer></Footer> */}
                </div >
            </Router >

        );
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        alertReducer: state.alertReducer

    }
}
export default connect(mapStateToProps)(App)

