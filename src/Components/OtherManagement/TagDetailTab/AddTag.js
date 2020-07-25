import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../../Assets/css/detail.css';
import Swal from 'sweetalert2'
import { addNewTag } from '../../../Actions/Tag.action';
import { history } from '../../../Ultis/history/history';

class AddTagComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        let { newTagName } = this.props.TagDetailReducer;
        document.getElementById('topic-name-input').value = newTagName;
    }

    handleSubmit() {
        let { onSendAddTag } = this.props;
        let name = document.getElementById('topic-name-input').value;

        if (name === '' || name === null) {
            Swal.fire({
                title: "Vui lòng nhập tên nhãn",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK!",
            })
        } else {
            onSendAddTag(name);
        }
    }

    render() {
        let {isSubmitted} = this.props.TagDetailReducer;
        return (
            <div className="container-fluid">
                {/* Page Heading */}
                <h1 className="h3 mb-2 text-gray-800">Thêm nhãn công việc</h1>
                <br></br>
                {/* Userlist DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <div className='d-flex justify-content-between'>
                            <h6 className="m-0 pt-1 font-weight-bold text-primary"><i className="icon-material-outline-bookmarks" />&nbsp;&nbsp;Nhãn công việc</h6>
                            <span className={"m-0 font-weight-bold btn btn-danger"} onClick={() => { history.push('/tags-management') }}>
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
                                        <input id='topic-name-input' className="form-control" placeholder='Nhập tên nhãn vào*' required ></input>
                                    </div>
                                </div>
                                {/* <div className="row mt-2">
                                    <div className="col-3">
                                        <label>Số công việc</label>
                                    </div>
                                    <div className="col-9">
                                        <p>{0}</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* <div className='col-6'>
                                <div className='d-flex justify-content-between'>
                                    <label className='pt-1'>Hình ảnh chủ đề (không bắt buộc)</label>
                                    <span className='btn bg-danger text-white rounded' onClick={() => { this.handleDelete(); }}><i className='icon-feather-delete'></i>&nbsp;&nbsp;Xóa ảnh</span>
                                    <span className='btn bg-secondary text-white rounded' onClick={() => { document.getElementById('image-topic-input').click() }}><i className='icon-feather-camera'></i>&nbsp;&nbsp;Chọn ảnh</span>
                                </div>
                                <div className='mt-2'>
                                    <div className='image-field text-center'>
                                        <img id='image-topic-img'
                                        // src={getImageSrc(this.props.TagDetailReducer.newTopicImg, imagePlaceholder)}
                                        ></img>
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
                                <button className='btn btn-primary' onClick={this.handleSubmit}>Thêm dán nhãn</button>
                            </div>
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
        onSendAddTag: (name) => {
            dispatch(addNewTag(name));
        }
    }
}

const AddTag = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTagComponent));
export default AddTag;