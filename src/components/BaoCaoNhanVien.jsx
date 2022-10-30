import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'
import ReactToPdf from 'react-to-pdf';
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    // unit: 'in',
    // format: [1, 1]
};
// import ReactDOMServer from "react-dom/server";
class BaoCaoNhanVien extends Component {
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
            time: '',
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
        console.log(this.state.dataDeXuat);

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
        console.log(this.state.dataDeXuat);
        console.log(this.state.getMaChuyenCongTac);
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
            if (this.state.dataUsers === value.maNhanVien) {
                tenNhanVienDeXuat = value.tenNhanVien
            }
        })
        var item = {};
        item.maDeXuat = this.state.maDeXuat;
        item.tenChuyenCongTac = this.state.tenChuyenCongTac;
        item.tenNhanVien = tenNhanVienDeXuat;
        item.thoiGianDeXuat = this.state.thoiGianDeXuat;
        item.soNhanVien = soNhanVien.length;
        item.tongTien = TONGTIEN;
        item.fileHoaDon = this.state.file;
        // soNhanVien

        var items = this.state.data;
        items.push(item)
        this.setState({ data: items });
        console.log(this.state.data);
        var { file } = this.state;
        var fileHoaDon = new FormData()
        fileHoaDon.append('img', file)

        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/DeXuatThanhToan',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                maDeXuat: this.state.maDeXuat,
                maChuyenCongTac: this.state.getMaChuyenCongTac,
                nhanVienDeXuat: this.state.dataUsers,
                thoiGianDeXuat: this.state.thoiGianDeXuat,
                tongTien: TONGTIEN,
                fileHoaDon


            }
        }).then((res) => res.data)
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res))
            .then(() => { window.location.reload() })
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
            if (this.state.dataUsers === value.maNhanVien) {
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
    printPDF = () => {
        window.print()


    }
    onChangeChonThoiGian = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(name);
        // console.log(value);
        this.setState({
            [name]: value
        });

        this.setState({ time: value });
        // var selectTime = [];

        // this.state.data.forEach((item) => {
        //     if (item.thoiGianDeXuat.indexOf(value) !== -1) {
        //         selectTime.push(item)
        //     }
        // })
        // console.log(selectTime)
        // console.log(this.state.data);
    }
    printData = () => {

        var { data, searchItem } = this.state;
        var dataSearch = [];
        data.forEach((item) => {
            if (item.thoiGianDeXuat.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        // tìm kiếm theo select thời gian
        var selectTime = [];
        this.state.data.forEach((item) => {
            if (item.ngayBatDau.indexOf(this.state.time) !== -1) {
                selectTime.push(item)
            }
        })
        return (
            selectTime.map((value, key) => (
                <tr className="tr__canGiua" >
                    {/* <td>đã thực hiện</td> */}
                    <td>{key + 1}</td>

                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.soNhanVien}</td>
                    {/* <td>{value.thoiGianDeXuat}</td> */}
                    <td>{value.ngayBatDau}</td>
                    <td>{value.ngayKetThuc}</td>
                    <td>{value.tongTien}</td>
                    <td><a href="" data-toggle="modal" data-target="#" data-toggle="modal" data-target="#chiTiet">Chi tiết</a></td>
                    <td>{value.tinhTrang}</td>
                    <td>{value.lydo}</td>
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
                                                                            {/* {
                                                                                getDataNhanVienCongTac.map((value, key) => (
                                                                                    <tr className="tr__canGiua" >
                                                                                        <td>{value.tenNhanVien}</td>
                                                                                    </tr >
                                                                                )
                                                                                )
                                                                            } */}
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
        console.log(this.state.dataDeXuat);

        return (

            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Báo cáo</h1>

                        <div className="">

                            {/* begin search */}
                            <div className="d-flex justify-content-between" >
                                <div style={{ width: '20%' }}>
                                    <select class="form-select form-control" aria-label="Default select example" name="chonThoiGian" onChange={(event) => this.onChangeChonThoiGian(event)} >
                                        <option selected>Chọn thời gian</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                        <option>2017</option>
                                    </select>
                                </div>
                                {/* <div className="form-group ">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" >
                                                <i class="fas fa-search"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search ..." name="searchItem" value={this.state.searchItem} onChange={(event) => this.onChange(event)} />
                                    </div>
                                </div> */}
                                {/* end search */}
                                {/* <div className="btn btn-primary themmoi " onClick={() => this.printPDF()}>Xuất file PDF</div> */}

                                <ReactToPdf targetRef={ref} filename="baocao.pdf" options={options} x={0.5} y={0.5} scale={0.7}>
                                    {({ toPdf }) => (
                                        // <button onClick={toPdf}>Generate pdf</button>
                                        <div className="btn btn-primary themmoi " onClick={toPdf}>Xuất file PDF</div>
                                    )}
                                </ReactToPdf>
                            </div>

                        </div>


                        <div className="row mt-3" style={{ width: "101%", height: "600px", overflow: "auto" }} ref={ref}>
                            <div className="col">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>

                                            <th>Tên CCT</th>
                                            <th>Số nhân viên</th>
                                            <th>Ngày bắt đầu</th>
                                            <th>Ngày kết thúc</th>
                                            <th>Tổng chi phí</th>
                                            <th>Chi tiết</th>
                                            <th>Tình trạng</th>
                                            <th>Lý do</th>


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
export default connect(mapStateToProps, mapDispatchToProps)(BaoCaoNhanVien)
