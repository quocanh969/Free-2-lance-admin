import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

class JobApplicantsComponent extends Component {

    constructor(props) {
        super(props);
    }

    
    loadJobListFunc(page) {

    }

    handlePagination(pageNum) {
        // if (pageNum !== this.props.EmployerReducer.currentApplyingPage) {
        //     this.loadJobListFunc(pageNum);
        // }
    }

    
    renderUserStatus(status) {
        switch(status)
        {
            case -1:
                {
                    return(
                        <span className='text-danger'>Bị cấm</span>
                    )
                }
            case 1:
            {
                return(
                    <span className='text-warning'>Chờ xác thực</span>
                )
            }
            case 2:
            {
                return(
                    <span className='text-success'>Đã xác thực</span>
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
            <td>John Cena</td>
            <td>tranquocanh858@gmail.com</td>
            <td>0123456789</td>
            <td>0123456789101</td>
            <td><div className='text-truncate' style={{ width: '150px' }}>124 Đường số 12345678215ssx12ca32151v515e415e4eq</div></td>
            <td>
                <div className='text-center'>
                    {this.renderUserStatus(-1)}
                </div>              
            </td>
            <td className='text-center'>
                <NavLink to='/user-detail'><i className='icon-feather-eye cursor-pointer'></i></NavLink>
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
            if (totalPage - 4 < 0) {
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
                {/* Table */}
                <div className="table-responsive">
                    <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
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

    }
}

const JobApplicants = withRouter(connect(mapStateToProps, mapDispatchToProps)(JobApplicantsComponent));
export default JobApplicants;