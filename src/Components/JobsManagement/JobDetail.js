import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../Assets/css/detail.css'
import JobInfo from './JobDetailTab/JobInfo';
import JobApplicants from './JobDetailTab/JobApplicants';

class JobDetailComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý thông tin công việc</h1>
                <p className="mb-4">
                    Thông tin chi tiết công việc
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-business-center" />&nbsp;&nbsp;Chi tiếc công việc</h6>
                    </div>
                    <div className="card-body">
                        <JobInfo></JobInfo>
                    </div>
                </div>
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