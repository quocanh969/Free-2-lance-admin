const initState = {
    topicInfo: null,

    newTopicName: '',
    newTopicImg: '',

    isSubmitted: false,
}

const TopicDetailReducer = (state = initState, action) => {
    switch (action.type) {
        case 'TOPIC_STATE_UPDATE':
            return {
                ...state,
                topicInfo: action.topic,
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

export default TopicDetailReducer;