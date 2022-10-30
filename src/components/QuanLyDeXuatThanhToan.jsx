import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'

class QuanLyDeXuatThanhToan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: '',
            data: [],
            dataSua: [],
            maDeXuat: '',
            tenNhanVienDeXuat: '',
            maChuyenCongTac: '',
            tenChuyenCongTac: '',
            thoiGianDeXuat: '',
            tongTien: '',
            searchItem: '',
            tinhTrang: '',
            hienThiSuaUer: [],
            dataNhanVien: [],
            dataChuyenCongtac: [],
            dataNhanVienCongTac: [],
            dataUsers: [],
            dataChiPhi: [],
            dataDinhMuc: [],
            dataDeXuat: [],
            getMaChuyenCongTac: '',
            file: null,
            lyDo: '',
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
    }
    onChangeFile = (event) => {
        var file = event.target.files[0]

        this.setState({ file: file });
    }
    onChangeSoNhanVien = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });

        console.log(value);

        this.setState({ getOnChangeSoNhanVien: value });

        var getMaChuyenCongTac = '';
        this.state.dataChuyenCongtac.map((item) => {
            if (value == item.tenChuyenCongTac) {
                getMaChuyenCongTac = item.maChuyenCongTac;
            }
        })
        this.setState({ getMaChuyenCongTac: getMaChuyenCongTac });
        // console.log(this.state.getMaChuyenCongTac);
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan/SoTienChiTieu?MaChuyenCongTac=' + getMaChuyenCongTac,
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDeXuat: res.data });
        }).catch(err => {
            console.log(err)
        })
        console.log(this.state.getMaChuyenCongTac);

    }

    onChangeChiPhi = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: name
        });
        this.setState({ getOnChangeChiPhi: value });

    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DeXuatThanhToan',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ data: res.data }
            );
        })
            .catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));

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
            url: 'https://localhost:5001/api/ChuyenCongTac',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataChuyenCongtac: res.data });
        }).catch(err => {
            console.log(err)
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
            url: 'https://localhost:5001/api/ChiPhi',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then(res => {
            this.setState({ dataChiPhi: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
        axios({
            method: 'get',
            url: 'https://localhost:5001/api/DinhMuc',
            data: null,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ dataDinhMuc: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
    }
    themMoiDeXuat = () => {
        // begin dinh muc
        var maCapBacCuaNhanVienCongTac = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
                maCapBacCuaNhanVienCongTac.push(item.maCapBac)
            }

        })
        var layTenChiPhiTrongBangDinhMuc = [];
        this.state.dataDinhMuc.forEach((item) => {
            maCapBacCuaNhanVienCongTac.map((value) => {
                if (item.maCapBac === value) {
                    layTenChiPhiTrongBangDinhMuc.push(item)
                }
            })

        })
        var dinhMuc = [];
        layTenChiPhiTrongBangDinhMuc.forEach((item) => {
            if (item.tenChiPhi == this.state.getOnChangeChiPhi) {
                dinhMuc.push(item.soTienDinhMuc)

            }

        })
        // console.log(dinhMuc);

        let DINHMUC = 0;
        for (let i = 0; i < dinhMuc.length; i++) {
            DINHMUC += dinhMuc[i] * 1
        }
        // end dinh muc
        var maChiPhi = [];
        this.state.dataChiPhi.map((value) => {
            if (this.state.getOnChangeChiPhi === value.tenChiPhi) {
                maChiPhi = value.maChiPhi
            }
        })
        // console.log(this.state.soTienChiTieu);
        var item = {};
        // item.maChuyenCongTac = this.state.getMaChuyenCongTac;
        item.tenChiPhi = this.state.getOnChangeChiPhi;
        if (this.state.soTienChiTieu <= DINHMUC) {
            item.soTienChiTieu = this.state.soTienChiTieu * 1;

        }
        else {
            item.soTienChiTieu = DINHMUC;
            alert("Số tiền chi tiêu phải nhỏ hơn hoặc bằng định mức")
        }

        item.tongThanhToan = 0;
        var items = this.state.dataDeXuat;
        items.push(item)
        this.setState({ dataDeXuat: items });

        console.log(this.state.getMaChuyenCongTac);
        console.log(this.state.getOnChangeSoNhanVien);
        console.log(maChiPhi);
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DeXuatThanhToan/ChiPhiThanhToan',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                maChuyenCongTac: this.state.getMaChuyenCongTac,
                maChiPhi: maChiPhi,
                soTienChiTieu: item.soTienChiTieu * 1,
                tongThanhToan: 0,

            }
        }).then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res))
            .catch(err => this.props.alertOn_TrangThaiThemMoiThatBai(err));
    }
    themMoiDeXuatThanhToan = () => {


        var tongTien = []
        this.state.dataDeXuat.map((value) => {
            tongTien.push(value.soTienChiTieu)
        })
        let TONGTIEN = 0;
        for (let i = 0; i < tongTien.length; i++) {
            TONGTIEN += tongTien[i]
        }
        var soNhanVien = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
                soNhanVien.push(item.maNhanVien)
            }

        })
        var tenNhanVienDeXuat = '';
        this.state.dataNhanVien.map((value, key) => {
            if (this.state.dataUsers.maNhanVien === value.maNhanVien) {
                tenNhanVienDeXuat = value.tenNhanVien
            }
        })

        var item = {};
        // item.maDeXuat = this.state.maDeXuat;
        item.tenChuyenCongTac = this.state.tenChuyenCongTac;
        item.tenNhanVien = tenNhanVienDeXuat;
        // item.thoiGianDeXuat = this.state.thoiGianDeXuat;
        item.soNhanVien = soNhanVien.length;
        item.tongTien = TONGTIEN;
        item.fileHoaDon = this.state.file;
        // soNhanVien

        var items = this.state.data;
        // items.push(item)
        this.setState({ data: items });
        // console.log(this.state.data);
        var { file } = this.state;
        var fileHoaDon = new FormData()
        fileHoaDon.append('img', file)
        // console.log(this.state.getMaChuyenCongTac);
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DeXuatThanhToan',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                // maDeXuat: this.state.maDeXuat,
                maChuyenCongTac: this.state.getMaChuyenCongTac,

                // thoiGianDeXuat: this.state.thoiGianDeXuat,
                tongTien: TONGTIEN,
                // fileHoaDon


            }
        }).then((res) => res.data)
            .then(() => { window.location.reload() })
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res) ? items.push(item) : null)
            .catch(err => this.props.alertOn_TrangThaiThemMoiThatBai(err));
    }
    hienThiTenChuyenCongTac = () => {
        return (
            this.state.dataChuyenCongtac.map((value, key) => (
                <option>{value.tenChuyenCongTac}</option>

            ))
        )
    }
    tenNhanVienDeXuat = () => {
        var tenNhanVienDeXuat = '';
        this.state.dataNhanVien.map((value, key) => {
            if (this.state.dataUsers.maNhanVien === value.maNhanVien) {
                tenNhanVienDeXuat = value.tenNhanVien
            }
        })
        return (
            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder={tenNhanVienDeXuat} disabled />

        )

    }
    // thoiGianDeXuat = () => {
    //     var today = new Date();
    //     var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    //     return (
    //         <input type="text" className="form-control" name id aria-describedby="helpId" value={date} name="thoiGianDeXuat" onChange={(value) => this.onChange(value)} />

    //     )
    // }

    soNhanVien = () => {
        var soNhanVien = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
                soNhanVien.push(item.maNhanVien)
            }

        })

        return (
            <input type="text" className="form-control" name id aria-describedby="helpId" value={soNhanVien.length} name="soNhanVien" onChange={(value) => this.onChange(value)} />

        )

    }
    hienThiTenChiPhi = () => {
        return (
            this.state.dataChiPhi.map((value, key) => (
                <option>{value.tenChiPhi}</option>

            ))
        )
    }
    hienThiDonVi = () => {
        var donVi = [];
        this.state.dataDinhMuc.forEach((item) => {
            if (item.tenChiPhi == this.state.getOnChangeChiPhi) {
                donVi.push(item.donVi)
            }


        })
        var DONVI = []
        for (var i = 0; i < donVi.length; i++) {
            // console.log(donVi[1]);
            DONVI = donVi[1];
        }

        return (
            <input type="text" className="form-control" name id aria-describedby="helpId" value={DONVI} name="donVi" disabled />

        )
    }
    // begin thuat toan
    DINHMUC = () => {
        var maCapBacCuaNhanVienCongTac = [];
        this.state.dataNhanVienCongTac.forEach((item) => {
            if (item.tenChuyenCongTac == this.state.getOnChangeSoNhanVien) {
                maCapBacCuaNhanVienCongTac.push(item.maCapBac)
            }

        })
        var layTenChiPhiTrongBangDinhMuc = [];
        this.state.dataDinhMuc.forEach((item) => {
            maCapBacCuaNhanVienCongTac.map((value) => {
                if (item.maCapBac === value) {
                    layTenChiPhiTrongBangDinhMuc.push(item)
                }
            })

        })
        var dinhMuc = [];
        layTenChiPhiTrongBangDinhMuc.forEach((item) => {
            if (item.tenChiPhi == this.state.getOnChangeChiPhi) {
                dinhMuc.push(item.soTienDinhMuc)

            }

        })
        // console.log(dinhMuc);

        let DINHMUC = 0;
        for (let i = 0; i < dinhMuc.length; i++) {
            DINHMUC += dinhMuc[i] * 1
        }

        // console.log(DINHMUC);

        return (
            <input type="text" className="form-control" name id aria-describedby="helpId" value={DINHMUC} disabled />

        )
    }
    // end thuat toan
    printData = () => {

        var { data, searchItem } = this.state;
        var dataSearch = [];
        data.forEach((item) => {
            if (
                item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1 || item.thoiGianDeXuat.toLowerCase().indexOf(searchItem) !== -1 ||
                item.tinhTrang.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        return (
            dataSearch.map((value, key) => (
                <tr className="tr__canGiua" >
                    {/* <td>đã thực hiện</td> */}
                    <td>{key + 1}</td>
                    <td>{value.maDeXuat}</td>
                    <td>{value.tenNhanVien}</td>
                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.soNhanVien}</td>
                    <td>{value.thoiGianDeXuat}</td>
                    <td>{value.tongTien}</td>
                    <td>{value.tinhTrang}</td>
                    <td>{value.lydo}</td>

                    <td>
                        {
                            value.tinhTrang === "Chua xet duyet" ?
                                <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                                    <div className="fas fa-ban" onClick={() => this.onDeleteDeXuatThanhToan(value.maDeXuat)}> Xóa</div>
                                </div> :
                                null
                        }

                    </td>
                </tr >
            )
            )

        )

    }
    onDeleteDeXuatThanhToan = (maDeXuat) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa")) {
            // console.log(maPhongBan);
            var tempData = this.state.data.filter(item => item.maDeXuat !== maDeXuat)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/DeXuatThanhToan?MaDeXuat=' + maDeXuat,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiXoaThatBai(err));
        }
    }
    deXuat = () => {
        return (
            this.state.dataDeXuat.map((value, key) => (
                <tr className="tr__canGiua">
                    <td>{key + 1}</td>
                    <td>{value.tenChiPhi}</td>
                    <td>{value.soTienChiTieu}</td>
                    <td>
                        <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fa fa-edit" onClick={() => this.onDeleteDeXuat(value.maChuyenCongTac, value.maChiPhi)}> Xóa</div>
                        </div>
                    </td>
                </tr>
            )

            )
        )
    }
    onDeleteDeXuat = (maChuyenCongTac, maChiPhi) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa")) {

            var tempData = this.state.dataDeXuat.filter(item => item.maChuyenCongTac !== maChuyenCongTac || item.maChiPhi !== maChiPhi)
            this.setState({ dataDeXuat: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/DeXuatThanhToan/ChiPhiCongTac?MaChuyenCongTac=' + maChuyenCongTac + '&MaChiPhi=' + maChiPhi,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((res) => this.props.alertOn_TrangThaiXoaThanhCong(res))
                .catch(err => this.props.alertOn_TrangThaiXoaThatBai(err));

        }
    }
    tongChiPhi = () => {
        var tongTien = []
        this.state.dataDeXuat.map((value) => {
            tongTien.push(value.soTienChiTieu)
        })
        let TONGTIEN = 0;
        for (let i = 0; i < tongTien.length; i++) {
            TONGTIEN += tongTien[i]
        }

        return (

            <input type="text" className="form-control" name id aria-describedby="helpId" value={TONGTIEN} disabled />
        )


    }
    render() {
        // console.log(this.state.dataUsers);

        return (

            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Quản lý đề xuất thanh toán</h1>

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
                                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Thêm mới</div>
                            </div>
                            {/* begin Form thêm mới đề xuất thanh toán */}
                            <div className="modal fade" id="themMoi" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Thêm mới đề xuất</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {/* begin Them moi */}
                                            <div className="card text-center">
                                                <div className="card-header">
                                                    <h4 className="disabled">Thêm mới đề xuất</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {/* <p style={{ textAlign: 'left' }}>Mã đề xuất</p>
                                                                    <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Mã đề xuất" name="maDeXuat" onChange={(value) => this.onChange(value)} /> */}

                                                                    <p style={{ textAlign: 'left' }}>Nhân viên đề xuất</p>
                                                                    {this.tenNhanVienDeXuat()}
                                                                    <p style={{ textAlign: 'left' }}>Số nhân viên</p>
                                                                    {this.soNhanVien()}
                                                                </div>
                                                                <div className="col-6">
                                                                    <p style={{ textAlign: 'left' }}>Tên chuyến công tác</p>
                                                                    <select class="form-select form-control" aria-label="Default select example" name="tenChuyenCongTac" onChange={(event) => this.onChangeSoNhanVien(event)} >
                                                                        <option selected>Chọn chuyến công tác</option>
                                                                        {this.hienThiTenChuyenCongTac()}

                                                                    </select>
                                                                    {/* <p style={{ textAlign: 'left' }}>Thời gian đề xuất</p>
                                                                    <input type="date" className="form-control" name id aria-describedby="helpId" name="thoiGianDeXuat" onChange={(value) => this.onChange(value)} /> */}

                                                                </div>

                                                            </div>
                                                            {/* begin đề xuất */}
                                                            <div className=" btn-group mt-3"  >
                                                                <div className=" btn btn-primary fa fa-edit dexuat" data-toggle="modal" data-target="#trangThaiMoFormThemMoiNhanVien" style={{ fontSize: "22px" }} >Đề xuất</div>

                                                                {/* begin Form nhan vien them mới đề xuất */}
                                                                <div className="modal fade" id="trangThaiMoFormThemMoiNhanVien" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" /*data-backdrop="static"*/ aria-hidden="true">
                                                                    <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id="exampleModalScrollableTitle">Đề xuất</h5>

                                                                            </div>
                                                                            <div className="modal-body">
                                                                                {/* begin them moi đề xuất */}
                                                                                <div className="card text-center">
                                                                                    <div className="card-header">
                                                                                        <h4 className="disabled">Đề xuất</h4>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <div className="form-group">
                                                                                            <div className="form-group">
                                                                                                <div className="row">
                                                                                                    <div className="col-6">
                                                                                                        <p style={{ textAlign: 'left' }}>Chi phí</p>
                                                                                                        <select class="form-select form-control" aria-label="Default select example" name="tenChiPhi" onChange={(event) => this.onChangeChiPhi(event)} >
                                                                                                            <option disabled selected>Chọn chi phí</option>
                                                                                                            {this.hienThiTenChiPhi()}
                                                                                                        </select>
                                                                                                        <p style={{ textAlign: 'left' }}>Định mức</p>
                                                                                                        {this.DINHMUC()}

                                                                                                    </div>
                                                                                                    <div className="col-6">
                                                                                                        <p style={{ textAlign: 'left' }}>Số tiền chi tiêu</p>
                                                                                                        <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="Số tiền chi tiêu" name="soTienChiTieu" onChange={(value) => this.onChange(value)} />

                                                                                                        <p style={{ textAlign: 'left' }}>Đơn vị</p>
                                                                                                        {this.hienThiDonVi()}
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {/* end  them moi đề xuất */}
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                                                                <button type="button" className="btn btn-primary" onClick={() => this.themMoiDeXuat()}>Thêm mới</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* end form nhân viên them moi đề xuất */}
                                                            </div>
                                                            {/* end đề xuất */}

                                                            {/* begin danh sách các đề xuất của nhân viên */}
                                                            <div className="row mt-3">
                                                                <div className="col">
                                                                    <table className="table table-striped table-hover">
                                                                        <thead>
                                                                            <tr className="tr__canGiua" >
                                                                                <th>STT</th>
                                                                                <th>Tên chi phí</th>
                                                                                <th>Số tiền chi tiêu</th>
                                                                                <th>Thao tác</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.deXuat()}
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                            </div>
                                                            {/* end danh sách các đề xuất của nhân viên */}
                                                            <p style={{ textAlign: 'left' }}>Tổng chi phí</p>
                                                            {this.tongChiPhi()}
                                                            {/* begin choose file */}
                                                            <form>
                                                                <div className="form-group">
                                                                    <input type="file" className="form-control-file mt-3" id="exampleFormControlFile1" name="file" onChange={(value) => this.onChangeFile(value)} />
                                                                </div>
                                                            </form>
                                                            {/* end choose file */}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end them moi */}

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.themMoiDeXuatThanhToan()}>Thêm mới</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end Form thêm mới đề xuất thanh toán */}
                        </div>


                        <div className="row " style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>Mã đề xuất</th>
                                            <th>Nhân viên đề xuất</th>
                                            <th>Tên CCT</th>
                                            <th>Số nhân viên</th>
                                            <th>Thời gian đề xuất</th>
                                            <th>Tổng chi phí</th>
                                            <th>Tình trạng</th>
                                            <th>Lý do</th>
                                            <th>Thao tác</th>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDeXuatThanhToan)
