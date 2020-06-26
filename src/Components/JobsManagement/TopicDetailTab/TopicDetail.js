import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getImageSrc, getBase64 } from '../../../Ultis/Helper/HelperFunction';

import imagePlaceholder from '../../../Assets/images/image-placeholder.jpg';

import '../../../Assets/css/detail.css';

class TopicDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_jobtopic: 1,
            name: 'Giao thông',
            img: null,
            count: 10,
        }
    }

    handleImageChange(e) {
        let imgView = document.getElementById('image-topic-img');

        getBase64(e.target.files[0], (result) => {
            imgView.src = result;
        });
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
                            <span className="m-0 font-weight-bold btn btn-danger"><i className="icon-feather-trash-2" />&nbsp;&nbsp;Xóa chủ đề</span>
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
                                        <p>{this.state.id_jobtopic}</p>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Chủ đề</label>
                                    </div>
                                    <div className="col-9 input-group">
                                        <input id='topic-name-input' className="form-control" defaultValue={this.state.name}></input>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Số công việc</label>
                                    </div>
                                    <div className="col-9">
                                        <p>{this.state.count}</p>
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
                                        <img id='image-topic-img' src={getImageSrc(this.state.img, imagePlaceholder)}></img>
                                    </div>                                    
                                    <input id='image-topic-input' onChange={(e) => { this.handleImageChange(e) }} type='file' accept='image/*' style={{ display: 'none' }}></input>
                                </div>
                            </div>
                        </div>

                        <hr></hr>
                        <div className='text-center mt-3'>
                            <button className='btn btn-primary'>Cập nhật thông tin chủ đề</button>
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

    }
}

const TopicDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicDetailComponent));
export default TopicDetail;