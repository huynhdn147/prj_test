import axios from 'axios';
import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from './../actions/actions'
import Footer from './Footer';
import Header from './Header';

import Nav from './Nav';
class Home extends Component {

    render() {
        return (
            <div>
                <Header></Header>


                <div class="row-container">
                    <Nav></Nav>
                    <div className="table-manager" style={{ padding: '0 25px 0 0' }}>

                        <div className="jumbotron content-home">
                            <h1 className="display-3" style={{ fontWeight: "350", textTransform: "uppercase" }}>Hệ thống thanh toán công tác phí trường Đại học Thăng Long</h1>
                            {/* <div className="btn btn-info" onClick={() => this.props.alertOn_TrangThaiThemMoiThatBai()}>click di</div>
                        <div className="btn btn-info" onClick={() => this.props.alertOff_TrangThaiThemMoiThatBai()}>click di</div> */}

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
        alertReducer: state.alertReducer

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOn_TrangThaiThemMoiThatBai: () => { dispatch(actions.alertOn_TrangThaiThemMoiThatBai()) },
        alertOff_TrangThaiThemMoiThatBai: () => { dispatch(actions.alertOff_TrangThaiThemMoiThatBai()) },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)