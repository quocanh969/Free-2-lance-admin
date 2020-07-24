import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { prettierNumber, prettierDate } from '../../../Ultis/Helper/HelperFunction';
import { loadJobsByEmployer} from '../../../Actions/User.acction';

import Swal from 'sweetalert2';

class UserJobListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 5, 
            queryName: '',
        }
    }

    loadJobListFunc(page, queryName, status) {
        let {onLoadJobList} = this.props;
        let {userInfo} = this.props.UserDetailReducer;        
        onLoadJobList(page, 8, queryName, status, userInfo.personal.id_user);
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.UserDetailReducer.currentJob) {
            this.loadJobListFunc(pageNum, this.state.queryName, this.state.queryType);
        }
    }
    
    handleFilter(newType) {
        this.setState({queryType: newType},() => {
            this.loadJobListFunc(1, this.state.queryName, this.state.queryType);
        })
    }

    handleSearchUser() {
        let searchStr = document.getElementById('job-search-input').value;
        if (searchStr === this.state.queryName) {
            return;
        }
        else {
            this.setState({queryName: searchStr},() => {
                this.loadJobListFunc(1, this.state.queryName, this.state.queryType);
            })
        }
    }

    renderJobStatus(status) {
        switch(status)
        {
            case 4:
                {
                    return(
                        <span className='text-info'>Tạm khóa</span>
                    )
                }
            case 0:
                {
                    return(
                        <span className='text-danger'>Bị gỡ</span>
                    )
                }
            case -1:
                {
                    return(
                        <span className='text-danger'>Quá hạn</span>
                    )
                }
            case 1:
            {
                return(
                    <span className='text-warning'>Đang tuyển</span>
                )
            }
            case 2:
            {
                return(
                    <span className='text-primary'>Đang thực hiện</span>
                )
            }
            case 3:
            {
                return(
                    <span className='text-success'>Hoàn thành</span>
                )
            }
            default: return '';
        }
    }

    renderJobList(jobList, total) {
        let content = [];

        if(total === - 1) {
            content.push(
                <tr key={0}>
                    <td colSpan='8' className='p-5 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </td>                    
                </tr>
            )
        }
        else if(jobList.length > 0) {
            jobList.forEach((e, index) => {
                content.push(
                <tr key={index}>
                    <td>{e.id_job}</td>
                    <td><div className='text-truncate' style={{ width: '180px' }}>{e.title}</div></td>
                    <td><div className='text-truncate' style={{ width: '70px' }}>{e.topic_name}</div></td>
                    <td>{prettierNumber(e.salary)} VNĐ</td>
                    <td>{prettierDate(e.post_date)}</td>
                    <td>{prettierDate(e.expire_date)}</td>
                    <td>
                        <div className='text-center'>
                            {this.renderJobStatus(e.id_status)}
                        </div>
                    </td>
                    <td className='text-center'>
                        <NavLink to={'/job-detail/id='+e.id_job}><i className='icon-feather-eye cursor-pointer'></i></NavLink>
                    </td>
                </tr>);
            })
        }
        else {
            content.push(
                <tr key={0}>
                    <td colSpan='8' className='p-5'>
                        Danh sách công việc đăng rỗng !!
                    </td>                    
                </tr>
            )
        }

        return content;
    }

    renderPagination(page, totalPage) {
        let content = [];
        let start = 1,
            end = 4;
        if (totalPage - 4 < page) {
            if (totalPage - 4 <= 0) {
                start = 1;
            } else {
                start = totalPage - 4;
            }
            end = totalPage;
        } else {
            start = page;
            end = page + 3;
        }

        for (let e = start; e <= end; e++) {
            content.push(
                <li className={'page-item ' + (page === e ? "active" : '')} key={e}>
                    <div
                        className="page-link cursor-pointer"
                        onClick={() => {
                            this.handlePagination(e);
                        }}
                    >
                        {e}
                    </div>
                </li>
            );
        }
        return content;
    }

    render() {        
        let { jobList, totalJob, currentJob } = this.props.UserDetailReducer;
        let totalPage = Math.ceil(totalJob / 8);

        return (
            <div className="container-fluid px-0">
                {/* Page Heading */}
                <h1 className="h3 mb-4 text-gray-800">Quản lý danh sách công việc đăng tuyển của người dùng</h1>

                <div>
                    {/* Headline */}
                    <div className="row my-1">
                        <div className='col-7'>
                            <div className="btn-group btn-group-sm" role="group">
                                <div onClick={() => { if(this.state.queryType !== 5) {this.handleFilter(5)} }} className={"btn " + (this.state.queryType === 5 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                <div onClick={() => { if(this.state.queryType !== -1) {this.handleFilter(-1)} }} className={"btn " + (this.state.queryType === -1 ? 'btn-danger' : 'btn-outline-danger')}>Quá hạn</div>                                
                                <div onClick={() => { if(this.state.queryType !== 1) {this.handleFilter(1)} }} className={"btn " + (this.state.queryType === 1 ? 'btn-warning' : 'btn-outline-warning')}>Đang tuyển</div>
                                <div onClick={() => { if(this.state.queryType !== 2) {this.handleFilter(2)} }} className={"btn " + (this.state.queryType === 2 ? 'btn-secondary' : 'btn-outline-secondary')}>Đang thực hiện</div>
                                <div onClick={() => { if(this.state.queryType !== 3) {this.handleFilter(3)} }} className={"btn " + (this.state.queryType === 3 ? 'btn-success' : 'btn-outline-success')}>Đã hoàn thành</div>
                                <div onClick={() => { if(this.state.queryType !== 4) {this.handleFilter(4)} }} className={"btn " + (this.state.queryType === 4 ? 'btn-info' : 'btn-outline-info')}>Tạm khóa</div>
                            </div>
                        </div>
                        <div className="col-5 text-right d-flex">
                            <div className='mr-2'>
                                <div className='btn btn-primary' 
                                    onClick={()=>{
                                        if(this.state.queryName.length > 0) {
                                            document.getElementById('job-search-input').value='';
                                            this.setState({queryName: ''}, ()=>{
                                                this.loadJobListFunc(1, this.state.queryName, this.state.queryType)
                                                }) 
                                            }
                                        }}>
                                    <i className='icon-feather-rotate-ccw'></i>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="search" id="job-search-input" className="form-control" placeholder="Tìm kiếm theo tên .." />
                                <div className="input-group-append">
                                    <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchUser() }}>
                                        <i className="fa fa-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                            <thead className="thead-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Công việc</th>
                                    <th>Chủ đề</th>
                                    <th>Tiền lương</th>
                                    <th>Ngày đăng</th>
                                    <th>Hết hạn</th>
                                    <th>Trạng thái</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderJobList(jobList, totalJob)}
                            </tbody>
                        </table>

                    </div>

                    {/* Pagination */}
                    {(
                        totalJob === 0
                            ?
                            ''
                            :
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className={"pagination-item " + ((currentJob === 1 || totalPage - currentJob < 3) && "d-none")}>
                                        <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentJob - 1); }}>
                                            <i className="icon-material-outline-keyboard-arrow-left" />
                                        </div>
                                    </li>
                                    {this.renderPagination(currentJob, totalPage)}
                                    <li className={"pagination-item " + (totalPage - currentJob < 3 && "d-none")}>
                                        <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentJob + 1); }}>
                                            <i className="icon-material-outline-keyboard-arrow-right" />
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                    )}
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
        onLoadJobList: (page, take, queryName, status, id_user) => {
            dispatch(loadJobsByEmployer(page, take, queryName, status, id_user));
        },
    }
}

const UserJobList = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserJobListComponent));
export default UserJobList;