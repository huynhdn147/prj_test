import React, { Component } from 'react'
import axios from 'axios';
import { connect } from "react-redux";
import * as actions from './../actions/actions'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';


class QuanLyPhongBan extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: [],
            searchItem: '',
            maPhongBan: '',
            tenPhongBan: '',
            ngayThanhLap: '',
            hienThiSuaUer: [],
            dataSua: [],
            dataUsers: [],

        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        });
        // this.onSearch()
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/PhongBan',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ data: res.data }
            )
        })
            // .then((res) => this.props.alertOn_TrangThaiQuyenThanhCong(res))
            .catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/Users',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ dataUsers: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
    }


    onThemMoi = () => {

        var item = {};
        item.maPhongBan = this.state.maPhongBan;
        item.tenPhongBan = this.state.tenPhongBan;
        item.ngayThanhLap = this.state.ngayThanhLap
        var items = this.state.data;
        // items.push(item)
        this.setState({ data: items });
        // console.log(items);
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/PhongBan',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                maPhongBan: this.state.maPhongBan,
                tenPhongBan: this.state.tenPhongBan,
                ngayThanhLap: this.state.ngayThanhLap,
                // ngayThanhLap: this.state.ngayThanhLap
            }
        })
            .then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res) /*? items.push(item) : null*/)
            .then(() => { window.location.reload() })
            .catch(err => this.props.alertOn_TrangThaiThemMoiThatBai(err));

    }

    layDataSua = (value) => {
        this.setState({ hienThiSuaUer: value });
    }
    onSua = () => {
        
        if (window.confirm("B???n c?? ch???c ch???n mu???n s???a")) {
            var dataSua = {};
            dataSua.maPhongBan = this.state.hienThiSuaUer.maPhongBan; //this.state.hienThiSuaUer.maPhongBan l?? data onChange nh???p v??o
            dataSua.tenPhongBan = this.state.tenPhongBan;
            dataSua.ngayThanhLap = this.state.ngayThanhLap
            // console.log(dataSua);
            this.setState({ dataSua: dataSua });
            this.state.data.forEach((value) => {
                if (value.maPhongBan === dataSua.maPhongBan) {
                    value.tenPhongBan = dataSua.tenPhongBan;
                    value.ngayThanhLap = dataSua.ngayThanhLap
                }
            })
            var maPhongBan = this.state.hienThiSuaUer.maPhongBan
            // console.log(maPhongBan);
            axios({
                method: 'PUT',
                url: 'https://localhost:5001/api/PhongBan/' + maPhongBan,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    maPhongBan: this.state.hienThiSuaUer.maPhongBan,
                    tenPhongBan: this.state.tenPhongBan,
                    ngayThanhLap: this.state.ngayThanhLap
                }
            }).then((res) => res.data)
                .then((res) => {this.props.alertOn_TrangThaiSuaThanhCong(res);
                    window.location.reload()})
                //.then(() => { window.location.reload() })
                .catch(err => this.props.alertOn_TrangThaiSuaThatBai(err))
                
        }
        //window.location.reload()
    }
    
    onDelete = (maPhongBan) => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n x??a")) {
            // console.log(maPhongBan);
            var tempData = this.state.data.filter(item => item.maPhongBan !== maPhongBan)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/PhongBan/' + maPhongBan,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiXoaThatBai(err));

        }
    }


    printData = () => {
        var { data, searchItem } = this.state;
        var dataSearch = [];
        data.forEach((item) => {
            if (item.tenPhongBan.toLowerCase().indexOf(searchItem) !== -1 || item.maPhongBan.toLowerCase().indexOf(searchItem) !== -1 || item.ngayThanhLap.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        return (
            dataSearch.map((value, key) => (

                < tr className="tr__canGiua">
                    {/* {this.props.layDataPhongBan(value)} */}
                    <td>{key + 1}</td>
                    <td>{value.maPhongBan}</td>
                    <td>{value.tenPhongBan}</td>
                    <td>{value.ngayThanhLap}</td>
                    {/* <td>admin</td> */}
                    {this.hienThiBtnSua_Xoa(value)}
                </tr >
            ))
        )


    }
    //l???y value.maPhongBan => map v??o m???ng l??u trong state =>truy???n m???ng ???? ?????n app => app nh??n ???????c truy???n m???ng ???? ?????n QLNV => map data mang vao
    hienThiBtnThemMoi = () => {
        if (this.state.dataUsers.roleID === "RL01") {
            return (
                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Th??m m???i</div>

            )

        }
    }
    hienThiBtnSua_Xoa = (value) => {

        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (

                < td >
                    <div className="btn btn-warning btn-group" >
                        <div className="fa fa-edit" data-toggle="modal" data-target="#sua" onClick={() => this.layDataSua(value)}>S???a</div>


                        {/* <!-- begin sua --> */}
                        <div class="modal fade" id="sua" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalCenterTitle">S???a</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {/* Form themMoi */}
                                        <div className="card text-center">
                                            <div className="card-header">
                                                <p className="disabled">S???a</p>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <div className="form-group" >
                                                        <p style={{ textAlign: 'left' }}>M?? ph??ng ban</p>
                                                        <input type="text" className="form-control"  placeholder="M?? ph??ng ban" name="maPhongBan" Value={this.state.hienThiSuaUer.maPhongBan} onChange={(event) => this.onChange(event)} />
                                                        <p style={{ textAlign: 'left' }}>T??n ph??ng ban</p>
                                                        <input type="text" className="form-control"  placeholder="T??n ph??ng ban" name="tenPhongBan" Value={this.state.hienThiSuaUer.tenPhongBan} onChange={(event) => this.onChange(event)} />
                                                        <p style={{ textAlign: 'left' }}>Ng??y th??nh l???p</p>
                                                        <input type="date" className="form-control"  placeholder="Ng??y th??nh l???p (DD-MM-YYYY)" name="ngayThanhLap" Value={this.state.hienThiSuaUer.ngayThanhLap} onChange={(event) => this.onChange(event)} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end Form sua */}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <input type="submit" className="btn btn-primary " value="S???a" onClick={() => this.onSua()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* end them moi */}
                    <div className="btn btn-danger btn-group ml-2">
                        <div className="fas fa-ban" onClick={() => this.onDelete(value.maPhongBan)}>X??a</div>

                    </div>
                </td >
            )

        }
    }

    hienThiThaoTac = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                //style=" "
                <th style={{ paddingLeft: '45px' }}>Thao t??c</th>
            )

        }
    }


    render() {

        return (
            <div>
                <Header>
                </Header>

                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <div className="heading-manager" ><i class="fas fa-home"></i>  Qu???n l?? ph??ng ban</div>
                        <div className="">
                            {/* begin search */}
                            <div className="d-flex justify-content-between" >

                                <div className="form-group ">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" >
                                                <i class="fas fa-search"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="T??m ki???m" name="searchItem" value={this.state.searchItem} onChange={(event) => this.onChange(event)} />
                                    </div>
                                </div>
                                {/* end search */}

                                {this.hienThiBtnThemMoi()}
                            </div>
                            {/* <!-- begin them moi --> */}
                            <div class="modal fade" id="themMoi" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog  modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalCenterTitle">Th??m m???i</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            {/* Form themMoi */}
                                            <div className="card text-center">
                                                <div className="card-header">
                                                    <p className="disabled">Th??m m???i</p>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="form-group" >
                                                            <p style={{ textAlign: 'left' }}>M?? ph??ng ban</p>
                                                            <input  type="text" className="form-control"  placeholder="M?? ph??ng ban" name="maPhongBan" onChange={(event) => this.onChange(event)} />
                                                            <p style={{ textAlign: 'left' }}>T??n ph??ng ban</p>
                                                            <input type="text" className="form-control" placeholder="T??n ph??ng ban" name="tenPhongBan" onChange={(event) => this.onChange(event)} />
                                                            <p style={{ textAlign: 'left' }}>Ng??y th??nh l???p</p>
                                                            <input type="date" className="form-control"  placeholder="Ng??y th??nh l???p (YYYY-MM-DD)" name="ngayThanhLap" onChange={(event) => this.onChange(event)} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end Form themMoi */}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <input type="submit" className="btn btn-primary " value="Th??m m???i" onClick={() => this.onThemMoi()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end them moi */}
                        </div>
                        <div className="row " style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col ">
                                <table className="table table-striped table-hover ">
                                    <thead>
                                        <tr className="tr__canGiua">
                                            <th>STT</th>
                                            <th>M?? ph??ng ban</th>
                                            <th>T??n ph??ng ban</th>
                                            <th>Ng??y th??nh l???p</th>
                                            {/* <th>Quy???n</th> */}
                                            {this.hienThiThaoTac()}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.printData()}

                                        {/* copy tr v??o ????y */}
                                    </tbody>
                                </table>
                            </div>
                            {/* hi???n th??? form */}

                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>

        )
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        alertReducer: state.alertReducer,

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOn_TrangThaiThemMoiThanhCong: () => { dispatch(actions.alertOn_TrangThaiThemMoiThanhCong(),2000) },
        alertOff_TrangThaiThemMoiThanhCong: () => { dispatch(actions.alertOff_TrangThaiThemMoiThanhCong()) },
        alertOn_TrangThaiThemMoiThatBai: () => { dispatch(actions.alertOn_TrangThaiThemMoiThatBai()) },
        alertOff_TrangThaiThemMoiThatBai: () => { dispatch(actions.alertOff_TrangThaiThemMoiThatBai()) },

        alertOn_TrangThaiSuaThanhCong: () => { dispatch(actions.alertOn_TrangThaiSuaThanhCong()) },
        alertOff_TrangThaiSuaThanhCong: () => { dispatch(actions.alertOff_TrangThaiSuaThanhCong()) },
        alertOn_TrangThaiSuaThatBai: () => { dispatch(actions.alertOn_TrangThaiSuaThatBai()) },
        alertOff_TrangThaiSuaThatBai: () => { dispatch(actions.alertOff_TrangThaiSuaThatBai()) },

        alertOn_TrangThaiXoaThanhCong: () => { dispatch(actions.alertOn_TrangThaiXoaThanhCong()) },
        alertOff_TrangThaiXoaThanhCong: () => { dispatch(actions.alertOff_TrangThaiXoaThanhCong()) },
        alertOn_TrangThaiXoaThatBai: () => { dispatch(actions.alertOn_TrangThaiXoaThatBai()) },
        alertOff_TrangThaiXoaThatBai: () => { dispatch(actions.alertOff_TrangThaiXoaThatBai()) },

        alertOn_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOn_TrangThaiQuyenThanhCong()) },
        alertOff_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOff_TrangThaiQuyenThanhCong()) },
        alertOn_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOn_TrangThaiQuyenThatBai()) },
        alertOff_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOff_TrangThaiQuyenThatBai()) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyPhongBan)