import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'

class QuanLyThanhToan extends Component {
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
            tongChiPhi: '',
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
            maHoaDon: '',
            layDataChiTiet: [],
            dataDeXuatThanhToan: [],
            tenNhanVien: '',
            titleThanhToan: "Thanh toan"
        }
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/ThanhToan',
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
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDeXuatThanhToan: res.data });
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
    tenNhanVienDeXuatTrongBtnThanhToan = () => {

        return (
            <h6 style={{ textAlign: 'left' }} >Nh??n vi??n ????? xu???t: <p className="text-uppercase" style={{ display: "inline", fontSize: "20px", fontWeight: "bold" }}>{this.state.layTenNhanVienDeXuat}</p></h6>

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
    layMaChuyenCongTac = (valueMaChuyenCongTac, value, valueTenNhanVien) => {

        this.setState({ layMaChuyenCongTac: valueMaChuyenCongTac });
        this.setState({ layDataChiTiet: value });
        this.setState({ layTenNhanVienDeXuat: valueTenNhanVien });
        var getMaChuyenCongTacChiTiet = '';
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === valueMaChuyenCongTac)
                getMaChuyenCongTacChiTiet = item.maChuyenCongTac
        })
        // console.log(getMaChuyenCongTacChiTiet); // lay ra ma chuyen cong tac tuong ung voi chi tiet

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=' + getMaChuyenCongTacChiTiet,
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

    thanhToan = (valueMaChuyenCongTac, maHoaDon, maDeXuat) => {
        if (window.confirm("B???n c?? ch???c ch???n thanh to??n")) {
            var getMaChuyenCongTacChiTiet = '';
            this.state.dataNhanVienCongTac.forEach((item) => {
                if (item.maChuyenCongTac === valueMaChuyenCongTac)
                    getMaChuyenCongTacChiTiet = item.maChuyenCongTac
            })

            // console.log(getMaChuyenCongTacChiTiet); // lay ra ma chuyen cong tac tuong ung voi chi tiet

            axios({
                method: 'get',
                url: 'https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=' + getMaChuyenCongTacChiTiet,
                data: null,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.setState({ dataDeXuat: res.data });
            }).catch(err => {
                console.log(err)
            })

            axios({
                method: 'POST',
                url: 'https://localhost:5001/api/ThanhToan?MaHoaDon=' + maHoaDon + '&MaDeXuat=' + maDeXuat,
                data: null,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then(() => { window.location.reload() })
                .then(alert("Thanh toan"))
                .then((res) => this.props.alertOn_TrangThaiThanhToanThanhCong(res))

                .catch(err => this.props.alertOn_TrangThaiThanhToanThatBai(err))
        }
    }

    huyInHoaDon = () => {
        window.location.reload();
    }
    inHoaDon = () => {
        // window.location.reload();
        window.print()
    }
    printData = () => {
        ;
        var { data, searchItem } = this.state;
        var dataSearch = [];
        var layMaChuyenCongTac = [];
        data.forEach((item) => {
            if (item.maHoaDon.toLowerCase().indexOf(searchItem) !== -1 || item.maDeXuat.toLowerCase().indexOf(searchItem) !== -1 ||
                item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1 || item.thoiGianDeXuat.toLowerCase().indexOf(searchItem) !== -1 ||
                item.tinhTrang.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item);

                layMaChuyenCongTac.push(item.maChuyenCongTac)
            }
        })
        // console.log(layMaChuyenCongTac);
        var getDataNhanVienCongTac = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === this.state.layMaChuyenCongTac) {
                getDataNhanVienCongTac.push(item);
            }

        })
        // console.log(getDataNhanVienCongTac);

        return (
            dataSearch.map((value, key) => (

                <tr className="tr__canGiua" >
                    {/* <td>???? th???c hi???n</td> */}
                    <td>{key + 1}</td>
                    <td>{value.maHoaDon}</td>
                    <td>{value.maDeXuat}</td>
                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.soNhanVien}</td>
                    <td>{value.thoiGianDeXuat}</td>
                    <td>{value.tongChiPhi}</td>
                    <td>{value.tinhTrang}</td>
                    <td><a href="" data-toggle="modal" data-target="#" data-toggle="modal" data-target="#chiTiet" onClick={() => this.layMaChuyenCongTac(value.maChuyenCongTac, value, value.tenNhanVienDeXuat)}>Chi ti???t</a></td>
                    {/* begin Form chi tiet */}
                    <div className="modal fade" id="chiTiet" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalScrollableTitle">Chi ti???t</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">??</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* begin chi tiet */}
                                    <div className="card text-center">
                                        <div className="card-header">
                                            <h4 className="disabled">Chi ti???t</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    {/* begin row th??ng tin chuy???n c??ng t??c */}
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <p style={{ textAlign: 'left' }}>Nh??n vi??n ????? xu???t</p>
                                                            {this.tenNhanVienDeXuat()}

                                                        </div>
                                                        <div className="col-6">
                                                            {/* begin row th??ng tin nh??n vi??n c??ng t??c */}
                                                            <div className="row">
                                                                <div className="col">
                                                                    <table className="table table-striped table-hover">
                                                                        <thead>
                                                                            <tr className="tr__canGiua" >
                                                                                <th>Nh??n vi??n c??ng t??c</th>
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
                                                            {/* end row th??ng tin chuy???n c??ng t??c */}
                                                        </div>
                                                    </div>
                                                    {/* end row th??ng tin chuy???n c??ng t??c */}


                                                    <h4>Danh s??ch chi ph?? c??ng t??c</h4>
                                                    {/* begin DS chi ph?? c??ng t??c */}
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <table className="table table-striped table-hover">
                                                                <thead>
                                                                    <tr className="tr__canGiua" >
                                                                        <th>STT</th>
                                                                        <th>T??n chi ph??</th>
                                                                        <th>S??? ti???n chi ti??u</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.deXuat()}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    {/* end DS chi ph?? c??ng t??c */}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end chi tiet */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" >OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end Form chi tiet */}
                    <td><a href="" data-toggle="modal" data-toggle="modal" data-target="#hoaDon" onClick={() => this.layMaChuyenCongTac(value.maChuyenCongTac, value, value.tenNhanVienDeXuat)}>In h??a ????n</a></td>
                    {/* begin Form hoa don */}
                    <div className="modal fade" id="hoaDon" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" /*data-backdrop="static"*/ aria-hidden="true">
                        <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalScrollableTitle">H??a ????n</h5>

                                </div>
                                <div className="modal-body">
                                    {/* */}
                                    <div className="card text-center">

                                        <h2 className="mt-3">H??A ????N (GTGT)</h2>
                                        <h5>Thanh to??n c??ng t??c ph?? ?????i h???c Th??ng Long</h5>

                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <div className="row" style={{ padding: "0px 0px 0px 200px" }}>
                                                        <div className="col-6">
                                                            <h6 style={{ textAlign: 'left' }}>M?? h??a ????n: {this.state.layDataChiTiet.maHoaDon}</h6>
                                                            <h6 style={{ textAlign: 'left' }}>M?? ????? xu???t: {this.state.layDataChiTiet.maDeXuat}</h6>
                                                            <h6 style={{ textAlign: 'left' }}>T??n CTT:  {this.state.layDataChiTiet.tenChuyenCongTac}</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 style={{ textAlign: 'left' }}>S??? nh??n vi??n: {this.state.layDataChiTiet.soNhanVien}</h6>
                                                            <h6 style={{ textAlign: 'left' }}>Th???i gian ????? xu???t: {this.state.layDataChiTiet.thoiGianDeXuat}</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3 ml-3">
                                                        <h5> 1. Danh s??ch nh??n vi??n c??ng t??c</h5>
                                                    </div>
                                                    {/* begin row th??ng tin chuy???n c??ng t??c */}
                                                    <div className="row ml-4">
                                                        <div className="col-6">
                                                            {this.tenNhanVienDeXuatTrongBtnThanhToan()}

                                                        </div>
                                                        <div className="col-6">
                                                            {/* begin row th??ng tin nh??n vi??n c??ng t??c */}
                                                            <h6 style={{ textAlign: 'left', display: "inline" }}>Nh??n vi??n c??ng t??c: </h6>
                                                            <p style={{ display: "inline", fontSize: "20px", fontWeight: "bold" }}>
                                                                {
                                                                    getDataNhanVienCongTac.map((value, key) => (
                                                                        <p  >{value.tenNhanVien}</p>
                                                                    )
                                                                    )
                                                                }
                                                            </p>


                                                            {/* end row th??ng tin chuy???n c??ng t??c */}
                                                        </div>
                                                    </div>
                                                    {/* end row th??ng tin chuy???n c??ng t??c */}

                                                    <h2 className="mt-3">Danh s??ch chi ph?? c??ng t??c</h2>
                                                    {/* begin DS chi ph?? c??ng t??c */}
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <table className="table table-striped table-hover">
                                                                <thead>
                                                                    <tr className="tr__canGiua" >
                                                                        <th>STT</th>
                                                                        <th>T??n chi ph??</th>
                                                                        <th>S??? ti???n chi ti??u (VND)</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.deXuat()}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    {/* end DS chi ph?? c??ng t??c */}
                                                    <p className="ml-4" style={{ textAlign: 'left', fontSize: "20px", fontWeight: "bold" }}>2. T???ng ti???n thanh to??n: {this.state.layDataChiTiet.tongChiPhi} (VND)</p>
                                                    <div className="row mt-3">
                                                        <div className="col-6">
                                                            <h5>Ng?????i n???p </h5>
                                                            <p>(k??, ghi r?? h??? t??n)</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <h5>Ng?????i nh???n </h5>
                                                            <p>(k??, ????ng d???u, ghi r?? h???, t??n)</p>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/* */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.huyInHoaDon()} >H???y</button>
                                    <button type="button" className="btn btn-primary" onClick={() => this.inHoaDon()}>In h??a ????n</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end form hoa don */}
                    {this.hienThiBtnThanhToan(value)}

                </tr >
            )
            )

        )

    }



    hienThiBtnThanhToan = (value) => {
        if (value.tinhTrang === "Da Thanh Toan") {
            return (
                <td>
                    <div className="btn btn-danger thanh-toan">
                        <div className="fas fa-ban " >
                            <span className="ml-2">
                                ???? thanh to??n
                            </span>
                        </div>
                    </div>

                </td>
            )
        }
        if (value.tinhTrang === "Ban lanh dao da xet duyet") {
            return (
                <td>
                    <div className="btn btn-primary thanh-toan" style={{ fontSize: "22px" }}>
                        <div className="fa fa-edit" onClick={() => this.thanhToan(value.maChuyenCongTac, value.maHoaDon, value.maDeXuat)}>
                            <span className="ml-2">
                                Thanh to??n
                            </span>
                        </div>
                    </div>

                </td>
            )
        }
        if (value.tinhTrang.indexOf("Phong ke toan") !== -1 || value.tinhTrang.indexOf("Truong bo phan") !== -1) {
            return (
                <td>
                    <div className="btn btn-warning thanh-toan">
                        <div className="fa fa-edit" id="thanhToan">
                            <span className="ml-2">
                                ??ang x??t duy???t
                            </span>
                        </div>
                    </div>

                </td>
            )
        }
        if (value.tinhTrang.indexOf("Chua xet duyet") !== -1) {
            return (
                <td>
                    <div className="btn btn-secondary thanh-toan">
                        <div className="fa fa-edit" id="thanhToan">
                            <span className="ml-2">
                                Ch??? x??t duy???t
                            </span>
                        </div>
                    </div>

                </td>
            )
        }
        // return (
        //     <td>
        //         {value.tinhTrang === "Da Thanh Toan" ?
        //             <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px", width: "218px" }}>
        //                 <div className="fas fa-ban " > <span className="ml-2">???? thanh to??n</span></div>
        //             </div>

        //             :
        //             <div className="btn btn-primary btn-group ml-2" style={{ fontSize: "22px" }}>
        //                 <div className="fa fa-edit" id="thanhToan" onClick={() => this.thanhToan(value.maChuyenCongTac, value.maHoaDon, value.maDeXuat)} > Ch??a thanh to??n</div>
        //             </div>

        //         }
        //     </td>
        // )
    }
    render() {
        console.log(this.state.dataUsers);


        return (
            <div>
                <Header></Header>


                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Qu???n l?? thanh to??n</h1>
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
                        </div>
                        <div className="row" style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>M?? h??a ????n</th>
                                            <th>M?? ????? xu???t</th>
                                            <th>T??n CCT</th>
                                            <th>S??? nh??n vi??n</th>
                                            <th>Th???i gian ????? xu???t</th>
                                            <th>T???ng chi ph??</th>
                                            <th>T??nh tr???ng</th>
                                            <th>Chi ti???t</th>
                                            <th>In h??a ????n</th>
                                            <th>Thao t??c</th>
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
            </div >

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
        alertOn_TrangThaiThanhToanThanhCong: () => { dispatch(actions.alertOn_TrangThaiThanhToanThanhCong()) },
        alertOff_TrangThaiThanhToanThanhCong: () => { dispatch(actions.alertOff_TrangThaiThanhToanThanhCong()) },
        alertOn_TrangThaiThanhToanThatBai: () => { dispatch(actions.alertOn_TrangThaiThanhToanThatBai()) },
        alertOff_TrangThaiThanhToanThatBai: () => { dispatch(actions.alertOff_TrangThaiThanhToanThatBai()) },

        alertOn_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOn_TrangThaiQuyenThanhCong()) },
        alertOff_TrangThaiQuyenThanhCong: () => { dispatch(actions.alertOff_TrangThaiQuyenThanhCong()) },
        alertOn_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOn_TrangThaiQuyenThatBai()) },
        alertOff_TrangThaiQuyenThatBai: () => { dispatch(actions.alertOff_TrangThaiQuyenThatBai()) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyThanhToan)
