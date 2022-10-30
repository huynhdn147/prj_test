import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'

class DuyetDeXuatThanhToan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: '',
            data: [],

            maDeXuat: '',
            tenNhanVienDeXuat: '',
            maChuyenCongTac: '',
            tenChuyenCongTac: '',
            thoiGianDeXuat: '',
            tongTien: '',
            searchItem: '',
            tinhTrang: '',

            dataNhanVien: [],
            dataChuyenCongtac: [],
            dataNhanVienCongTac: [],
            dataUsers: [],
            dataChiPhi: [],
            dataDinhMuc: [],
            dataDeXuat: [],
            getMaChuyenCongTac: '',
            layMaChuyenCongTac: [],
            layMaCTT: '',
            dataDuyet: [],
            lyDo: '',
        }
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DuyetDeXuat',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ data: res.data });
        }).catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));

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

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/NhanVienCongTac',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataNhanVienCongTac: res.data }
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
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=' + this.state.layMaCTT,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDeXuat: res.data });
        }).catch(err => {
            console.log(err)
        })

    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
    }
    tenNhanVienDeXuat = () => {

        return (
            <input type="text" className="form-control" name id aria-describedby="helpId" style={{ fontSize: "20px" }} placeholder={this.state.layTenNhanVienDeXuat} disabled />

        )

    }
    deXuat = () => {

        return (
            this.state.dataDeXuat.map((value, key) => (
                <tr className="tr__canGiua">
                    <td>{key + 1}</td>
                    <td>{value.tenChiPhi}</td>
                    <td>{value.soTienChiTieu}</td>

                </tr>
            )
            )
        )
    }
    layMaChuyenCongTac = (valueMaChuyenCongTac, valueTenNhanVienDeXuat) => {
        this.setState({ layMaChuyenCongTac: valueMaChuyenCongTac });
        this.setState({ layTenNhanVienDeXuat: valueTenNhanVienDeXuat });
        var getMaChuyenCongTacChiTiet = '';
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === valueMaChuyenCongTac)
                getMaChuyenCongTacChiTiet = item.maChuyenCongTac
        })
        console.log(getMaChuyenCongTacChiTiet); // lay ra ma chuyen cong tac tuong ung voi chi tiet

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan/DuyetDeXuat/SoTienChiTieu?MaChuyenCongTac=' + getMaChuyenCongTacChiTiet,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDeXuat: res.data });
        }).catch(err => {
            console.log(err)
        })
    }

    duyetDeXuat = (maDeXuat, value) => {
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DuyetDeXuat/XetDuyet?MaDeXuat=' + maDeXuat,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiDuyetThanhCong(res))
            .then(alert("Duyệt thanh toán"))
            .then(() => { window.location.reload() })
            .catch(err => this.props.alertOn_TrangThaiDuyetThatBai(err));

        console.log(this.state.data);


    }
    layMaTuChoi = (maDeXuat) => {
        console.log(maDeXuat);
        this.setState({ layMaTuChoi: maDeXuat });
    }
    tuChoiDeXuat = () => {

        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DuyetDeXuat/TuChoi',
            data: {
                maDeXuat: this.state.layMaTuChoi,
                lyDo: this.state.lyDo
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiTuChoiDuyetThanhCong(res))
            .then(() => { window.location.reload() })
            .catch(err => this.props.alertOn_TrangThaiTuChoiDuyetThatBai(err));

        console.log(this.state.data);

    }
    printData = () => {

        var { data, searchItem } = this.state;
        var dataSearch = [];
        var layMaChuyenCongTac = [];
        data.forEach((item) => {
            if (
                item.thoiGianDeXuat.toLowerCase().indexOf(searchItem) !== -1 || item.tinhTrang.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
                layMaChuyenCongTac.push(item.maChuyenCongTac)
            }
        })
        // console.log(layMaChuyenCongTac);
        var getDataNhanVienCongTac = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === this.state.layMaChuyenCongTac)
                getDataNhanVienCongTac.push(item)
        })
        // console.log(getDataNhanVienCongTac);

        return (
            dataSearch.map((value, key) => (
                <tr className="tr__canGiua" >
                    {/* <td>đã thực hiện</td> */}
                    <td>{key + 1}</td>
                    <td>{value.maDeXuat}</td>
                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.soNhanVien}</td>
                    <td>{value.thoiGianDeXuat}</td>
                    <td>{value.tongChiPhi}</td>
                    <td>{value.tinhTrang}</td>
                    <td>{value.lyDo}</td>
                    <td><a href="" data-toggle="modal" data-target="#" data-toggle="modal" data-target="#chiTiet" onClick={() => this.layMaChuyenCongTac(value.maChuyenCongTac, value.tenNhanVien)}>Chi tiết</a></td>
                    {/* begin Form chi tiet */}
                    <div className="modal fade" id="chiTiet" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalScrollableTitle">Chi tiết</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* begin chi tiet */}
                                    <div className="card text-center">
                                        <div className="card-header">
                                            <h4 className="disabled">Chi tiết</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    {/* begin row thông tin chuyến công tác */}
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p style={{ textAlign: 'left' }}>Nhân viên đề xuất</p>
                                                            {this.tenNhanVienDeXuat()}

                                                        </div>
                                                        <div className="col-6">
                                                            {/* begin row thông tin nhân viên công tác */}
                                                            <div className="row">
                                                                <div className="col">
                                                                    <table className="table table-striped table-hover">
                                                                        <thead>
                                                                            <tr className="tr__canGiua" >
                                                                                <th>Nhân viên công tác</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                getDataNhanVienCongTac.map((value, key) => (
                                                                                    <tr className="tr__canGiua" >
                                                                                        <td>{value.tenNhanVien}</td>
                                                                                    </tr >
                                                                                )
                                                                                )
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                            </div>
                                                            {/* end row thông tin chuyến công tác */}
                                                        </div>
                                                    </div>
                                                    {/* end row thông tin chuyến công tác */}


                                                    <h4>Danh sách chi phí công tác</h4>
                                                    {/* begin DS chi phí công tác */}
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <table className="table table-striped table-hover">
                                                                <thead>
                                                                    <tr className="tr__canGiua" >
                                                                        <th>STT</th>
                                                                        <th>Tên chi phí</th>
                                                                        <th>Số tiền chi tiêu</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.deXuat()}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    {/* end DS chi phí công tác */}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end chi tiet */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end Form chi tiet */}
                    {this.hienThiBtnDuyet_TuChoi(value)}
                    {/* Modal tu choi */}
                    <div>
                        {/* Button trigger modal */}

                        {/* Modal */}
                        <div className="modal fade" id="tuChoi" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Từ chối</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Lý do từ chối" name="lyDo" onChange={(value) => this.onChange(value)} />

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                        <button type="button" className="btn btn-primary" onClick={() => this.tuChoiDeXuat(value.maDeXuat)}>OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* end modal tu choi */}
                </tr >
            )
            )

        )

    }




    hienThiBtnDuyet_TuChoi = (value) => {
        if (this.state.dataUsers.roleID === "RL03" && value.tinhTrang.indexOf("Chua xet duyet") !== -1) {
            return (
                <td>
                    <div>
                        <div className="btn btn-primary btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fa fa-edit" onClick={() => this.duyetDeXuat(value.maDeXuat, value)} > Duyệt</div>
                        </div>
                        <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fas fa-ban" data-toggle="modal" data-target="#tuChoi" onClick={() => this.layMaTuChoi(value.maDeXuat)} > Từ chối</div>

                        </div>
                    </div>
                </td>

            )
        }
        if (this.state.dataUsers.roleID === "RL04" && value.tinhTrang.indexOf("Truong bo phan da duyet") !== -1) {
            return (
                <td>
                    <div>
                        <div className="btn btn-primary btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fa fa-edit" onClick={() => this.duyetDeXuat(value.maDeXuat, value)} > Duyệt</div>
                        </div>
                        <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fas fa-ban" data-toggle="modal" data-target="#tuChoi" onClick={() => this.layMaTuChoi(value.maDeXuat)} > Từ chối</div>

                        </div>
                    </div>
                </td>
            )
        }
        if (this.state.dataUsers.roleID === "RL05" && value.tinhTrang.indexOf("Phong ke toan da xet duyet") !== -1) {
            return (
                <td>
                    <div>
                        <div className="btn btn-primary btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fa fa-edit" onClick={() => this.duyetDeXuat(value.maDeXuat, value)} > Duyệt</div>
                        </div>
                        <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fas fa-ban" data-toggle="modal" data-target="#tuChoi" onClick={() => this.layMaTuChoi(value.maDeXuat)} > Từ chối</div>

                        </div>
                    </div>
                </td>
            )
        }
        // if (this.state.dataUsers.roleID === "RL03" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
        //     return (

        //         <td>

        //             {value.tinhTrang.indexOf("Da Thanh Toan") !== -1 || value.tinhTrang.indexOf("tu choi") !== -1 ?
        //                 null
        //                 :

        //                 <div>
        //                     <div className="btn btn-primary btn-group ml-2" style={{ fontSize: "22px" }}>
        //                         <div className="fa fa-edit" onClick={() => this.duyetDeXuat(value.maDeXuat, value)} > Duyệt</div>
        //                     </div>
        //                     <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
        //                         <div className="fas fa-ban" data-toggle="modal" data-target="#tuChoi" onClick={() => this.layMaTuChoi(value.maDeXuat)} > Từ chối</div>

        //                     </div>
        //                 </div>

        //             }

        //         </td>


        //     )
        // }

    }
    hienThiThaoTac = () => {
        if (this.state.dataUsers.roleID === "RL03" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <th>Thao tác</th>
            )

        }
    }
    render() {
        console.log(this.state.dataUsers);
        return (

            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Duyệt đề xuất thanh toán</h1>
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
                        </div>
                        <div className="row" style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col "  >
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>Mã đề xuất</th>
                                            <th>Tên CCT</th>
                                            <th>Số nhân viên</th>
                                            <th>Thời gian đề xuất</th>
                                            <th>Tổng chi phí</th>
                                            <th>Tình trạng</th>
                                            <th>Lý do</th>
                                            <th>Chi tiết</th>
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
        alertOn_TrangThaiDuyetThanhCong: () => { dispatch(actions.alertOn_TrangThaiDuyetThanhCong()) },
        alertOff_TrangThaiDuyetThanhCong: () => { dispatch(actions.alertOff_TrangThaiDuyetThanhCong()) },
        alertOn_TrangThaiDuyetThatBai: () => { dispatch(actions.alertOn_TrangThaiDuyetThatBai()) },
        alertOff_TrangThaiDuyetThatBai: () => { dispatch(actions.alertOff_TrangThaiDuyetThatBai()) },

        alertOn_TrangThaiTuChoiDuyetThanhCong: () => { dispatch(actions.alertOn_TrangThaiTuChoiDuyetThanhCong()) },
        alertOff_TrangThaiTuChoiDuyetThanhCong: () => { dispatch(actions.alertOff_TrangThaiTuChoiDuyetThanhCong()) },
        alertOn_TrangThaiTuChoiDuyetThatBai: () => { dispatch(actions.alertOn_TrangThaiTuChoiDuyetThatBai()) },
        alertOff_TrangThaiTuChoiDuyetThatBai: () => { dispatch(actions.alertOff_TrangThaiTuChoiDuyetThatBai()) },

        alertOn_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOn_TrangThaiQuyenThanhCong()) },
        alertOff_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOff_TrangThaiQuyenThanhCong()) },
        alertOn_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOn_TrangThaiQuyenThatBai()) },
        alertOff_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOff_TrangThaiQuyenThatBai()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuyetDeXuatThanhToan)
