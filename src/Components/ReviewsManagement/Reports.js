import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ReportsComponent extends Component {
    render() {
        return (
            <div>
                Report work !!!
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
  
  const Reports = withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsComponent));
  export default Reports;