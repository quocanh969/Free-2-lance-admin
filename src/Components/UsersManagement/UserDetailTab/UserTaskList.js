import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserTaskListComponent extends Component {
    render() {
        return (
            <div>
                User task list
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

const UserTaskList = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTaskListComponent));
export default UserTaskList;