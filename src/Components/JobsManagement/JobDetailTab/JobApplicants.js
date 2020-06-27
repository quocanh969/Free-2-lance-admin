import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { loadApplicantsByJobId } from '../../../Actions/Job.action';

class JobApplicantsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 0, // 0 - đang duyệt, 1 - đã tuyển
        }
    }

    componentWillMount() {
        //this.loadJobListFunc(1, 8, this.state.queryType);
    }
    
    loadJobListFunc(page, take, status) {
        let {job} =  this.props.JobDetailReducer;
        let {onLoadApplicantByJobId} = this.props;
        onLoadApplicantByJobId(page, take, job.id_job, status)
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.JobDetailReducer.currentApplicant) {
            this.loadJobListFunc(pageNum, 8, this.state.queryType);
        }
    }

    handleChangeQuery(newQuery) {
        this.setState({queryType: newQuery}, () => {
            this.loadJobListFunc(1, 8, this.state.queryType);
        });
    }

    
    renderUserStatus(status) {
        switch(status)
        {
            case 0:
                {
                    return(
                        <span className='text-danger'>Đang duyệt</span>
                    )
                }
            case 1:
            {
                return(
                    <span className='text-success'>Đã nhận</span>
                )
            }
            default: return '';
        }
    }

    renderUserList() {
        // let { tutorData, status, message, loading } = this.props.UsersReducer;
        let content = [];
        // for (let e of tutorData) {
        //     let imgSrc = e.avatarLink;
        //     if (imgSrc === "" || imgSrc === null) {
        //     }

        content.push(<tr key={0}>
            <td>1</td>
            <td><div className='text-truncate' style={{ width: '80px' }}>124 Đường số 12345678215ssx12ca32151v515e415e4eq</div></td>
            <td><div className='text-truncate' style={{ width: '80px' }}>124 Đường số 12345678215ssx12ca32151v515e415e4eq</div></td>
            <td>0123456789</td>
            <td>0123456789101</td>
            <td><div className='text-truncate' style={{ width: '150px' }}>124 Đường số 12345678215ssx12ca32151v515e415e4eq</div></td>
            <td>
                <div className='text-center'>
                    {this.renderUserStatus(-1)}
                </div>              
            </td>
            <td className='text-center'>
                <NavLink to={'/user-detail/id='}><i className='icon-feather-eye cursor-pointer'></i></NavLink>
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
        let { totalApplyingJobs, currentApplyingPage } = {totalApplyingJobs: 8, currentApplyingPage: 1};
        let totalPage = Math.ceil(totalApplyingJobs / 4);

        return (
            <div>
                <div className='btn-group btn-group-sm my-2'>
                    <div onClick={() => { if(this.state.queryType !== 0 ) {this.handleChangeQuery(0)}}} className={"btn " + (this.state.queryType === 0 ? 'btn-secondary' : 'btn-outline-secondary')}>Đang duyệt</div>
                    <div onClick={() => { if(this.state.queryType !== 1 ) {this.handleChangeQuery(1)} }}className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-secondary')}>Đã tuyển</div>
                </div>
                {/* Table */}
                <div className="table-responsive">
                    <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Sđt</th>
                                <th>Số CMND</th>
                                <th>Địa chỉ</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUserList()}
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
        )
    }
}

// Container
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadApplicantByJobId: (page, take, id, id_status) => {
            dispatch(loadApplicantsByJobId(page, take, id, id_status));
        }
    }
}

const JobApplicants = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobApplicantsComponent));
export default JobApplicants;