import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import { prettierDate } from '../../Ultis/Helper/HelperFunction';
import { loadReportList } from '../../Actions/Report.action';
import { setReportStatus } from '../../Services/Report.service';

class ReportsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 3, // 1 - tất cả, 2 - chưa giải quyết, 3 - đã giải quyết
            queryName: '',
        }
    }

    componentWillMount() {
        this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
    }

    loadJobListFunc(page, status, queryName) {
        let { onLoadReportList } = this.props;
        onLoadReportList(page, 8, status, queryName);
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.ReportsReducer.currentReportPage) {
            this.loadJobListFunc(pageNum, this.state.queryType, this.state.queryName);
        }
    }

    handleFilter(newType) {
        this.setState({ queryType: newType }, () => {
            this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
        })
    }

    handleSearchUser() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            this.setState({ queryName: searchStr }, () => {
                this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
            });
        }
    }

    handleChangeStatus(id_user, current_value) {
        let val = Number.parseInt(document.getElementById('select-status-' + id_user).value);

        if (current_value === val) return;

        if (val === 1) {
            const { value: solve } = Swal.fire({
                text: "Bạn đã giải quyết xong khiếu nại này, vui lòng nhập phương thức của bạn",
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Bạn vẫn chưa điền phương thức giải quyết !'
                    }
                }
            }).then((result) => {
                if (result.value) {
                    console.log(result.value);

                    setReportStatus(id_user, 1, result.value).then(res=>{
                        if(res.data.code === '106') {
                            Swal.fire({
                                text: 'Thay đổi thành công',
                                icon: 'success',
                            })
                        }
                        else {
                            Swal.fire({
                                text: 'Thay đổi thất bại, vui lòng thử lại sau',
                                icon: 'error',
                            })
                        }
                    }).catch(err=> {
                        Swal.fire({
                            text: 'Server có vấn đề, vui lòng thử lại sau',
                            icon: 'error',
                        })
                    })
                    
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thay đổi không được thực hiện',
                        icon: 'error',
                    })
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
                else {
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
            })
        }
        else {
            Swal.fire({
                text: "Bạn muốn thay đổi thành trang thái chưa giải quyết cho khiếu nại này",
                showCancelButton: true,
                confirmButtonText: 'Ok, tôi đồng ý',
                cancelButtonText: 'Không, tôi đã suy nghĩ lại',
                reverseButtons: true,
            }).then((result) => {
                if (result.value) {
                    setReportStatus(id_user, 0, null).then(res=>{
                        if(res.data.code === '106') {
                            this.loadJobListFunc(this.props.ReportsReducer.currentReportPage, this.state.queryType,this.state.queryName);
                            Swal.fire({
                                text: 'Thay đổi thành công',
                                icon: 'success',
                            })
                        }
                        else {
                            Swal.fire({
                                text: 'Thay đổi thất bại, vui lòng thử lại sau',
                                icon: 'error',
                            })
                        }
                    }).catch(err=> {
                        Swal.fire({
                            text: 'Server có vấn đề, vui lòng thử lại sau',
                            icon: 'error',
                        })
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        text: 'Thay đổi không được thực hiện',
                        icon: 'error',
                    })
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
                else {
                    document.getElementById('select-status-' + id_user).value = current_value;
                }
            })
        }

    }

    handleDetail(report) {
        let role1_text = 'Người làm thuê';
        if(report.role1 === 1) {
            role1_text = 'Người thuê';
        }

        let role2_text = 'Người làm thuê';
        if(report.role2 === 1) {
            role2_text = 'Người thuê';
        }

        let statusText = `<div class='col-7 text-danger'>Chờ giải quyết</div>`;
        let solutionText = ``;

        if(report.status === 1) {
            statusText = `<div class='col-7 text-success'>Đã giải quyết</div>`
            solutionText = `<div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                                <label class='font-weight-bold col-5'>Tình trạng :</label>
                                ${report.solution}
                            </div>`;
        }

        Swal.fire({
            title: '<b>Chi tiết khiếu nại</b>',
            html:
                `<div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người khiếu nại :</label>
                        <div class='col-7'>${report.user1_name}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Vai trò :</label>
                        <div class='col-7'>${role1_text}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Người bị khiếu nại :</label>
                        <div class='col-7'>${report.user2_name}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Vai trò :</label>
                        <div class='col-7'>${role2_text}</div>                    
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Ngày phản hồi :</label>
                        <div class='col-7'>${prettierDate(report.report_date)}</div>
                    </div>
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Tình trạng :</label>
                        ${statusText}
                    </div>
                    ${solutionText}
                    <div class='my-1 py-2 row text-left rounded bg-f0eee3'>
                        <label class='font-weight-bold col-5'>Nội dung :</label>
                        <div class='col-7'>${report.content}</div>
                    </div>
                </div>`,
            showCloseButton: true,
            showConfirmButton: false,
            focusConfirm: false
        })
    }

    renderReportsList(reports) {
        let content = [];

        reports.forEach((e, index) => {
            content.push(
                <tr key={index}>
                    <td><div style={{width: '90px'}}>{prettierDate(e.report_date)}</div></td>
                    <td><div className='text-truncate' style={{ width: '120px' }}>{e.user1_name}</div></td>
                    <td><div className='text-truncate' style={{ width: '120px' }}>{e.user2_name}</div></td>
                    <td>
                        {e.content}
                    </td>
                    <td>
                        <select id={'select-status-' + e.id_report} value={e.status} onChange={() => { this.handleChangeStatus(e.id_report, e.status) }}>
                            <option value={0}>Chờ giải quyết</option>
                            <option value={1}>Đã giải quyết</option>
                        </select>
                    </td>
                    <td className='text-center'>
                        <i className='icon-feather-eye cursor-pointer text-primary' onClick={() => { this.handleDetail(e) }}></i>
                    </td>
                </tr>);

        })

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
        let { reports, totalReport, currentReportPage } = this.props.ReportsReducer;
        let totalPage = Math.ceil(totalReport / 8);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý khiếu nại của người dùng</h1>
                <p className="mb-4">
                    Danh sách các khiếu nại gửi lên
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-rate-review" />&nbsp;&nbsp;Khiếu nại</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-7'>
                                <div className="btn-group btn-group-sm" role="group">
                                    <div onClick={() => { if(this.state.queryType !== 3) {this.handleFilter(3)} }} className={"btn " + (this.state.queryType === 3 ? 'btn-primary' : 'btn-outline-primary')}>Tất cả</div>
                                    <div onClick={() => { if(this.state.queryType !== 0) {this.handleFilter(0)} }} className={"btn " + (this.state.queryType === 0 ? 'btn-danger' : 'btn-outline-danger')}>Chưa giải quyết</div>
                                    <div onClick={() => { if(this.state.queryType !== 1) {this.handleFilter(1)} }} className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-success')}>Đã giải quyết</div>
                                </div>
                            </div>
                            <div className="col-5 text-right d-flex">
                                <div className='mr-2'>
                                    <div className='btn btn-primary' 
                                        onClick={()=>{
                                            if(this.state.queryName.length > 0) {
                                                document.getElementById('user-search-input').value='';
                                                this.setState({queryName: ''}, ()=>{
                                                    this.loadJobListFunc(1, this.state.queryType, this.state.queryName);
                                                    }) 
                                                }
                                            }}>
                                        <i className='icon-feather-rotate-ccw'></i>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="search" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo người khiếu nại .." />
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
                                        <th>Ngày đăng</th>
                                        <th>Người khiếu nại</th>
                                        <th>Người bi khiếu nại</th>
                                        <th>Nội dung</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderReportsList(reports)}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            totalReport === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentReportPage === 1 || totalPage - currentReportPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentReportPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentReportPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentReportPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentReportPage + 1); }}>
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

// Container
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadReportList: (page, take, status, queryName) => {
            dispatch(loadReportList(page, take, status, queryName));
        }
    }
}

const Reports = withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsComponent));
export default Reports;