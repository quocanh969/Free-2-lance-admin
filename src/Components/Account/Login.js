import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import '../../Assets/css/login.css';

class LoginComponent extends Component {

    getTimeColor() {
        let today = new Date();       
        let datetime = today.getHours()
        if(datetime >= 22 || datetime <= 4)
        {
            return {bgClass:'bg-night', greeting: 'Khuya rồi đấy, tranh thủ nghỉ sớm'};
        }
        else if(datetime >= 5 && datetime <= 7)
        {
            return {bgClass:'bg-early-morning',  greeting: 'Sáng sớm tinh mơ, đã tỉnh ngủ chưa'};
        }
        else if(datetime >= 8 && datetime <= 11)
        {
            return {bgClass:'bg-morning', greeting: 'Buổi sáng năng động, chúc ngày mới tốt lành'};
        }
        else if(datetime >= 12 && datetime <= 15)
        {
            return {bgClass:'bg-noon', greeting: 'Trời trưa nóng bức, cố lên'};
        }
        else if(datetime >= 16 && datetime <= 19)
        {
            return {bgClass:'bg-afternoon', greeting: 'Chiều muộn yên ả, thư thả làm việc'};
        }
        else
        {
            return {bgClass:'bg-evening', greeting: 'Làm viêc buổi đêm, tĩnh tâm'};
        }
    }

    render() {    
        let {bgClass, greeting} = this.getTimeColor(); 
        return (
            <div id='background-login' className={"container-fluid " + bgClass}>
                {/* Outer Row */}
                <div className='text-white text-center pt-3' style={{fontSize: '50px'}}>{greeting}</div>
                <div className="row justify-content-center">
                    <div className="col-6">
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
                                                    <input type="email"
                                                        required
                                                        className="form-control form-control-user"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Email"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password"
                                                        required
                                                        className="form-control form-control-user"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block mt-5 font-weight-bold font-20" type="submit">
                                                    Đăng nhập
                                                </button>
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

    }
}

const Login = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
export default Login;