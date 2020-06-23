import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class JobDetailComponent extends Component {
    render() {
        return (
            <div>
                Job Detail work !!
            </div>
        )
    }
}

// container

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const JobDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobDetailComponent));
export default JobDetail;