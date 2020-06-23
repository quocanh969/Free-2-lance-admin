import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class TagsComponent extends Component {
    render() {
        return (
            <div>
                Tags component work !!!
            </div>
        )
    }
}

// Container
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const Tags = withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsComponent));
export default Tags;