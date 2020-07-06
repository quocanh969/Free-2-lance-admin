const initState = {
    // personal list
    topics: [],
    currentPage: 0,
    total: 0,
}

const TopicListReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'TOPIC_LIST_REQUEST':
            return {
                ...state,
                total: -1,
            }; 
        case 'TOPIC_LIST_UPDATE':
            return {
                ...state,
                topics: action.list,
                total: action.total,
                currentPage: action.currentPage,
            };        
        default: return state;
    }
}

export default TopicListReducer;