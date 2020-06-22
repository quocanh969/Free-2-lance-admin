import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class BusinessUsersComponent extends Component {
    render() {
        return (
            <div>
                Business uesrs work !!!
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
  
  const BusinessUsers = withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessUsersComponent));
  export default BusinessUsers;