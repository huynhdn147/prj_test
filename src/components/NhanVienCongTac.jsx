import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';
import { connect } from "react-redux";
import * as actions from './../actions/actions'

class NhanVienCongTac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: true,
            data: [],
            maChuyenCongTac: '',
            tenChuyenCongTac: '',
            searchItem: '',
            dataChuyenCongTac: [],
            dataPhongBan: [],
            dataCapBac: [],
            dataNhanVien: [],
            tenChuyenCongTac: '',
            tenPhongBan: '',
            tenCapBac: '',
            tenNhanVien: '',
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
    onChangePhongBan = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
        this.setState({ getOnChangePhongBan: value });
    }
    onChangeCapBac = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
        this.setState({ getonChangeCapBac: value });

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
            this.setState({ dataChuyenCongTac: res.data }
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
            this.setState({ data: res.data }
            );
        }).catch(err => this.props.alertOn_TrangThaiQuyenThatBai(err));
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
    hienThiTenChuyenCongTac = () => {
        return (
            this.state.dataChuyenCongTac.map((value, key) => (
                <option>{value.tenChuyenCongTac}</option>

            ))
        )
    }
    hienThiTenPhongBan = () => {
        return (
            this.state.dataPhongBan.map((value) => (
                <option>{value.tenPhongBan}</option>

            ))
        )
    }
    hienThiTenCapBac = () => {
        return (
            this.state.dataCapBac.map((value) => (
                <option>{value.tenCapBac}</option>
            ))
        )
    }
    hienThiTenNhanVien = () => {
        var getDaTaNhanVienTheoCapBacVaPhongBan = [];
        this.state.dataNhanVien.forEach((item) => {
            if (item.tenPhongBan == this.state.getOnChangePhongBan && item.tenCapBac == this.state.getonChangeCapBac) {
                getDaTaNhanVienTheoCapBacVaPhongBan.push(item)

            }

        })
        // console.log(getDaTaNhanVienTheoCapBacVaPhongBan);

        return (
            getDaTaNhanVienTheoCapBacVaPhongBan.map((value) => (
                <option>{value.tenNhanVien}</option>
            ))
        )


    }
    onThemMoi = () => {

        var item = {};
        item.tenChuyenCongTac = this.state.tenChuyenCongTac;
        // item.tenPhongBan = this.state.tenPhongBan
        // item.tenCapBac = this.state.tenCapBac
        item.tenNhanVien = this.state.tenNhanVien
        this.state.dataChuyenCongTac.map((value) => {
            if (value.tenChuyenCongTac === this.state.tenChuyenCongTac) {
                this.state.maChuyenCongTac = value.maChuyenCongTac;
            }
        })
        // this.state.dataPhongBan.map((value) => {
        //     if (value.tenPhongBan === this.state.tenPhongBan) {
        //         this.state.maPhongBan = value.maPhongBan;
        //     }
        // })
        // this.state.dataCapBac.map((value) => {
        //     if (value.tenCapBac === this.state.tenCapBac) {
        //         this.state.maCapBac = value.maCapBac;
        //     }
        // })
        this.state.dataNhanVien.map((value) => {
            if (value.tenNhanVien === this.state.tenNhanVien) {
                this.state.maNhanVien = value.maNhanVien;
            }
        })

        var items = this.state.data;
        // items.push(item)
        this.setState({ data: items });
        console.log(this.state.maChuyenCongTac);
        console.log(this.state.maNhanVien);
        console.log(this.state.data);

        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/NhanVienCongTac',
            data: {
                maChuyenCongTac: this.state.maChuyenCongTac,
                maNhanVien: this.state.maNhanVien,
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => res.data)
            .then(() => { window.location.reload() })
            .then((res) => this.props.alertOn_TrangThaiThemMoiThanhCong(res) ? items.push(item) : null)
            .catch(err => this.props.alertOn_TrangThaiThemMoiThatBai(err));

    }
    onDelete = (maChuyenCongTac, maNhanVien) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa")) {

            var tempData = this.state.data.filter(item => item.maChuyenCongTac !== maChuyenCongTac || item.maNhanVien !== maNhanVien)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/NhanVienCongTac?MaChuyenCongTac=' + maChuyenCongTac + '&MaNhanVien=' + maNhanVien,
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
            if (item.tenNhanVien.toLowerCase().indexOf(searchItem) !== -1 || item.tenChuyenCongTac.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        return (
            dataSearch.map((value, key) => (
                <tr className="tr__canGiua" >

                    {/* <td>đã thực hiện</td> */}
                    <td>{key + 1}</td>
                    <td>{value.tenChuyenCongTac}</td>
                    <td>{value.tenNhanVien}</td>
                    {this.hienThiBtnSua_Xoa(value)}

                </tr >
            )
            )

        )

    }
    hienThiBtnThemMoi = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Thêm mới</div>

            )

        }
    }
    hienThiBtnSua_Xoa = (value) => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <td>
                    {value.trangThai === "Chua thuc hien" ?
                        <div className="btn btn-danger btn-group ml-2" style={{ fontSize: "22px" }}>
                            <div className="fas fa-ban" onClick={() => this.onDelete(value.maChuyenCongTac, value.maNhanVien)}  > Xóa</div>
                        </div> : null
                    }

                </td>


            )

        }
    }
    hienThiThaoTac = () => {
        if (this.state.dataUsers.roleID === "RL01" || this.state.dataUsers.roleID === "RL05" || this.state.dataUsers.roleID === "RL04") {
            return (
                <th>Thao tác</th>
            )

        }
    }
    render() {
        // console.log(this.state.giaTri);
        console.log(this.state.data);


        return (
            <div>
                <Header></Header>
                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Quản lý nhân viên công tác</h1>
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
                            {/* begin Form thêm mới */}
                            <div className="modal fade" id="themMoi" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-cct modal-dialog-scrollable" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Thêm mới</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {/* begin sua */}
                                            <div className="card text-center">
                                                <div className="card-header">
                                                    <h4 className="disabled">Thêm mới</h4>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <p style={{ textAlign: 'left' }}>Chuyến công tác</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenChuyenCongTac" onChange={(value) => this.onChange(value)} >
                                                                <option selected>Chọn chuyến công tác</option>
                                                                {this.hienThiTenChuyenCongTac()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Phòng ban</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenPhongBan" onChange={(value) => this.onChangePhongBan(value)} >
                                                                <option selected>Chọn phòng ban</option>
                                                                {this.hienThiTenPhongBan()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Cấp bậc</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenCapBac" onChange={(value) => this.onChangeCapBac(value)}  >
                                                                <option selected>Chọn cấp bậc</option>
                                                                {this.hienThiTenCapBac()}
                                                            </select>
                                                            <p style={{ textAlign: 'left' }}>Nhân viên</p>
                                                            <select class="form-select form-control" aria-label="Default select example" name="tenNhanVien" onChange={(value) => this.onChange(value)} >
                                                                <option selected>Chọn nhân viên</option>
                                                                {this.hienThiTenNhanVien()}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end sua */}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.onThemMoi()}>Thêm mới</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end Form thêm mới */}
                        </div>
                        <div className="row " style={{ width: "101%", height: "600px", overflow: "auto" }}>
                            <div className="col">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr className="tr__canGiua" >
                                            <th>STT</th>
                                            <th>Tên chuyến CT</th>
                                            <th>Tên nhân viên</th>
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
export default connect(mapStateToProps, mapDispatchToProps)(NhanVienCongTac)
