import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImageSrc, getBase64 } from '../../../Ultis/Helper/HelperFunction';

import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';

import { getDetails, sendUpdateInfo } from '../../../Actions/Topic.action';

import '../../../Assets/css/detail.css';

import Swal from 'sweetalert2'
import { history } from '../../../Ultis/history/history';

class TopicDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentWillMount() {
        let { id_jobtopic } = this.props.match.params;
        let { onLoadTopicDetails } = this.props;
        onLoadTopicDetails(id_jobtopic);
    }

    componentDidUpdate() {
        console.log(this.props.TopicDetailReducer.topicInfo.status);
    }

    handleImageChange(e) {
        let imgView = document.getElementById('image-topic-img');

        getBase64(e.target.files[0], (result) => {
            imgView.src = result;
        });
    }

    handleUpdate() {
        let { topicInfo } = this.props.TopicDetailReducer;
        let { onSendUpdateTopic } = this.props;
        let updates = [];
        let name = document.getElementById('topic-name-input').value;
        let inputElement = document.getElementById('topic-name-input');
        if (name === '' || name === null) {
            inputElement.value = topicInfo.name;
        }
        if (name !== topicInfo.name) {
            updates.push({ field: 'name', value: name });
        }
        let img = document.getElementById('image-topic-img').src;
        img = img.split(',')[1];
        if (img !== topicInfo.img) {
            updates.push({ field: 'img', value: img });
        }
        onSendUpdateTopic(topicInfo.id_jobtopic, updates);
    }

    handleStatusChange() {
        let { topicInfo } = this.props.TopicDetailReducer;
        let { onSendUpdateTopic } = this.props;
        let status;
        if (topicInfo.status === 1) {
            status = 0
        } else {
            status = 1;
        }
        let updates = [{ field: 'status', value: status }];
        Swal.fire({
            text: (status === 1 ? "Khôi phục chủ đề này?" : "Xóa chủ đề này"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok, tôi đồng ý',
            cancelButtonText: 'Không, quay lại',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                onSendUpdateTopic(topicInfo.id_jobtopic, updates)
            }
        })

        // onSendUpdateTopic(topicInfo.id_jobtopic, updates);
    }

    render() {
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Chi tiết cụ thể của chủ đề</h1>
                <span className={"m-0 font-weight-bold btn btn-danger"} onClick={() => { history.push('/topic-management') }}>
                    <i className={"icon-feather-arrow-left-circle"} />
                            &nbsp;&nbsp;{"Quay lại"}
                </span>
                <br></br>
                <br></br>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <div className='d-flex justify-content-between'>
                            <h6 className="m-0 pt-1 font-weight-bold text-primary"><i className="icon-material-outline-bookmarks" />&nbsp;&nbsp;Chủ đề công việc</h6>
                            <span onClick={this.handleStatusChange} className={"m-0 font-weight-bold btn " + (this.props.TopicDetailReducer.topicInfo.status == 1 ? "btn-danger" : "btn-success")}>
                                <i className={(this.props.TopicDetailReducer.topicInfo.status == 1 ? "icon-feather-trash-2" : "icon-feather-check")} />
                            &nbsp;&nbsp;{this.props.TopicDetailReducer.topicInfo.status == 1 ? "Xóa chủ đề" : "Khôi phục chủ đề"}
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mt-2">
                            <div className='col-6'>
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Mã chủ đề</label>
                                    </div>
                                    <div className="col-9">
                                        <p>{this.props.TopicDetailReducer.topicInfo.id_jobtopic}</p>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Chủ đề</label>
                                    </div>
                                    <div className="col-9 input-group">
                                        <input id='topic-name-input' className="form-control" defaultValue={this.props.TopicDetailReducer.topicInfo.name} ></input>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Số công việc</label>
                                    </div>
                                    <div className="col-9">
                                        <p>{this.props.TopicDetailReducer.topicInfo.count}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className='d-flex justify-content-between'>
                                    <label className='pt-1'>Hình ảnh chủ đề</label>
                                    <span className='btn bg-secondary text-white rounded' onClick={() => { document.getElementById('image-topic-input').click() }}><i className='icon-feather-camera'></i>&nbsp;&nbsp;Thay ảnh</span>
                                </div>
                                <div className='mt-2'>
                                    <div className='image-field text-center'>
                                        <img id='image-topic-img' src={getImageSrc(this.props.TopicDetailReducer.topicInfo.img, imagePlaceholder)}></img>
                                    </div>
                                    <input id='image-topic-input' onChange={(e) => { this.handleImageChange(e) }} type='file' accept='image/*' style={{ display: 'none' }}></input>
                                </div>
                            </div>
                        </div>

                        <hr></hr>
                        <div className='text-center mt-3'>
                            <button className='btn btn-primary' onClick={this.handleUpdate}>Cập nhật thông tin chủ đề</button>
                        </div>
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
        onLoadTopicDetails: (id) => {
            dispatch(getDetails(id));
        },
        onSendUpdateTopic: (id, updates) => {
            dispatch(sendUpdateInfo(id, updates));
        }
    }
}

const TopicDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicDetailComponent));
export default TopicDetail;