import { history } from '../Ultis/history/history';
import { getFigureDataAPI, getPercentageDataAPI } from '../Services/Home.service';

export const getFigureData = () => {
    return (dispatch) => {
        getFigureDataAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(figureData) {
        return {
            type: 'UPDATE_FIGURE_DATA',
            figureData,
        }
    }
}

export const getPercentageData = () => {
    return (dispatch) => {
        getPercentageDataAPI().then(res => {
            if (res.data.code === '200') {
                dispatch(updateState(res.data.data));
            } else {
                console.log(res.data);
            }
        }).catch(err => {
            alert(`Lỗi hệ thống\n` + err);
        })
    }
    function updateState(percentageData) {
        return {
            type: 'UPDATE_PERCENTAGE_DATA',
            percentageData,
        }
    }
}