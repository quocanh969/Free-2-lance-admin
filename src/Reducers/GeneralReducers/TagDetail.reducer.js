const initState = {
    tagInfo: null,

    newTagName: '',

    isSubmitted: false,
}

const TagDetailReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TAG_STATE_UPDATE':
            return {
                ...state,
                tagInfo: action.tag,
                isSubmitted: false,
            };
        case 'ADD_FORM_RESET':
            return initState;
        case 'SUBMIT_FORM':
            return {
                ...state,
                isSubmitted: true,
            }
        default: return state;
    }
}

export default TagDetailReducer;