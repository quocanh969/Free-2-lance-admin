const initState = {
    tagInfo: '',

    newTagName: '',

    isSubmitted: false,
}

const TagDetailReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TAG_STATE_UPDATE':
            return {
                ...state,
                tagInfo: action.tag,
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