import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';


class QuanLyCapBac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trangThai: true,
            data: [],
            maCapBac: '',
            tenCapBac: '',
            moTa: '',
            hienThiSuaCapbac: [],
            searchItem: '',
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
            url: 'https://localhost:5001/api/CapBac',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({ data: res.data }
            );
        }).catch(err => {
            console.log(err);
        })
    }


    onThemMoi = () => {
        var item = {};
        item.maCapBac = this.state.maCapBac;
        item.tenCapBac = this.state.tenCapBac;
        item.moTa = this.state.moTa
        var items = this.state.data;
        items.push(item)
        this.setState({ data: items });
        console.log(items);
        axios({
            method: 'POST',
            url: 'https://localhost:5001/api/CapBac',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                maCapBac: this.state.maCapBac,
                tenCapBac: this.state.tenCapBac,
                moTa: this.state.moTa,
            }
        }).then((res) => res.data)
            .then((respon) => {
                console.log(respon);
            })
    }

    layDataSua = (value) => {
        // console.log(value);
        this.setState({ hienThiSuaCapbac: value });
        console.log(this.state.hienThiSuaCapbac);

    }

    onSua = () => {
        var dataSua = {};
        dataSua.maCapBac = this.state.hienThiSuaCapbac.maCapBac;
        dataSua.tenCapBac = this.state.tenCapBac;
        dataSua.moTa = this.state.moTa
        console.log(dataSua);
        this.setState({ dataSua: dataSua });
        this.state.data.forEach((value) => {
            if (value.maCapBac === dataSua.maCapBac) {
                value.tenCapBac = dataSua.tenCapBac;
                value.moTa = dataSua.moTa
            }
        })
        var maCapBac = this.state.hienThiSuaCapbac.maCapBac
        console.log(maCapBac);

        axios({
            method: 'PUT',
            url: 'https://localhost:5001/api/CapBac',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                maCapBac: this.state.hienThiSuaCapbac.maCapBac,
                tenCapBac: this.state.tenCapBac,
                moTa: this.state.moTa
            }
        }).then((res) => res.data)
            .then((respon) => {
                console.log(respon);
            })
    }
    onDelete = (maCapBac) => {
        if (window.confirm("B???n c?? ch???c ch???n mu???n x??a")) {
            console.log(maCapBac);
            var tempData = this.state.data.filter(item => item.maCapBac !== maCapBac)
            this.setState({ data: tempData });
            axios({
                method: 'DELETE',
                url: 'https://localhost:5001/api/CapBac/' + maCapBac,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => res.data)
                .then((respon) => {
                    console.log(respon);
                })

        }
    }

    printData = () => {
        var { data, searchItem } = this.state;
        var dataSearch = [];
        data.forEach((item) => {
            if (item.tenCapBac.toLowerCase().indexOf(searchItem) !== -1) {
                dataSearch.push(item)
            }
        })
        return (
            dataSearch.map((value, key) => (
                <tr className="tr__canGiua">
                    <td>{key + 1}</td>
                    <td>{value.maCapBac}</td>
                    <td>{value.tenCapBac}</td>
                    <td>{value.moTa}</td>
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
                                                            <p style={{ textAlign: 'left' }}>M?? c???p b???c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" Value={this.state.hienThiSuaCapbac.maCapBac} name="maCapBac" onChange={(value) => this.onChange(value)} />
                                                            <p style={{ textAlign: 'left' }}>T??n c???p b???c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" Value={this.state.hienThiSuaCapbac.tenCapBac} name="tenCapBac" onChange={(value) => this.onChange(value)} />
                                                            <p style={{ textAlign: 'left' }}>M?? t???</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" Value={this.state.hienThiSuaCapbac.moTa} name="moTa" onChange={(value) => this.onChange(value)} />
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
                        <div className="btn btn-danger btn-group ml-2">
                            <div className="fas fa-ban" onClick={() => this.onDelete(value.maCapBac)} > X??a</div>
                        </div>
                    </td>
                </tr >
            )
            )

        )

    }

    render() {
        return (
            <div>
                <Header></Header>

                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>
                        <h1 className="heading-manager">Qu???n l?? c???p b???c</h1>
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
                                <div className="btn btn-primary themmoi " data-toggle="modal" data-target="#themMoi">Th??m m???i</div>
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
                                                            <p style={{ textAlign: 'left' }}>M?? c???p b???c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? c???p b???c" name="maCapBac" onChange={(event) => this.onChange(event)} />
                                                            <p style={{ textAlign: 'left' }}>T??n c???p b???c</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="T??n c???p b???c" name="tenCapBac" onChange={(event) => this.onChange(event)} />
                                                            <p style={{ textAlign: 'left' }}>M?? t???</p>
                                                            <input type="text" className="form-control" name id aria-describedby="helpId" placeholder="M?? t???" name="moTa" onChange={(event) => this.onChange(event)} />

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
                                            <th>M?? c???p b???c</th>
                                            <th>T??n c???p b???c</th>
                                            <th>M?? t???</th>
                                            {/* <th>Quy???n</th> */}
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
            </div>

        );
    }
}

export default (QuanLyCapBac)
