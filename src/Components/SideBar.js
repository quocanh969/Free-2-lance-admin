import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import Logo from '../Assets/images/logo2.png';

class SideBarComponent extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-black sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <NavLink id='icon' className="py-2 text-center font-size-25" to='/'>                                        
                    <span className='font-weight-bold'><span className='text-primary'>FREE</span><span className='text-danger'>2</span><span className='text-white'>LANCE</span></span>
                </NavLink>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold py-3" to="/">
                        <i className="icon-material-outline-dashboard"/><span>&nbsp;Thông tin chung</span>
                    </NavLink>
                </li>
                
                <hr className="sidebar-divider" />                
                <div className="sidebar-heading">
                    Quản lý người dùng
                </div>
                <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold pb-2 pt-3" to="/personal-user-management">
                        <i className="icon-material-outline-business"/><span>&nbsp;Người dùng cá nhân</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold py-2" to="/business-user-management">
                        <i className="icon-material-outline-person-pin"/><span>&nbsp;Người dùng doanh nghiệp</span>
                    </NavLink>
                </li>

                <hr className="sidebar-divider" />                
                <div className="sidebar-heading">
                    Quản lý phản hồi/khiếu nại
                </div>
                <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold pb-2 pt-3" to="/report-management">
                        <i className="icon-material-outline-rate-review"/><span>&nbsp;Khiếu nại</span>
                    </NavLink>
                </li>

                <hr className="sidebar-divider" />                
                <div className="sidebar-heading">
                    Quản lý công việc
                </div>
                <li className="nav-item">
                    <NavLink className="nav-link font-weight-bold pb-2 pt-3" to="/pending-job-management">
                        <i className="icon-line-awesome-hourglass-2"/><span>&nbsp;Công việc chờ duyệt</span>
                    </NavLink>
                </li>                
                
                {/* Sidebar Toggler (Sidebar) */}
                {/* <div className="text-center d-none d-md-inline">
                    <img src={Logo}></img>
                </div> */}
            </ul>
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

const SideBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBarComponent));
export default SideBar;