const initState = {
    tags: [],
    currentPage: 0,
    total: 0,
}

const TagListReducer = (state = initState, action) => {
    switch(action.type)
    {
        case 'TAG_LIST_UPDATE':
            return {
                ...state,
                tags: action.list,
                total: action.total,
                currentPage: action.currentPage,
            };        
        default: return state;
    }
}

export default TagListReducer;