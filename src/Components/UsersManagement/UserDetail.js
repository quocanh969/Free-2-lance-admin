import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../Assets/css/detail.css';
import UserInfo from './UserDetailTab/UserInfo';
import UserJobList from './UserDetailTab/UserJobList';
import UserTaskList from './UserDetailTab/UserTaskList';
import UserTransaction from './UserDetailTab/UserTransaction';
import UserPayment from './UserDetailTab/UserPayment';

import {loadUserDetail, loadJobsByEmployer, loadJobsByApplicant} from '../../Actions/User.acction';


class UserDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tab: 1,
        }
    }

    componentWillMount() {

        let {id_user} = this.props.match.params;
        let {onLoadUserDetail, onLoadJobList, onLoadTaskList} = this.props;
        onLoadUserDetail(id_user);
        onLoadJobList(1,8,'',5,id_user);
        onLoadTaskList(1,8,'',5,id_user);
    }

    switchTab() {
        switch(this.state.tab)
        {
            case 1:
                return <UserInfo></UserInfo>
            case 2:
                return <UserJobList></UserJobList>
            case 3:
                return <UserTaskList></UserTaskList>
            case 4:
                return <UserTransaction></UserTransaction>
            case 5:
                return <UserPayment></UserPayment>
            default:
                return ''
        }
    }

    render() {
        let {userInfo} = this.props.UserDetailReducer;

        if(userInfo === null) {
            return (
                <div className='w-100 text-center py-4'>
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container-fluid">
                    {/* Page Heading */}
                    <h1 className="h3 mb-1 text-gray-800">Thông tin chi tiết người dùng</h1>
                    <h5 className='mb-4'>{`${userInfo.personal.fullname} - ${userInfo.personal.email}`}</h5>
                    {/* Userlist DataTales Example */}
                    <div className="card shadow mb-4">
                        <div className='card-header px-0'>
                            <span className="p-3 h6 m-0 font-weight-bold text-primary icon-header">
                                <i className="icon-feather-user"/>
                            </span>
                            <span onClick={()=>{if(this.state.tab !== 1){this.setState({tab: 1})}}}
                                className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 1 ? 'tab-active' : '')}>
                                Thông tin người dùng
                            </span>
                            <span onClick={()=>{if(this.state.tab !== 2){this.setState({tab: 2})}}}
                                className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 2 ? 'tab-active' : '')}>
                                Danh sách công việc đăng tuyển
                            </span>
                            {(
                                userInfo.personal.isBusinessUser
                                ?
                                ''
                                :
                                <span onClick={()=>{if(this.state.tab !== 3){this.setState({tab: 3})}}}
                                    className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 3 ? 'tab-active' : '')}>
                                    Danh sách công việc ứng tuyển      
                                </span>
                            )}
                            <span onClick={()=>{if(this.state.tab !== 5){this.setState({tab: 5})}}}
                                className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 5 ? 'tab-active' : '')}>
                                Thanh toán
                            </span>
                            {(
                                userInfo.personal.isBusinessUser
                                ?
                                ''
                                :
                                <span onClick={()=>{if(this.state.tab !== 4){this.setState({tab: 4})}}}
                                className={"p-3 h6 m-0 font-weight-bold text-primary cursor-pointer " + (this.state.tab === 4 ? 'tab-active' : '')}>
                                    Thu nhập           
                                </span>
                                )}
                            
                            
                        </div>
                        <div className="card-body">
                            {this.switchTab()}
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

// Container

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadUserDetail: (id_user) => {
            dispatch(loadUserDetail(id_user));
        },
        onLoadJobList: (page, take, queryName, status, id_user) => {
            dispatch(loadJobsByEmployer(page, take, queryName, status, id_user));
        },
        onLoadTaskList: (page, take, queryName, status, id_user) => {
            dispatch(loadJobsByApplicant(page, take, queryName, status, id_user));
        },
    }
}

const UserDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetailComponent));
export default UserDetail;