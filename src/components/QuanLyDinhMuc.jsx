import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Footer from './Footer';
import Header from './Header';
import { connect } from "react-redux";
import * as actions from './../actions/actions'
class QuanLyDinhMuc extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: [],
            maCapBac: '',
            maChiPhi: '',
            tenCapBac: '',
            tenChiPhi: '',
            soTienDinhMuc: '',
            donVi: '',
            hienThiSuaUer: [],
            dataCapBac: [],
            dataChiPhi: [],
            maCapBacDelete: '',
            maChiPhiDelete: '',
            searchItem: '',
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
            url: 'https://localhost:5001/api/DinhMuc',
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
            url: 'https://localhost:5001/api/CapBac',
            data: null,
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
            url: 'https://localhost:5001/api/ChiPhi',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataChiPhi: res.data }
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
    hienThiTenCapBac = () => {
        return (
            this.state.dataCapBac.map((value, key) => (
                <option>{value.tenCapBac}</option>

            ))
        )
    }
    hienThiTenChiPhi = () => {
        return (
            this.state.dataChiPhi.map((value, key) => (
                <option>{value.tenChiPhi}</option>

            ))
        )
    }

    onThemMoi = () => {
        var item = {};
        item.tenCapBac = this.state.tenCapBac;
        item.tenChiPhi = this.state.tenChiPhi;
        item.soTienDinhMuc = this.state.soTienDinhMuc
        item.donVi = this.state.donVi
        this.state.dataCapBac.map((value, key) => {
            if (value.tenCapBac === this.state.tenCapBac) {
                this.state.maCapBac = value.maCapBac;
            }
        })
        this.state.dataChiPhi.map((value, key) => {
            if (value.tenChiPhi === this.state.tenChiPhi) {
                this.state.maChiPhi = value.maChiPhi;
            }
        })
        var items = this.state.data;
        // items.push(item)
        this.setState({ data: items });
        // console.log(items);
        // console.log(this.state.maCapBac);
        console.log(this.state.data);

        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DinhMuc',
            data: {
                maCapBac: this.state.maCapBac,
                maChiPhi: this.state.maChiPhi,
                soTienDinhMuc: this.state.soTienDinhMuc,
                donVi: this.state.donVi,
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
        console.log(this.state.hienThiSuaUer);
    }

    onSua = () => {
        if (window.confirm("Bạn có chắc chắn muốn sửa")) {
            var dataSua = {};
            dataSua.tenCapBac = this.state.hienThiSuaUer.tenCapBac; //this.state.hienThiSuaUer.maPhongBan là data onChange nhập vào
            dataSua.tenChiPhi = this.state.hienThiSuaUer.tenChiPhi;
            dataSua.soTienDinhMuc = this.state.soTienDinhMuc;
            dataSua.donVi = this.state.donVi;
            this.setState({ dataSua: dataSua });
            console.log(this.state.dataSua);
            this.state.data.forEach((value) => {
                if (value.tenCapBac === dataSua.tenCapBac & value.tenChiPhi === dataSua.tenChiPhi) {
                    value.soTienDinhMuc = dataSua.soTienDinhMuc;
                    value.donVi = dataSua.donVi;
                }
            })
            console.log(this.state.data);

            this.state.dataCapBac.map((value, key) => {
                if (value.tenCapBac === this.state.tenCapBac) {
                    this.state.maCapBac = value.maCapBac;
                }
            })
            this.state.dataChiPhi.map((value, key) => {
                if (value.tenChiPhi === this.state.tenChiPhi) {
                    this.state.maChiPhi = value.maChiPhi;
                }
            })
            // var maNhanVien = this.state.hienThiSuaUer.maNhanVien
            // console.log(maNhanVien);

            axios({
                method: 'PUT',
                url: 'https://localhost:5001/api/DinhMuc/',
                data: {
                    maCapBac: this.state.hienThiSuaUer.maCapBac,
                    maChiPhi: this.state.hienThiSuaUer.maChiPhi,
                    soTienDinhMuc: this.state.soTienDinhMuc,
                    donVi: this.state.donVi,
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiSuaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiSuaThatBai(err));
        }
    }
    onDelete = (maCapBac, maChiPhi) => {


        if (window.confirm("Bạn có chắc chắn muốn xóa")) {
            // console.log(maPhongBan);
            var tempData = this.state.data.filter(item => item.maCapBac !== maCapBac || item.maChiPhi !== maChiPhi)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/DinhMuc/' + maCapBac + '&' + maChiPhi,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiXoaThatBai(err));

        }
    }

    printData = () => {
        this.state.dataCapBac.map((value, key) => {
            if (value.tenCapBac === this.state.tenCapBac) {
                this.state.maCapBac = value.maCapBac;
            }
        })
        this.state.dataChiPhi.map((value, key) => {
            if (value.tenChiPhi === this.state.tenChiPhi) {
                this.state.maChiPhi = value.maChiPhi;
            }
        })
        var { data, searchItem } = this.state;
        var dataSearch = [];
        data.forEach((item) => {
            if (item.tenChiPhi.toLowerCase().indexOf(searchItem) !== -1 || item.tenCapBac.toLowerCase().indexOf(searchItem) !== -1 || item.soTienDinhMuc.toLowerCase().indexOf(searchItem) !== -1 || item.donVi.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        return (
            dataSearch.map((value, key) => (
                <tr className="tr__canGiua">
                    <td>{key + 1}</td>
                    <td>{value.tenCapBac}</td>
                    <td>{value.tenChiPhi}</td>
                    <td>{value.soTienDinhMuc}</td>
                    <td>{value.donVi}</td>
                    {this.hienThiBtnSua_Xoa(value)}
                </tr>
            ))
        )
    }
    hienThiBtnThemMoi = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Thêm mới</div>

            )

        }
    }
    hienThiBtnSua_Xoa = (value) => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                <td>
                    <div className="btn btn-warning btn-group" style={{ fontSize: "22px" }} >
                        <div className="fa fa-edit" data-toggle="modal" data-target="#sua" onClick={() => this.layDataSua(value)}>Sửa</div>
                        {/* <!-- begin them moi --> */}
                        <div class="modal fade" id="sua" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog  modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalCenterTitle">Sửa</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {/* Form themMoi */}
                                        <div className="card text-center">
                                            <div className="card-header">
                                                <p className="disabled">Sửa</p>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <div className="form-group" >
                                                        <p style={{ textAlign: 'left' }}>Cấp bậc</p>
                                                        <select class="form-select form-control" aria-label="Default select example" name="tenCapBac" onChange={(event) => this.onChange(event)} >
                                                            <option selected>Chọn cấp bậc</option>
                                                            {this.hienThiTenCapBac()}
                                                        </select>
                                                        <p style={{ textAlign: 'left' }}>Chi phí</p>
                                                        <select class="form-select form-control" aria-label="Default select example" name="tenChiPhi" onChange={(event) => this.onChange(event)} >
                                                            <option selected>Chọn chi phí</option>
                                                            {this.hienThiTenChiPhi()}
                                                        </select>
                                                        <p style={{ textAlign: 'left' }}>Tiền định mức</p>
                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Tiền định mức (VND)" name="soTienDinhMuc" Value={this.state.hienThiSuaUer.soTienDinhMuc} onChange={(event) => this.onChange(event)} />
                                                        <p style={{ textAlign: 'left' }}>Đơn vị</p>
                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Đơn vị" name="donVi" Value={this.state.hienThiSuaUer.donVi} onChange={(event) => this.onChange(event)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end Form themMoi */}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <input type="submit" className="btn btn-primary " value="Sửa" onClick={() => this.onSua()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end them moi */}
                    </div>
                    <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                        <div className="fas fa-ban" onClick={() => this.onDelete(value.maCapBac, value.maChiPhi)}>Xóa</div>
                    </div>
                </td>


            )

        }
    }
    hienThiThaoTac = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05") {
            return (
                <th>Thao tác</th>
            )

        }
    }
    render() {

        return (
            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Quản lý định mức</h1>
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
                                {/* <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Thêm mới</div> */}
                                {this.hienThiBtnThemMoi()}
                            </div>
                            {/* <!-- begin them moi --> */}
                            <div class="modal fade" id="themMoi" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog  modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalCenterTitle">Thêm mới</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            {/* Form themMoi */}
                                            <div className="card text-center">
                                                <div className="card-header">
                                                    <p className="disabled">Thêm mới</p>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="form-group" >
                                                            <p style={{ textAlign: 'left' }}>Cấp bậc</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenCapBac" onChange={(event) => this.onChange(event)}>
                                                                <option selected>Chọn cấp bậc</option>
                                                                {this.hienThiTenCapBac()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Chi phí</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenChiPhi" onChange={(event) => this.onChange(event)}>
                                                                <option selected>Chọn chi phí</option>
                                                                {this.hienThiTenChiPhi()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Số tiền định mức</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Số tiền định mức (VND)" name="soTienDinhMuc" onChange={(event) => this.onChange(event)} />
                                                            <p style={{ textAlign: 'left' }}>Đơn vị</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Đơn vị" name="donVi" onChange={(event) => this.onChange(event)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end Form themMoi */}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <input type="submit" className="btn btn-primary " value="Thêm mới" onClick={() => this.onThemMoi()} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end them moi */}
                        </div>
                        <div className="row " style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col">

                                <table className="table table-striped table-hover" >
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>Cấp bậc</th>
                                            <th>Chi phí</th>
                                            <th>Số tiền định mức</th>
                                            <th>Đơn vị</th>
                                            {/* <th>Thao tác</th> */}
                                            {this.hienThiThaoTac()}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.printData()}
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
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDinhMuc)
