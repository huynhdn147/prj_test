import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'

class QuanLyChuyenCongTac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: '',
            data: [],
            dataSua: [],
            maChuyenCongTac: '',
            tenChuyenCongTac: '',
            ngayBatDau: '',
            ngayKetThuc: '',
            diaDiem: '',
            moTa: '',
            searchItem: '',
            hienThiSuaUer: [],
            dataNhanVienCongTac: [],
            layMaChuyenCongTac: [],
            layDataChiTiet: [],
            dataUsers: [],
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
        // this.onSearch()
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/ChuyenCongTac',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ data: res.data });
        }).catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));
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
    }

    onThemMoi = () => {
        var item = {};
        item.maChuyenCongTac = this.state.maChuyenCongTac;
        item.tenChuyenCongTac = this.state.tenChuyenCongTac;
        item.diaDiem = this.state.diaDiem;
        item.ngayBatDau = this.state.ngayBatDau;
        item.ngayKetThuc = this.state.ngayKetThuc;
        item.moTa = this.state.moTa;
        var items = this.state.data;
        // items.push(item)
        this.setState({ data: items });


        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/ChuyenCongTac',
            data: {
                maChuyenCongTac: this.state.maChuyenCongTac,
                tenChuyenCongTac: this.state.tenChuyenCongTac,
                ngayBatDau: this.state.ngayBatDau,
                ngayKetThuc: this.state.ngayKetThuc,
                diaDiem: this.state.diaDiem,
                moTa: this.state.moTa,
                trangThai: '',
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => res.data)
            .then(() => { window.location.reload() })
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res) ? items.push(item) : null)
            .catch(err => this.props.alertOn_TrangThaiThemMoiThatBai(err));
    }
    layDataSua = (value) => {

        this.setState({ hienThiSuaUer: value });
        console.log(this.state.hienThiSuaUer);

    }

    onSua = () => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n s???a")) {
            var dataSua = {};
            dataSua.maChuyenCongTac = this.state.hienThiSuaUer.maChuyenCongTac; //this.state.hienThiSuaUer.maPhongBan l?? data onChange nh???p v??o
            dataSua.tenChuyenCongTac = this.state.tenChuyenCongTac;
            dataSua.diaDiem = this.state.diaDiem;
            dataSua.ngayBatDau = this.state.ngayBatDau;
            dataSua.ngayKetThuc = this.state.ngayKetThuc;
            dataSua.moTa = this.state.moTa;

            
            this.setState({ dataSua: dataSua });
            console.log(dataSua.ngayBatDau);
            console.log(dataSua.ngayKetThuc);
            this.state.data.forEach((value) => {
                if (value.maChuyenCongTac === dataSua.maChuyenCongTac) {
                    value.tenChuyenCongTac = dataSua.tenChuyenCongTac;
                    value.diaDiem = dataSua.diaDiem;
                    value.ngayBatDau = dataSua.ngayBatDau;
                    value.ngayKetThuc = dataSua.ngayKetThuc;
                    value.moTa = dataSua.moTa;

                }
            })
            console.log(this.state.data);

            axios({
                method: 'PUT',
                url: 'https://localhost:5001/api/ChuyenCongTac',
                data: {
                    maChuyenCongTac: this.state.hienThiSuaUer.maChuyenCongTac,
                    tenChuyenCongTac: this.state.tenChuyenCongTac,
                    diaDiem: this.state.diaDiem,
                    ngayBatDau: this.state.ngayBatDau,
                    ngayKetThuc: this.state.ngayKetThuc,
                    moTa: this.state.moTa,
                    trangThai: '',
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then(() => { window.location.reload() })

                .then((res) => this.props.alertOn_TrangThaiSuaThanhCong(res))
                .catch(err => {this.props.alertOn_TrangThaiSuaThatBai(err)});
        }
    }
    onDelete = (maChuyenCongTac) => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n x??a")) {
            // console.log(maPhongBan);
            var tempData = this.state.data.filter(item => item.maChuyenCongTac !== maChuyenCongTac)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/ChuyenCongTac?MaChuyenCongTac=' + maChuyenCongTac,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiXoaThatBai(err));

        }
    }
    onDeleteNhanVienCongTac = (maNhanVien) => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n x??a")) {
            // console.log(maPhongBan);
            var tempData = this.state.dataNhanVienCongTac.filter(item => item.maNhanVien !== maNhanVien)
            this.setState({ dataNhanVienCongTac: tempData });
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
    layMaChuyenCongTac = (valueMaChuyenCongTac, value) => {

        this.setState({ layMaChuyenCongTac: valueMaChuyenCongTac });
        this.setState({ layDataChiTiet: value });


    }
    printData = () => {
        var { data, searchItem } = this.state;
        var dataSearch = [];
        var layMaChuyenCongTac = [];
        data.forEach((item) => {
            if (item.maChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1 || item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1 || item.ngayBatDau.toLowerCase().indexOf(searchItem) !== -1 || item.ngayKetThuc.toLowerCase().indexOf(searchItem) !== -1 || item.diaDiem.toLowerCase().indexOf(searchItem) !== -1 || item.moTa.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
                layMaChuyenCongTac.push(item.maChuyenCongTac)
            }
        })
        // this.setState({ layMaChuyenCongTac: layMaChuyenCongTac })

        var getDataNhanVienCongTac = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.maChuyenCongTac === this.state.layMaChuyenCongTac)
                getDataNhanVienCongTac.push(item)
        })
        // console.log(getDataNhanVienCongTac);



        return (
            dataSearch.map((value, key) => (

                <tr className="tr__canGiua" >
                    {/* <td>???? th???c hi???n</td> */}
                    <td>{key + 1}</td>
                    <td>{value.maChuyenCongTac}</td>
                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.ngayBatDau}</td>
                    <td>{value.ngayKetThuc}</td>
                    <td>{value.diaDiem}</td>
                    <td>{value.moTa}</td>
                    <td><a href="" data-toggle="modal" data-target="#" data-toggle="modal" data-target="#chiTiet" onClick={() => this.layMaChuyenCongTac(value.maChuyenCongTac, value)}>Chi ti???t</a></td>
                    <td>{value.trangThai}</td>
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
                                                            <p style={{ textAlign: 'left' }}>M?? chuy???n c??ng t??c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" value={this.state.layDataChiTiet.maChuyenCongTac} disabled />

                                                            <p style={{ textAlign: 'left' }}>T??n chuy???n c??ng t??c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" value={this.state.layDataChiTiet.tenChuyenCongTac} disabled />
                                                            <p style={{ textAlign: 'left' }}>?????a ??i???m</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" value={this.state.layDataChiTiet.diaDiem} disabled />

                                                        </div>
                                                        <div className="col-6" >
                                                            <p style={{ textAlign: 'left' }}>Th???i gian b???t ?????u</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" value={this.state.layDataChiTiet.ngayBatDau} disabled />
                                                            <p style={{ textAlign: 'left' }}>Th???i gian k???t th??c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" value={this.state.layDataChiTiet.ngayKetThuc} disabled />
                                                            <p style={{ textAlign: 'left' }}>M?? t???</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" value={this.state.layDataChiTiet.moTa} disabled />
                                                        </div>
                                                    </div>
                                                    {/* end row th??ng tin chuy???n c??ng t??c */}
                                                    <h4>Danh s??ch nh??n vi??n c??ng t??c</h4>
                                                    {/* begin row th??ng tin nh??n vi??n c??ng t??c */}
                                                    <div className="row">
                                                        <div className="col">
                                                            <table className="table table-striped table-hover">
                                                                <thead>
                                                                    <tr className="tr__canGiua" >
                                                                        <th>STT</th>
                                                                        <th>T??n chuy???n CT</th>
                                                                        <th>T??n nh??n vi??n</th>
                                                                        <th>Thao t??c</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {getDataNhanVienCongTac.map((value, key) => (
                                                                        <tr className="tr__canGiua" >
                                                                            {/* <td>???? th???c hi???n</td> */}
                                                                            <td>{key + 1}</td>
                                                                            <td>{value.maNhanVien}</td>
                                                                            <td>{value.tenNhanVien}</td>
                                                                            <td>
                                                                                <div className="btn btn-danger btn-group ml-2">
                                                                                    <div className="fa fa-edit" onClick={() => this.onDeleteNhanVienCongTac(value.maNhanVien)}  > X??a</div>
                                                                                </div>
                                                                            </td>
                                                                        </tr >
                                                                    )
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    {/* end row th??ng tin chuy???n c??ng t??c */}

                                                    {/* <p style={{ textAlign: 'left' }}>Tr???ng th??i</p> */}
                                                    {/* <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Tr???ng th??i" name="trangThai" /> */}
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

                    {this.hienThiBtnSua_Xoa(value)}
                </tr >
            )
            )

        )

    }
    hienThiBtnThemMoi = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Th??m m???i</div>

            )

        }
    }
    hienThiBtnSua_Xoa = (value) => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <td>

                    {/* begin Form s???a */}
                    <div className="modal fade" id="sua" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalScrollableTitle">S???a</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">??</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* begin sua */}
                                    <div className="card text-center">
                                        <div className="card-header">
                                            <h4 className="disabled">S???a</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            {/* <p style={{ textAlign: 'left' }}>M?? chuy???n c??ng t??c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? chuy???n c??ng t??c" name="maChuyenCongTac" Value={this.state.hienThiSuaUer.maChuyenCongTac} onChange={(value) => this.onChange(value)} />
                                                            */}
                                                            <p style={{ textAlign: 'left' }}>T??n chuy???n c??ng t??c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??n chuy???n c??ng t??c" name="tenChuyenCongTac" Value={this.state.hienThiSuaUer.tenChuyenCongTac} onChange={(value) => this.onChange(value)} />
                                                            <p style={{ textAlign: 'left' }}>?????a ??i???m</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="?????a ??i???m" name="diaDiem" Value={this.state.hienThiSuaUer.diaDiem} onChange={(value) => this.onChange(value)} />

                                                        </div>
                                                        <div className="col-6" >
                                                            {console.log(this.state.hienThiSuaUer.ngayBatDau)}
                                                            <p style={{ textAlign: 'left' }}>Th???i gian b???t ?????u</p>
                                                            <input type="date" className="form-control" name id aria-describedby="helpId" placeholder="Th???i gian b???t ?????u" name="ngayBatDau" Value={this.state.hienThiSuaUer.ngayBatDau} onChange={(value) => this.onChange(value)} />
                                                            <p style={{ textAlign: 'left' }}>Th???i gian k???t th??c</p>
                                                            <input type="date" className="form-control" name id aria-describedby="helpId" placeholder="Th???i gian k???t th??c" name="ngayKetThuc" Value={this.state.hienThiSuaUer.ngayKetThuc} onChange={(value) => this.onChange(value)} />
                                                            <p style={{ textAlign: 'left' }}>M?? t???</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? t???" name="moTa" Value={this.state.hienThiSuaUer.moTa} onChange={(value) => this.onChange(value)} />
                                                        </div>

                                                    </div>


                                                    {/* <p style={{ textAlign: 'left' }}>T??nh tr???ng</p>
                                                <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??nh Tr???ng" name="tinhTrang" /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* end sua */}
                                    {/* </div> */}

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">H???y</button>
                                        <button type="button" className="btn btn-primary" onClick={() => this.onSua()}>S???a</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* end Form s???a */}
                    {value.trangThai === "Chua thuc hien" ?
                        <div>
                            <div className="btn btn-warning btn-group">
                                <div className="fa fa-edit" data-toggle="modal" data-target="#sua" onClick={() => this.layDataSua(value)} >S???a</div>
                            </div>
                            <div className="btn btn-danger btn-group ml-2">
                                <div className="fas fa-ban" onClick={() => this.onDelete(value.maChuyenCongTac)}> X??a</div>
                            </div>
                        </div>
                        :
                        null
                    }

                </td>


            )

        }
    }
    hienThiThaoTac = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <th>Thao t??c</th>
            )

        }
    }
    render() {


        // console.log(this.state.dataNhanVienCongTac);
        return (
            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Qu???n l?? chuy???n c??ng t??c</h1>
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
                            {/* begin Form th??m m???i */}
                            <div className="modal fade" id="themMoi" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Th??m m???i</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">??</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {/* begin sua */}
                                            <div className="card text-center">
                                                <div className="card-header">
                                                    <h4 className="disabled">Th??m m???i</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {/* <p style={{ textAlign: 'left' }}>M?? chuy???n c??ng t??c</p>
                                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? chuy???n c??ng t??c" name="maChuyenCongTac" onChange={(value) => this.onChange(value)} />
                                                                  */}
                                                                    <p style={{ textAlign: 'left' }}>T??n chuy???n c??ng t??c</p>
                                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??n chuy???n c??ng t??c" name="tenChuyenCongTac" onChange={(value) => this.onChange(value)} />
                                                                    <p style={{ textAlign: 'left' }}>?????a ??i???m</p>
                                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="?????a ??i???m" name="diaDiem" onChange={(value) => this.onChange(value)} />

                                                                </div>
                                                                <div className="col-6">
                                                                    <p style={{ textAlign: 'left' }}>Th???i gian b???t ?????u</p>
                                                                    <input type="date" className="form-control" name id aria-describedby="helpId" placeholder="Th???i gian b???t ?????u" name="ngayBatDau" onChange={(value) => this.onChange(value)} />
                                                                    <p style={{ textAlign: 'left' }}>Th???i gian k???t th??c</p>
                                                                    <input type="date" className="form-control" name id aria-describedby="helpId" placeholder="Th???i gian k???t th??c" name="ngayKetThuc" onChange={(value) => this.onChange(value)} />
                                                                    <p style={{ textAlign: 'left' }}>M?? t???</p>
                                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? t???" name="moTa" onChange={(value) => this.onChange(value)} />
                                                                </div>

                                                            </div>

                                                            {/* <p style={{ textAlign: 'left' }}>T??nh tr???ng</p>
                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??nh Tr???ng" name="tinhTrang" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end sua */}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">H???y</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.onThemMoi()}>Th??m m???i</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end Form th??m m???i */}
                        </div>
                        <div className="row " style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>M?? chuy???n CT</th>
                                            <th>T??n chuy???n CT</th>
                                            <th>Th???i gian b???t ?????u</th>
                                            <th>Th???i gian k???t th??c</th>
                                            <th>?????a ??i???m</th>
                                            <th>M?? t???</th>
                                            <th>Chi ti???t</th>
                                            <th>Tr???ng th??i</th>
                                            {/* <th>Thao t??c</th> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyChuyenCongTac)
