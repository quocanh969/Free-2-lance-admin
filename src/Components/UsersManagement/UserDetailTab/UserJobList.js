import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class UserJobListComponent extends Component {
    render() {
        return (
            <div>
                User job list
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

const UserJobList = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserJobListComponent));
export default UserJobList;