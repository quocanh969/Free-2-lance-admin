import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTags } from '../../Actions/Tag.action';
import { setTagStatusAPI } from '../../Services/Tag.service';

var Swal = require('sweetalert2');

class TagsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            queryType: 1, // 1 - xếp theo tag đang hoạt động trc, 0 tag bất hoạt trc
            queryName: '',
        }
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(isAsc) {
        this.setState({ queryType: isAsc }, () => {
            this.loadListFunc(1, 10, this.state.queryType, this.state.queryName);
        })
    }

    handleChangeStatus(id_tag, current_value) {
        let val = Number.parseInt(document.getElementById('select-status-' + id_tag).value);

        if (current_value === val) return;

        let text = '';
        if (val === 0) {
            text = 'Xóa';
        }
        else {
            text = 'Khôi phục';
        }
        Swal.fire({
            text: "Bạn có chắc là muốn " + text + " nhãn này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, tôi đã suy nghĩ lại',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                setTagStatusAPI(id_tag, val).then(res => {
                    if (res.data.code === '202') {
                        this.loadListFunc(this.props.TagListReducer.currentPage, 10, this.state.queryType, this.state.queryName);
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
                        document.getElementById('select-status-' + id_tag).value = current_value;
                    }
                }).catch(err => {
                    alert('Server gặp sự cố')
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    text: 'Thay đổi không được thực hiện',
                    icon: 'error',
                })
                document.getElementById('select-status-' + id_tag).value = current_value;
            }
            else {
                document.getElementById('select-status-' + id_tag).value = current_value;
            }
        })
    }

    componentWillMount() {
        this.loadListFunc(1, 10, 1, '');
    }

    loadListFunc(page, take, isASC, queryName) {
        let { onLoadList } = this.props;
        onLoadList(page, take, isASC, queryName);
    }

    handlePagination(pageNum) {
        if (pageNum !== this.props.TagListReducer.currentPage) {
            this.loadListFunc(pageNum, 10, 1, '');
        }
    }

    handleSearchTag() {
        let searchStr = document.getElementById('user-search-input').value;
        if (searchStr === this.state.queryName) {
            return;
        }
        else {
            this.setState({ queryName: searchStr }, () => {
                this.loadListFunc(1, 10, this.state.queryType, this.state.queryName);
            })
        }
    }

    renderTagsList() {
        let { tags } = this.props.TagListReducer;
        let content = [];
        console.log(tags);
        for (let e of tags) {
            console.log(e);
            content.push(<tr key={0}>
                <td>{e.id_tag}</td>
                <td>{e.name}</td>
                <td>
                    {/* <i className='icon-line-awesome-wrench cursor-pointer text-primary' onClick={() => { console.log('edit') }}></i> */}
                    <NavLink to={'/tag-detail/id=' + e.id_tag}><i className='icon-line-awesome-wrench cursor-pointer text-primary'></i></NavLink>
                </td>
                <td>
                    <select id={'select-status-' + e.id_tag} value={e.status} onChange={() => { this.handleChangeStatus(e.id_tag, e.status) }}>
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
        let { currentPage, total } = this.props.TagListReducer;
        let totalPage = Math.ceil(total / 10);

        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Quản lý nhãn của công việc</h1>
                <p className="mb-4">
                    Danh sách nhãn
                </p>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary"><i className="icon-line-awesome-tag" />&nbsp;&nbsp;Nhãn công việc</h6>
                    </div>
                    <div className="card-body">
                        {/* Headline */}
                        <div className="row my-1">
                            <div className='col-5'>
                                <div className="btn-group" role="group">
                                    <div onClick={() => { if (this.state.queryType != 1) this.handleSort(1) }} className={"btn " + (this.state.queryType === 1 ? 'btn-secondary' : 'btn-outline-secondary')}><i className='icon-feather-arrow-up'></i>&nbsp;Tăng theo ID</div>
                                    <div onClick={() => { if (this.state.queryType != 0) this.handleSort(0) }} className={"btn " + (this.state.queryType === 0 ? 'btn-secondary' : 'btn-outline-secondary')}>Giảm theo ID&nbsp;<i className='icon-feather-arrow-down'></i></div>
                                </div>
                            </div>
                            <div className="col-4 text-right">
                                <div className="input-group mb-3">
                                    <input type="search" id="user-search-input" className="form-control" placeholder="Tìm kiếm theo tên dán nhãn .." />
                                    <div className="input-group-append">
                                        <div className="btn btn-outline-secondary" type="button" onClick={() => { this.handleSearchTag() }}>
                                            <i className="fa fa-search"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-3'>
                                <NavLink to={'/add-tag'}>
                                    <div className='w-100 btn btn-danger px-0'><i className='icon-feather-plus'>
                                    </i>&nbsp;Thêm nhãn mới</div>
                                </NavLink>
                            </div>

                        </div>

                        {/* Table */}
                        <div className="table-responsive">
                            <table className="col-12 table" id="dataTable" width="100%" cellSpacing={0} >
                                <thead className="thead-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên nhãn</th>
                                        <th>Chỉnh sửa</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTagsList()}
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
        onLoadList: (page, take, isASC, queryName) => {
            dispatch(getTags(page, take, isASC, queryName));
        },
    }
}

const Tags = withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsComponent));
export default Tags;