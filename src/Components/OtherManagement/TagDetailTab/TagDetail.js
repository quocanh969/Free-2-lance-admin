import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImageSrc, getBase64 } from '../../../Ultis/Helper/HelperFunction';

import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';

import '../../../Assets/css/detail.css';

import Swal from 'sweetalert2'
import { getDetails, sendUpdateInfo } from '../../../Actions/Tag.action';
import { history } from '../../../Ultis/history/history';

class TagDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentWillMount() {
        let { id_tag } = this.props.match.params;
        let { onLoadTagDetails } = this.props;
        onLoadTagDetails(id_tag);
    }

    handleImageChange(e) {
        let imgView = document.getElementById('image-topic-img');

        getBase64(e.target.files[0], (result) => {
            imgView.src = result;
        });
    }

    handleUpdate() {
        let { tagInfo } = this.props.TagDetailReducer;
        let { onSendUpdateTopic } = this.props;
        let updates = [];
        let name = document.getElementById('topic-name-input').value;
        let inputElement = document.getElementById('topic-name-input');
        if (name === '' || name === null) {
            inputElement.value = tagInfo.name;
        }
        if (name !== tagInfo.name) {
            updates.push({ field: 'name', value: name });
        }
        onSendUpdateTopic(tagInfo.id_tag, updates);
    }

    handleStatusChange() {
        let { tagInfo } = this.props.TagDetailReducer;
        let { onSendUpdateTopic } = this.props;
        let status;
        if (tagInfo.status === 1) {
            status = 0
        } else {
            status = 1;
        }
        let updates = [{ field: 'status', value: status }];
        Swal.fire({
            text: (status === 1 ? "Khôi phục nhãn này?" : "Xóa nhãn này"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, quay lại',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                onSendUpdateTopic(tagInfo.id_tag, updates)
            }
        })

        // onSendUpdateTopic(tagInfo.id_tag, updates);
    }

    render() {
        let {tagInfo, isSubmitted} = this.props.TagDetailReducer;

        if(tagInfo === null) {
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
                    <h1 className="h3 mb-2 text-gray-800">Chi tiết cụ thể của nhãn</h1>
                    <span className={"m-0 font-weight-bold btn btn-danger"} onClick={() => { history.push('/tags-management') }}>
                        <i className={"icon-feather-arrow-left-circle"} />
                                &nbsp;&nbsp;{"Quay lại"}
                    </span>
                    <br></br>
                    <br></br>
                    {/* Userlist DataTales Example */}
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <div className='d-flex justify-content-between'>
                                <h6 className="m-0 pt-1 font-weight-bold text-primary"><i className="icon-material-outline-bookmarks" />&nbsp;&nbsp;Nhãn công việc</h6>
                                <span onClick={this.handleStatusChange} className={"m-0 font-weight-bold btn " + (this.props.TagDetailReducer.tagInfo.status == 1 ? "btn-danger" : "btn-success")}>
                                    <i className={(this.props.TagDetailReducer.tagInfo.status == 1 ? "icon-feather-trash-2" : "icon-feather-check")} />
                                &nbsp;&nbsp;{this.props.TagDetailReducer.tagInfo.status == 1 ? "Xóa nhãn" : "Khôi phục nhãn"}
                                </span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row mt-2">
                                <div className='col-6'>
                                    <div className="row mt-2">
                                        <div className="col-3">
                                            <label>Mã nhãn dán</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.props.TagDetailReducer.tagInfo.id_tag}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-3">
                                            <label>nhãn</label>
                                        </div>
                                        <div className="col-9 input-group">
                                            <input id='topic-name-input' className="form-control" defaultValue={this.props.TagDetailReducer.tagInfo.name} ></input>
                                        </div>
                                    </div>
                                    {/* <div className="row mt-2">
                                        <div className="col-3">
                                            <label>Số công việc</label>
                                        </div>
                                        <div className="col-9">
                                            <p>{this.props.TagDetailReducer.tagInfo.count}</p>
                                        </div>
                                    </div> */}
                                </div>
    
                                {/* <div className='col-6'>
                                    <div className='d-flex justify-content-between'>
                                        <label className='pt-1'>Hình ảnh nhãn</label>
                                        <span className='btn bg-secondary text-white rounded' onClick={() => { document.getElementById('image-topic-input').click() }}><i className='icon-feather-camera'></i>&nbsp;&nbsp;Thay ảnh</span>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='image-field text-center'>
                                            <img id='image-topic-img' src={getImageSrc(this.props.TagDetailReducer.tagInfo.img, imagePlaceholder)}></img>
                                        </div>
                                        <input id='image-topic-input' onChange={(e) => { this.handleImageChange(e) }} type='file' accept='image/*' style={{ display: 'none' }}></input>
                                    </div>
                                </div> */}
                            </div>
    
                            <hr></hr>
                            {(
                                isSubmitted
                                ?
                                <div className='w-100 text-center'>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <div className='text-center mt-3'>
                                    <button className='btn btn-primary' onClick={this.handleUpdate}>Cập nhật thông tin nhãn</button>
                                </div>
                            )}
                            
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
        onLoadTagDetails: (id) => {
            dispatch(getDetails(id));
        },
        onSendUpdateTopic: (id, updates) => {
            dispatch(sendUpdateInfo(id, updates));
        }
    }
}

const TagDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(TagDetailComponent));
export default TagDetail;