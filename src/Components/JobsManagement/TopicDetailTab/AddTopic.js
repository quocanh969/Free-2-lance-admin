import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImageSrc, getBase64 } from '../../../Ultis/Helper/HelperFunction';

import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';

import { addNewTopic } from '../../../Actions/Topic.action';

import '../../../Assets/css/detail.css';

import Swal from 'sweetalert2'
import { elementType } from 'prop-types';

class AddTopicComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
    }

    componentDidUpdate() {
        let {newTopicName, newTopicImg} = this.props.TopicDetailReducer;
        document.getElementById('topic-name-input').value = newTopicName; 
        document.getElementById('image-topic-img').src = newTopicImg;
    }

    handleImageChange(e) {
        let imgView = document.getElementById('image-topic-img');

        getBase64(e.target.files[0], (result) => {
            imgView.src = result;
            console.log(result);
        });
    }

    handleSubmit() {
        let { onSendAddTopic } = this.props;
        let name = document.getElementById('topic-name-input').value;
        let img = document.getElementById('image-topic-img').src;
        img = img.split(',')[1];

        if (name === '' || name === null) {
            Swal.fire({
                title: "Vui lòng nhập tên chủ đề",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK!",
            })
        } else {
            onSendAddTopic(name, img);
        }
    }

    handleDelete() {
        let imgView = document.getElementById('image-topic-img');
        imgView.src = '';
    }

    render() {
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Chi tiết cụ thể của chủ đề</h1>
                <br></br>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <div className='d-flex justify-content-between'>
                            <h6 className="m-0 pt-1 font-weight-bold text-primary"><i className="icon-material-outline-bookmarks" />&nbsp;&nbsp;Chủ đề công việc</h6>
                            <span className={"m-0 font-weight-bold btn btn-danger"} onClick={() => { window.location.replace('/topic-management') }}>
                                <i className={"icon-feather-arrow-left-circle"} />
                            &nbsp;&nbsp;{"Quay lại"}
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mt-2">
                            <div className='col-6'>
                                {/* <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Mã chủ đề</label>
                                    </div>
                                    <div className="col-9">
                                        <p></p>
                                    </div>
                                </div> */}
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Chủ đề</label>
                                    </div>
                                    <div className="col-9 input-group">
                                        <input id='topic-name-input' className="form-control" placeholder='Nhập tên chủ đề vào*' required ></input>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Số công việc</label>
                                    </div>
                                    <div className="col-9">
                                        <p>{0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className='d-flex justify-content-between'>
                                    <label className='pt-1'>Hình ảnh chủ đề (không bắt buộc)</label>
                                    <span className='btn bg-danger text-white rounded' onClick={() => { this.handleDelete(); }}><i className='icon-feather-delete'></i>&nbsp;&nbsp;Xóa ảnh</span>
                                    <span className='btn bg-secondary text-white rounded' onClick={() => { document.getElementById('image-topic-input').click() }}><i className='icon-feather-camera'></i>&nbsp;&nbsp;Chọn ảnh</span>
                                </div>
                                <div className='mt-2'>
                                    <div className='image-field text-center'>
                                        <img id='image-topic-img'
                                        // src={getImageSrc(this.props.TopicDetailReducer.newTopicImg, imagePlaceholder)}
                                        ></img>
                                    </div>
                                    <input id='image-topic-input' onChange={(e) => { this.handleImageChange(e) }} type='file' accept='image/*' style={{ display: 'none' }}></input>
                                </div>
                            </div>
                        </div>

                        <hr></hr>
                        <div className='text-center mt-3'>
                            <button className='btn btn-primary' onClick={this.handleSubmit}>Thêm chủ đề</button>
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
        onSendAddTopic: (name, img) => {
            dispatch(addNewTopic(name, img));
        }
    }
}

const AddTopic = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTopicComponent));
export default AddTopic;