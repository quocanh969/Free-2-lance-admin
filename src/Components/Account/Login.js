import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import '../../Assets/css/login.css';
import { sendLogIn } from '../../Actions/User.acction';
import { history } from '../../Ultis/history/history';

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let {onSendLogin} = this.props;

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        onSendLogin(username, password);
        
    }

    render() {
        let {sending, code, message } = this.props.SignInReducer;

        return (
            <div id='background-login' className={"container-fluid pt-5 "}>
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-6 mt-2">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">                                
                                {/* Nested Row within Card Body */}
                                <div className="row">
                                    <div className="col">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">ĐĂNG NHẬP TÀI KHOẢN NHÂN VIÊN</h1>
                                            </div>

                                            <form className="user" onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <input type="text"
                                                        required
                                                        className="form-control form-control-user"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password"
                                                        required
                                                        className="form-control form-control-user"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                {(
                                                    !sending && code === -1
                                                    ?
                                                    <div className="alert alert-danger rounded rounded-pill mt-2">
                                                        {message}
                                                    </div>
                                                    :
                                                    ''
                                                )}
                                                {(
                                                    sending
                                                    ?
                                                    <div className='text-center mt-5'>
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                    :
                                                    <button className="btn btn-primary btn-user btn-block mt-5 font-weight-bold font-20" type="submit">
                                                        Đăng nhập
                                                    </button>
                                                )}                                                
                                            </form>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        onSendLogin: (username, password) => {
            dispatch(sendLogIn(username, password));
        },
    }
}

const Login = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
);;

export default Login;