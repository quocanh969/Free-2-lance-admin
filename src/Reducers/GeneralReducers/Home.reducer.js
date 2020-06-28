import Home from "../../Components/Home";

const initState = {
    percentageData: [],
    figureData: [],
}

const HomeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_FIGURE_DATA': {
            return {
                ...state,
                figureData: action.figureData,
            }
        }
        case 'UPDATE_PERCENTAGE_DATA': {
            return {
                ...state,
                percentageData: action.percentageData,
            }
        }
        default: return state;
    }
}

export default HomeReducer;
