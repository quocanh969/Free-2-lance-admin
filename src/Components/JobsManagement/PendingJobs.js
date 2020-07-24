import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { prettierNumber, prettierDate } from '../../Ultis/Helper/HelperFunction';

import Swal from 'sweetalert2';
import { loadJobList, loadApplicantsByJobId } from '../../Actions/Job.action';
import { setJobStatus } from '../../Services/Job.service';

class PendingJobsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: {},
            queryType: 5,
        }
    }

    componentWillMount() {
        this.loadJobListFunc(1);
    }

    loadJobListFunc(page) {
        let {onLoadJobsList} = this.props;
        onLoadJobsList(page,8,this.state.query);
    }
    
    handleFilter(newType) {
        let temp = this.state.query;
        if(newType === 5) { // lấy tất cả
            temp['id_status'] = '';
        }
        else {
            temp['id_status'] = newType;
        }
        
        this.setState({query: temp, queryType: newType},() => {
            this.loadJobListFunc(1);
        })
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.JobsListReducer.currentJobPage) {
            this.loadJobListFunc(pageNum);
        }
    }

    handleChangeStatus(id_job, current_value) {
        let val = Number.parseInt(document.getElementById('select-status-' + id_job).value);
        if (current_value === -1 || current_value === 4) {
            Swal.fire({
                text: 'Bạn không thể thay đổi trạng thái này của công việc',
                icon: 'warning',
            });
            document.getElementById('select-status-' + id_job).value = current_value;
            return;
        }

        if (val === -1 || val === 4) {
            Swal.fire({
                text: 'Bạn không thể thay đổi trạng thái công việc thành trạng thái này',
                icon: 'warning',
            });
            document.getElementById('select-status-' + id_job).value = current_value;
            return;
        }

        if (current_value === val) return;

        if (val === 0 || val === 1) {
            let text = '';
            if(val === 0) text = 'gỡ';
            else text = 'khổi phục'
            Swal.fire({
                text: "Bạn có chắc là muốn "+ text + " công việc này xuống !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    setJobStatus(id_job, val).then(res=>{
                        if(res.data.code === '106') {
                            this.loadJobListFunc(this.props.JobsListReducer.currentJobPage);
                            Swal.fire({
                                text: 'Thay đổi thành công',
                                icon: 'success',
                            })
                        }
                        else {
                            Swal.fire({
                                text: 'Thay đổi thất bại',
                                icon: 'error',
                            })
                            document.getElementById('select-status-' + id_job).value = current_value;
                        }
                    }).catch(err=>{
                        Swal.fire({
                            text: 'Server gặp vấn đề',
                            icon: 'error',
                        })
                        document.getElementById('select-status-' + id_job).value = current_value;
                    })
                    
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thay đổi không được thực hiện',
                        icon: 'error',
                    })
                    document.getElementById('select-status-' + id_job).value = current_value;
                }
                else {
                    document.getElementById('select-status-' + id_job).value = current_value;
                }
            })
        }
        else {
            Swal.fire({
                text: 'Bạn không thể thay đổi trạng thái này của công việc',
                icon: 'warning',
            });
            document.getElementById('select-status-' + id_job).value = current_value;
        }

    }

    handleSearchUser() {
        let searchStr = document.getElementById('job-search-input').value;
        if (searchStr === this.state.query.title) {
            return;
        }
        else {
            let temp = this.state.query;
            temp['title'] = searchStr;
            this.setState({query: temp},() => {
                this.loadJobListFunc(1);
            })
        }
    }

    renderJobList(jobs, total) {
        let content = [];
        if(total === - 1) {
            content.push(
                <tr key={0}>
                    <td colSpan='7' className='p-5 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </td>                    
                </tr>
            )
        }
        else if(jobs.length > 0) {
            jobs.forEach((e, index) => {
                content.push(
                <tr key={index}>            
                    <td aria-label={e.id_job}>{e.id_job}</td>
                    <td><div className='text-truncate' style={{ width: '180px' }}>{e.title}</div></td>
                    <td><div className='text-truncate' style={{ width: '70px' }}>{e.topic_name}</div></td>
                    <td>{prettierNumber(e.salary)} VNĐ</td>
                    <td>{prettierDate(e.post_date)}</td>
                    <td>{prettierDate(e.expire_date)}</td>
                    <td>
                        <select id={'select-status-' + e.id_job} value={e.id_status} onChange={()=>{this.handleChangeStatus(e.id_job, e.id_status)}}>
                            <option value={-1}>Quá hạn</option>
                            <option value={0}>Bị gở</option>
                            <option value={1}>Đang tuyển</option>
                            <option value={2}>Đang thực hiện</option>
                            <option value={3}>Hoàn thành</option>
                            <option value={4}>Tạm hoãn</option>
                        </select>
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
                        Danh sách công việc rỗng !!
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
                <li className={'page-item '+ (page === e ? "active" : '')} key={e}>
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
        let { jobs, currentJobPage, totalJobPage } = this.props.JobsListReducer;
        let totalPage = Math.ceil(totalJobPage / 8);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý danh sách công việc</h1>
                <p className="mb-4">
                    Danh sách các công việc hiện tại
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-business-center" /> Danh sách công việc</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className="col-8">
                                <div className="btn-group btn-group-sm" role="group">
                                    <div onClick={() => { if(this.state.queryType !== 5) {this.handleFilter(5)} }} className={"btn " + (this.state.queryType === 5 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                    <div onClick={() => { if(this.state.queryType !== -1) {this.handleFilter(-1)} }} className={"btn " + (this.state.queryType === -1 ? 'btn-danger' : 'btn-outline-danger')}>Quá hạn</div>
                                    <div onClick={() => { if(this.state.queryType !== 1) {this.handleFilter(1)} }} className={"btn " + (this.state.queryType === 1 ? 'btn-warning' : 'btn-outline-warning')}>Đang tuyển</div>
                                    <div onClick={() => { if(this.state.queryType !== 2) {this.handleFilter(2)} }} className={"btn " + (this.state.queryType === 2 ? 'btn-secondary' : 'btn-outline-secondary')}>Đang thực hiện</div>
                                    <div onClick={() => { if(this.state.queryType !== 3) {this.handleFilter(3)} }} className={"btn " + (this.state.queryType === 3 ? 'btn-success' : 'btn-outline-success')}>Đã hoàn thành</div>
                                    <div onClick={() => { if(this.state.queryType !== 4) {this.handleFilter(4)} }} className={"btn " + (this.state.queryType === 4 ? 'btn-info' : 'btn-outline-info')}>Tạm khóa</div>
                                </div>
                            </div>
                            <div className="col-4 d-flex text-right">
                                <div className='mr-2'>
                                    <div className='btn btn-primary' 
                                        onClick={()=>{
                                            if(this.state.query.title && this.state.query.title.length > 0) {
                                                document.getElementById('job-search-input').value='';
                                                let temp = this.state.query;
                                                temp['title'] = ''
                                                this.setState({query: temp}, ()=>{
                                                    this.loadJobListFunc(1)
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
                                    {this.renderJobList(jobs, totalJobPage)}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            totalJobPage === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentJobPage === 1 || totalPage - currentJobPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentJobPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentJobPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentJobPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentJobPage + 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-right" />
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                        )}
                    </div>

                </div>
            </div>
        )
    }
    
}
  
const mapStateToProps = (state) => {
    return state;
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onLoadJobsList: (page, take, query) => {
            dispatch(loadJobList(page, take, query));
        },
        onLoadApplicantsByJobId: (page, take, id_job, id_status) => {
            dispatch(loadApplicantsByJobId(page, take, id_job, id_status));
        },
    };
  };
  
  const PendingJobs = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PendingJobsComponent)
  );
  export default PendingJobs;