import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopics } from '../../Actions/Topic.action';
import { setTopicStatus } from '../../Services/Topic.service';

var Swal = require('sweetalert2');

class TopicsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - số lượng công việc tăng dần, 2 - số lượng công việc giảm dần
            queryName: '',
        }
        this.handleSort = this.handleSort.bind(this);

    }

    componentWillMount() {
        this.loadListFunc(1, this.state.queryName, 2)
    }

    loadListFunc(page, queryName, status) {
        let { onGetTopicsList } = this.props;
        onGetTopicsList(page, 10, this.state.queryName, status, this.state.queryType);
    }

    handleSort(isAsc) {
        this.setState({ queryType: isAsc }, () => {
            this.loadListFunc(1, this.state.queryName, 2);
        })
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.TopicListReducer.currentPage) {
            this.loadListFunc(pageNum, '', 2);
        }
    }

    handleSearchTopic() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === this.state.queryName) {
            return;
        }
        else {
            this.setState({ queryName: searchStr }, () => {
                this.loadListFunc(1, this.state.queryName, 2);
            })
        }
    }

    handleChangeStatus(id_jobtopic, current_value) {
        let val = Number.parseInt(document.getElementById('select-status-' + id_jobtopic).value);

        if (current_value === val) return;

        let text = '';
        if (val === 0) {
            text = 'Xóa';
        }
        else {
            text = 'Khôi phục';
        }
        Swal.fire({
            text: "Bạn có chắc là muốn " + text + " chủ đề này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                setTopicStatus(id_jobtopic, val).then(res => {
                    if (res.data.code === '202') {
                        this.loadListFunc(this.props.TopicListReducer.currentPage, '', 2);
                        Swal.fire({
                            text: 'Thay đổi thành công',
                            icon: 'success',
                        })
                    }
                    else {
                        Swal.fire({
                            text: 'Thay đổi không được thực hiện',
                            icon: 'error',
                        })
                        document.getElementById('select-status-' + id_jobtopic).value = current_value;
                    }
                }).catch(err => {
                    alert('Server gặp sự cố')
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    text: 'Thay đổi không được thực hiện',
                    icon: 'error',
                })
                document.getElementById('select-status-' + id_jobtopic).value = current_value;
            }
            else {
                document.getElementById('select-status-' + id_jobtopic).value = current_value;
            }
        })


    }

    renderTopicsList() {
        let { topics } = this.props.TopicListReducer;
        let content = [];
        for (let e of topics) {
            content.push(<tr key={0}>
                <td>{e.id_jobtopic}</td>
                <td>{e.name}</td>
                <td>{e.count}</td>
                <td>
                    {/* <i className='icon-line-awesome-wrench cursor-pointer text-primary' onClick={() => { console.log('edit') }}></i> */}
                    <NavLink to={'/topic-detail/id=' + e.id_jobtopic}><i className='icon-line-awesome-wrench cursor-pointer text-primary'></i></NavLink>
                </td>
                <td>
                    {/* <i className='icon-feather-trash-2 cursor-pointer text-primary' onClick={() => { console.log('remove') }}></i> */}
                    <select id={'select-status-' + e.id_jobtopic} value={e.status} onChange={() => { this.handleChangeStatus(e.id_jobtopic, e.status) }}>
                        <option value={0}>Đã xóa</option>
                        <option value={1}>Đang dùng</option>
                    </select>
                </td>
            </tr>);
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
        // let { totalApplyingJobs, currentApplyingPage } = { totalApplyingJobs: 8, currentApplyingPage: 1 };
        let { currentPage, total } = this.props.TopicListReducer;

        let totalPage = Math.ceil(total / 10);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý chủ đề của công việc</h1>
                <p className="mb-4">
                    Danh sách chủ đề hiện có
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-material-outline-outlined-flag" />&nbsp;&nbsp;Chủ đề công việc</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-6'>
                                <div className="btn-group btn-group-sm" role="group">
                                    <div onClick={() => { if (this.state.queryType != 1) this.handleSort(1) }} className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-secondary')}><i className='icon-feather-arrow-up'></i>&nbsp;Số lượng công việc tăng dần</div>
                                    <div onClick={() => { if (this.state.queryType != 2) this.handleSort(2) }} className={"btn " + (this.state.queryType === 2 ? 'btn-secondary' : 'btn-outline-secondary')}>Số lượng công việc giảm dần&nbsp;<i className='icon-feather-arrow-down'></i></div>
                                </div>
                            </div>

                            <div className="col-3 text-right">
                                <div className="input-group mb-3">
                                    <input type="text" id="user-search-input" className="form-control" placeholder="Tìm theo tên chủ đề .." />
                                    <div className="input-group-append">
                                        <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchTopic() }}>
                                            <i className="fa fa-search"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-3'>
                                <NavLink to={'/add-topic'}>
                                    <div className='w-100 btn btn-danger px-0'>&nbsp;Thêm chủ đề mới</div>
                                </NavLink>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive">
                            <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Id</th>
                                        <th>Chủ đề</th>
                                        <th>Số công việc</th>
                                        <th>Chỉnh sửa</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTopicsList()}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            total === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentPage === 1 || totalPage - currentPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentPage + 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-right" />
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                        )}
                    </div>
                </div>
            </div >
        )
    }
}

// Container
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTopicsList: (page, take, queryName, status, isAsc) => {
            dispatch(getTopics(page, take, queryName, status, isAsc));
        },
    }
}

const Topics = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicsComponent));
export default Topics;