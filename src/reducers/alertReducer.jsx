import * as types from './../constants/actionType'

const alertInitialState = {
    onTrangThaiThemMoiThanhCong: false,
    onTrangThaiThemMoiThatBai: false,

    onTrangThaiSuaThanhCong: false,
    onTrangThaiSuaThatBai: false,

    onTrangThaiXoaThanhCong: false,
    onTrangThaiXoaThatBai: false,

    onTrangThaiDuyetThanhCong: false,
    onTrangThaiDuyetThatBai: false,

    onTrangThaiTuChoiDuyetThanhCong: false,
    onTrangThaiTuChoiDuyetThatBai: false,

    onTrangThaiThanhToanThanhCong: false,
    onTrangThaiThanhToanThatBai: false,

    onTrangThaiQuyenThanhCong: false,
    onTrangThaiQuyenThatBai: false,

}
const alertReducer = (state = alertInitialState, action) => {
    switch (action.type) {
        // them moi
        case types.ALERT_ON_TRANGTHAITHEMMOITHANHCONG:
            return { ...state, onTrangThaiThemMoiThanhCong: true }
        case types.ALERT_OFF_TRANGTHAITHEMMOITHANHCONG:
            return { ...state, onTrangThaiThemMoiThanhCong: false }
        case types.ALERT_ON_TRANGTHAITHEMMOITHATBAI:
            return { ...state, onTrangThaiThemMoiThatBai: true }
        case types.ALERT_OFF_TRANGTHAITHEMMOITHATBAI:
            return { ...state, onTrangThaiThemMoiThatBai: false }
        // sua
        case types.ALERT_ON_TRANGTHAISUATHANHCONG:
            return { ...state, onTrangThaiSuaThanhCong: true }
        case types.ALERT_OFF_TRANGTHAISUATHANHCONG:
            return { ...state, onTrangThaiSuaThanhCong: false }
        case types.ALERT_ON_TRANGTHAISUATHATBAI:
            return { ...state, onTrangThaiSuaThatBai: true }
        case types.ALERT_OFF_TRANGTHAISUATHATBAI:
            return { ...state, onTrangThaiSuaThatBai: false }
        // xoa
        case types.ALERT_ON_TRANGTHAIXOATHANHCONG:
            return { ...state, onTrangThaiXoaThanhCong: true }
        case types.ALERT_OFF_TRANGTHAIXOATHANHCONG:
            return { ...state, onTrangThaiXoaThanhCong: false }
        case types.ALERT_ON_TRANGTHAIXOATHATBAI:
            return { ...state, onTrangThaiXoaThatBai: true }
        case types.ALERT_OFF_TRANGTHAIXOATHATBAI:
            return { ...state, onTrangThaiXoaThatBai: false }
        // duyet
        case types.ALERT_ON_TRANGTHAIDUYETTHANHCONG:
            return { ...state, onTrangThaiDuyetThanhCong: true }
        case types.ALERT_OFF_TRANGTHAIDUYETTHANHCONG:
            return { ...state, onTrangThaiDuyetThanhCong: false }
        case types.ALERT_ON_TRANGTHAIDUYETTHATBAI:
            return { ...state, onTrangThaiDuyetThatBai: true }
        case types.ALERT_OFF_TRANGTHAIDUYETTHATBAI:
            return { ...state, onTrangThaiDuyetThatBai: false }
        // tu choi duyet
        case types.ALERT_ON_TRANGTHAITUCHOIDUYETTHANHCONG:
            return { ...state, onTrangThaiTuChoiDuyetThanhCong: true }
        case types.ALERT_OFF_TRANGTHAITUCHOIDUYETTHANHCONG:
            return { ...state, onTrangThaiTuChoiDuyetThanhCong: false }
        case types.ALERT_ON_TRANGTHAITUCHOIDUYETTHATBAI:
            return { ...state, onTrangThaiTuChoiDuyetThatBai: true }
        case types.ALERT_OFF_TRANGTHAITUCHOIDUYETTHATBAI:
            return { ...state, onTrangThaiTuChoiDuyetThatBai: false }
        // thanh toan
        case types.ALERT_ON_TRANGTHAITHANHTOANTHANHCONG:
            return { ...state, onTrangThaiThanhToanThanhCong: true }
        case types.ALERT_OFF_TRANGTHAITHANHTOANTHANHCONG:
            return { ...state, onTrangThaiThanhToanThanhCong: false }
        case types.ALERT_ON_TRANGTHAITHANHTOANTHATBAI:
            return { ...state, onTrangThaiThanhToanThatBai: true }
        case types.ALERT_OFF_TRANGTHAITHANHTOANTHATBAI:
            return { ...state, onTrangThaiThanhToanThatBai: false }
        // quyen
        case types.ALERT_ON_TRANGTHAIQUYENTHANHCONG:
            return { ...state, onTrangThaiQuyenThanhCong: true }
        case types.ALERT_OFF_TRANGTHAIQUYENTHANHCONG:
            return { ...state, onTrangThaiQuyenThanhCong: false }
        case types.ALERT_ON_TRANGTHAIQUYENTHATBAI:
            return { ...state, onTrangThaiQuyenThatBai: true }
        case types.ALERT_OFF_TRANGTHAIQUYENTHATBAI:
            return { ...state, onTrangThaiQuyenThatBai: false }
        //

        default:
            return state
    }
}

export default alertReducer;