import React, { Component } from 'react'
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from "react-redux";
import * as actions from '../actions/actions'
class AlertComponent extends Component {
    alert = () => {
        // them moi
        if (this.props.alertReducer.onTrangThaiThemMoiThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiThemMoiThanhCong()} timeout={1000}>Thêm mới thành công</Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiThemMoiThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiThemMoiThatBai()} timeout={1000}>Thêm mới thất bại</Alert>
            )
        }
        // sua
        if (this.props.alertReducer.onTrangThaiSuaThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiSuaThanhCong()} timeout={1000}>Sửa thành công</Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiSuaThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiSuaThatBai()} timeout={1000}>Sửa thất bại</Alert>
            )
        }
        // xoa
        if (this.props.alertReducer.onTrangThaiXoaThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiXoaThanhCong()} timeout={1000}>Xóa thành công</Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiXoaThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiXoaThatBai()} timeout={1000}>Xóa thất bại</Alert>
            )
        }
        // duyet
        if (this.props.alertReducer.onTrangThaiDuyetThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiDuyetThanhCong()} timeout={1000}>Duyệt thành công</Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiDuyetThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiDuyetThatBai()} timeout={1000}>Duyệt thất bại</Alert>
            )
        }
        // tu choi duyet
        if (this.props.alertReducer.onTrangThaiTuChoiDuyetThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiTuChoiDuyetThanhCong()} timeout={1000}>Từ chối duyệt </Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiTuChoiDuyetThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiTuChoiDuyetThatBai()} timeout={1000}>Từ chối duyệt thất bại</Alert>
            )
        }
        // thanh toan
        if (this.props.alertReducer.onTrangThaiThanhToanThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiThanhToanThanhCong()} timeout={1000}>Thanh toán thành công </Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiThanhToanThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiThanhToanThatBai()} timeout={1000}>Thanh toán thất bại</Alert>
            )
        }
        // quyen
        if (this.props.alertReducer.onTrangThaiQuyenThanhCong === true) {
            return (
                <Alert type="success" onDismiss={() => this.props.alertOff_TrangThaiQuyenThanhCong()} timeout={1000}>Có quyền </Alert>
            )
        }
        if (this.props.alertReducer.onTrangThaiQuyenThatBai === true) {
            return (
                <Alert type="danger" onDismiss={() => this.props.alertOff_TrangThaiQuyenThatBai()} timeout={1000}>Bạn không có quyền truy cập chức năng này</Alert>
            )
        }
    }
    render() {
        return (
            <AlertContainer>
                {this.alert()}
            </AlertContainer>

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

        alertOn_TrangThaiDuyetThanhCong: () => { dispatch(actions.alertOn_TrangThaiDuyetThanhCong()) },
        alertOff_TrangThaiDuyetThanhCong: () => { dispatch(actions.alertOff_TrangThaiDuyetThanhCong()) },
        alertOn_TrangThaiDuyetThatBai: () => { dispatch(actions.alertOn_TrangThaiDuyetThatBai()) },
        alertOff_TrangThaiDuyetThatBai: () => { dispatch(actions.alertOff_TrangThaiDuyetThatBai()) },

        alertOn_TrangThaiTuChoiDuyetThanhCong: () => { dispatch(actions.alertOn_TrangThaiTuChoiDuyetThanhCong()) },
        alertOff_TrangThaiTuChoiDuyetThanhCong: () => { dispatch(actions.alertOff_TrangThaiTuChoiDuyetThanhCong()) },
        alertOn_TrangThaiTuChoiDuyetThatBai: () => { dispatch(actions.alertOn_TrangThaiTuChoiDuyetThatBai()) },
        alertOff_TrangThaiTuChoiDuyetThatBai: () => { dispatch(actions.alertOff_TrangThaiTuChoiDuyetThatBai()) },

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
export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent)