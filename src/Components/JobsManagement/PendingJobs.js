import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class PendingJobsComponent extends Component {
    render() {
        return (
            <div>
                PendingJobs work !!!
            </div>
        )
    }
}

// Container
const mapStateToProps = (state) => {
    return state;
  }
  
  const mapDispatchToProps = dispatch => {
    return {
  
    }
  }
  
  const PendingJobs = withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingJobsComponent));
  export default PendingJobs;