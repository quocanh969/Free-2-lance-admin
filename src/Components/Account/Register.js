import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class RegisterComponent extends Component {
    render() {
        return (
            <div>
                
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

const Register = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterComponent));
export default Register;