import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'
class QuanLyNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: true,
            data: [],
            maNhanVien: '',
            tenNhanVien: '',
            tenCapBac: '',
            tenPhongBan: '',
            maCapBac: '',
            maPhongBan: '',
            hienThiSuaUer: [],
            searchItem: '',
            dataPhongBan: [],
            dataCapBac: [],
            dataChucVu: [],
            maChucVu: '',
            tenChucVu: '',
            passWord: '',
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
    componentWillMount() {
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/NhanVien',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ data: res.data }
            );
        }).catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/ChucVu',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataChucVu: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/PhongBan',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ dataPhongBan: res.data }
            );

        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/CapBac',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ dataCapBac: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
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


    hienThiTenPhongBan = () => {
        return (
            this.state.dataPhongBan.map((value, key) => (
                <option>{value.tenPhongBan}</option>

            ))
        )
    }
    hienThiTenChucVu = () => {
        return (
            this.state.dataChucVu.map((value, key) => (
                <option>{value.roleName}
                    
                </option>
                
            ))
        )
    }
    hienThiTenCapBac = () => {
        return (
            this.state.dataCapBac.map((value, key) => (
                <option selected="selected" value={value.tenCapBac}>{value.tenCapBac}</option>
            ))
        )
    }

    onThemMoi = () => {
        var item = {};
        item.maNhanVien = this.state.maNhanVien;
        item.tenNhanVien = this.state.tenNhanVien;
        item.tenCapBac = this.state.tenCapBac;
        item.tenPhongBan = this.state.tenPhongBan;
        item.tenChucVu = this.state.tenChucVu;
        item.passWord = this.state.passWord;
        this.state.dataChucVu.map((value, key) => {
            if (value.roleName === this.state.tenChucVu) {
                this.state.maChucVu = value.roleID;
            }
        })
        this.state.dataCapBac.map((value, key) => {
            if (value.tenCapBac === this.state.tenCapBac) {
                this.state.maCapBac = value.maCapBac;
            }
        })
        this.state.dataPhongBan.map((value, key) => {
            if (value.tenPhongBan === this.state.tenPhongBan) {
                this.state.maPhongBan = value.maPhongBan;
            }
        })
        var items = this.state.data;
        // items.push(item)
        this.setState({ data: items });
        console.log(this.state.data);

        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/NhanVien',
            data: {
                maNhanVien: this.state.maNhanVien,
                tenNhanVien: this.state.tenNhanVien,
                maCapBac: this.state.maCapBac,
                maPhongBan: this.state.maPhongBan,
                roleid: this.state.maChucVu,
                passWord: this.state.passWord

            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => res.data)
            .then(() => { window.location.reload() })
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res) ? items.push(item) : null)

            .catch(err => this.props.alertOn_TrangThaiThemMoiThatBai(err));
        // console.log(this.state.data);
    }
    layDataSua = (value) => {

        this.setState({ hienThiSuaUer: value });
        console.log(this.state.data);


    }

    onSua = () => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n s???a")) {
            var dataSua = {};
            dataSua.maNhanVien = this.state.hienThiSuaUer.maNhanVien; //this.state.hienThiSuaUer.maPhongBan l?? data onChange nh???p v??o
            dataSua.tenNhanVien = this.state.tenNhanVien;
            dataSua.tenCapBac = this.state.tenCapBac;
            dataSua.tenPhongBan = this.state.tenPhongBan;
            this.setState({ dataSua: dataSua });
            console.log(this.state.dataSua);
            this.state.data.forEach((value) => {
                if (value.maNhanVien === dataSua.maNhanVien) {
                    value.tenNhanVien = dataSua.tenNhanVien;
                    value.tenCapBac = dataSua.tenCapBac;
                    value.tenPhongBan = dataSua.tenPhongBan;
                }
            })
            console.log(this.state.data);

            this.state.dataCapBac.map((value, key) => {
                if (value.tenCapBac === this.state.tenCapBac) {
                    this.state.maCapBac = value.maCapBac;
                }
            })
            this.state.dataPhongBan.map((value, key) => {
                if (value.tenPhongBan === this.state.tenPhongBan) {
                    this.state.maPhongBan = value.maPhongBan;
                    console.log("huynh"+value.maPhongBan);
                }
            })
            // var maNhanVien = this.state.hienThiSuaUer.maNhanVien
            // console.log(maNhanVien);

            axios({
                method: 'PUT',
                url: 'https://localhost:5001/api/NhanVien/',
                data: {
                    maNhanVien: this.state.hienThiSuaUer.maNhanVien,
                    tenNhanVien: this.state.tenNhanVien,
                    maCapBac: this.state.maCapBac,
                    maPhongBan: this.state.maPhongBan,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiSuaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiSuaThatBai(err));
        }
    }

    onDelete = (maNhanVien) => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n x??a")) {
            // console.log(maPhongBan);
            var tempData = this.state.data.filter(item => item.maNhanVien !== maNhanVien)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/NhanVien/' + maNhanVien,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiXoaThatBai(err));

        }
    }
    printData = () => {
        var { data, searchItem } = this.state;
        var dataSearch = [];
        data.forEach((item) => {
            if (item.maNhanVien.toLowerCase().indexOf(searchItem) !== -1 || item.tenNhanVien.toLowerCase().indexOf(searchItem) !== -1 || item.tenCapBac.toLowerCase().indexOf(searchItem) !== -1 || item.tenPhongBan.toLowerCase().indexOf(searchItem) !== -1 || item.tenChucVu.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        return (
            dataSearch.map((value, key) => (
                <tr className="tr__canGiua">
                    <td>{key + 1}</td>
                    <td>{value.maNhanVien}</td>
                    <td>{value.tenNhanVien}</td>
                    <td>{value.tenCapBac}</td>
                    <td>{value.tenChucVu}</td>
                    <td>{value.tenPhongBan}</td>
                    {this.hienThiBtnSua_Xoa(value)}
                </tr>
            ))

        )
    }
    hienThiBtnThemMoi = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Th??m m???i</div>

            )

        }
    }
    hienThiBtnSua_Xoa = (value) => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                <td>
                    <div className="btn btn-warning btn-group">
                        <div className="fa fa-edit" data-toggle="modal" data-target="#sua" onClick={() => this.layDataSua(value)}>S???a</div>
                        {/* <!-- begin them moi --> */}
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
                                                        {/* <p style={{ textAlign: 'left' }}>M?? nh??n vi??n</p>
                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? nh??n vi??n" Value={this.state.hienThiSuaUer.maNhanVien} name="maNhanVien" onChange={(value) => this.onChange(value)} />
                                                    */}
                                                        <p style={{ textAlign: 'left' }}>T??n nh??n vi??n</p>
                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??n nh??n vi??n" Value={this.state.hienThiSuaUer.tenNhanVien} name="tenNhanVien" onChange={(value) => this.onChange(value)} />
                                                        <p style={{ textAlign: 'left' }}>C???p b???c</p>
                                                        <select class="form-select form-control" aria-label="Default select example" Value={this.state.hienThiSuaUer.tenCapBac} name="tenCapBac" onChange={(value) => this.onChange(value)} >
                                                            {/* <option selected>Ch???n c???p b???c</option> */}
                                                            {this.hienThiTenCapBac()}
                                                        </select>
                                                        <p style={{ textAlign: 'left' }}>Ch???c v???</p>
                                                        <select class="form-select form-control" aria-label="Default select example" name="tenChucVu" onChange={(event) => this.onChange(event)} >
                                                            <option selected>Ch???n ch???c v???</option>
                                                            {this.hienThiTenChucVu()}
                                                        </select>
                                                        <p style={{ textAlign: 'left' }}>Ph??ng ban</p>
                                                        <select class="form-select form-control" aria-label="Default select example" Value={this.state.hienThiSuaUer.tenPhongBan} name="tenPhongBan" onChange={(value) => this.onChange(value)}>
                                                            <option selected>Ch???n ph??ng ban</option>
                                                            {this.hienThiTenPhongBan()}
                                                        </select>
                                                        <p style={{ textAlign: 'left' }}>M???t kh???u</p>
                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M???t Kh???u" name="passWord" onChange={(event) => this.onChange(event)} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end Form themMoi */}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <input type="submit" className="btn btn-primary " value="S???a" onClick={() => this.onSua()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end them moi */}
                    </div>
                    {/* <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                        <div className="fas fa-ban" onClick={() => this.onDelete(value.maNhanVien)}>X??a</div>
                    </div> */}
                </td>


            )

        }
    }
    hienThiThaoTac = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                <th>Thao t??c</th>
            )

        }
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                <Header></Header>

                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <div className="heading-manager">Qu???n l?? nh??n vi??n</div>
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
                                        <input type="text" className="form-control" placeholder="Search ..." name="searchItem" value={this.state.searchItem} onChange={(event) => this.onChange(event)} />
                                    </div>
                                </div>
                                {/* end search */}
                                {/* <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Th??m m???i</div> */}
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
                                                            {/* <p style={{ textAlign: 'left' }}>M?? nh??n vi??n</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? nh??n vi??n" name="maNhanVien" onChange={(event) => this.onChange(event)} />
                                                          */}
                                                            <p style={{ textAlign: 'left' }}>T??n nh??n vi??n</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??n nh??n vi??n" name="tenNhanVien" onChange={(event) => this.onChange(event)} />

                                                            <p style={{ textAlign: 'left' }}>C???p b???c</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenCapBac" onChange={(event) => this.onChange(event)} >
                                                                <option selected>Ch???n c???p b???c</option>
                                                                {this.hienThiTenCapBac()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Ch???c v???</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenChucVu" onChange={(event) => this.onChange(event)} >
                                                                <option selected>Ch???n ch???c v???</option>
                                                                {this.hienThiTenChucVu()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Ph??ng ban</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenPhongBan" onChange={(event) => this.onChange(event)}>
                                                                <option selected>Ch???n ph??ng ban</option>
                                                                {this.hienThiTenPhongBan()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>M???t kh???u</p>
                                                            <input type="password" className="form-control" name id aria-describedby="helpId" placeholder="M???t Kh???u" name="passWord" onChange={(event) => this.onChange(event)} />

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
                            <div className="col">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua">
                                            <th>STT</th>
                                            <th>M?? nh??n vi??n</th>
                                            <th>T??n nh??n vi??n</th>
                                            <th>C???p b???c</th>
                                            <th>Ch???c v???</th>
                                            <th>Ph??ng ban</th>
                                            {/* <th>Quy???n</th> */}
                                            {/* <th>Thao t??c</th> */}
                                            {this.hienThiThaoTac()}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.printData()}
                                        {/* copy tr v??o ????y */}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>

                <Footer></Footer>
            </div>
        );
    }
}
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        alertReducer: state.alertReducer

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOn_TrangThaiThemMoiThanhCong: () => { dispatch(actions.alertOn_TrangThaiThemMoiThanhCong()) },
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
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNhanVien)
