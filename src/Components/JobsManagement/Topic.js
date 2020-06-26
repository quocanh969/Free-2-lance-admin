import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class TopicsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - số lượng công việc giảm dần, 2 - số lượng công việc tăng dần
        }
    }

    loadJobListFunc(page) {

    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.EmployerReducer.currentApplyingPage) {
        //     this.loadJobListFunc(pageNum);
        // }
    }

    handleSearchTopic() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === '') {
            return;
        }
        else {
            // gọi api
        }
    }

    renderTagsList() {
        // let { tutorData, status, message, loading } = this.props.UsersReducer;
        let content = [];
        // for (let e of tutorData) {
        //     let imgSrc = e.avatarLink;
        //     if (imgSrc === "" || imgSrc === null) {
        //     }

        content.push(<tr key={0}>
            <td>1</td>
            <td>Kinh doanh buôn bán</td>
            <td>20</td>
            <td>
                <i className='icon-line-awesome-wrench cursor-pointer text-primary' onClick={() => { console.log('edit') }}></i>
            </td>
            <td>
                <i className='icon-feather-trash-2 cursor-pointer text-primary' onClick={() => { console.log('remove') }}></i>
            </td>
        </tr>);
        // }
        //}

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
        let { totalApplyingJobs, currentApplyingPage } = { totalApplyingJobs: 8, currentApplyingPage: 1 };
        let totalPage = Math.ceil(totalApplyingJobs / 4);

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
                                    <div onClick={() => { this.setState({ queryType: 2 }) }} className={"btn " + (this.state.queryType === 2 ? 'btn-secondary' : 'btn-outline-secondary')}><i className='icon-feather-arrow-up'></i>&nbsp;Số lượng công việc tăng dần</div>
                                    <div onClick={() => { this.setState({ queryType: 1 }) }} className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-secondary')}>Số lượng công việc giảm dần&nbsp;<i className='icon-feather-arrow-down'></i></div>                                
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
                            <div className='col-3'><div className='w-100 btn btn-danger px-0'><i className='icon-feather-plus'></i>&nbsp;Thêm chủ đề mới</div></div>
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
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTagsList()}
                                </tbody>
                            </table>

                        </div>

                        {/* Pagination */}
                        {(
                            totalApplyingJobs === 0
                                ?
                                ''
                                :
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className={"pagination-item " + ((currentApplyingPage === 1 || totalPage - currentApplyingPage < 3) && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentApplyingPage - 1); }}>
                                                <i className="icon-material-outline-keyboard-arrow-left" />
                                            </div>
                                        </li>
                                        {this.renderPagination(currentApplyingPage, totalPage)}
                                        <li className={"pagination-item " + (totalPage - currentApplyingPage < 3 && "d-none")}>
                                            <div className="cursor-pointer page-link" onClick={() => { this.handlePagination(currentApplyingPage + 1); }}>
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

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const Topics = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicsComponent));
export default Topics;