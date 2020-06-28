import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { history } from '../Ultis/history/history';

import { getFigureData, getPercentageData } from '../Actions/Home.action';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.loadDataFunc();
  }

  loadDataFunc() {
    console.log("FLAG")
    let { onGetFigureData, onGetPercentageData } = this.props;
    onGetFigureData();
    onGetPercentageData();
  }

  calculatePercentage(total, extract) {
    return (extract / total * 100);
  }

  render() {
    // console.log(this.props.HomeReducer.percentageData);
    let { percentageData, figureData } = this.props.HomeReducer;
    let p1 = this.calculatePercentage(percentageData.total1, percentageData.extract1);
    let p2 = this.calculatePercentage(percentageData.total2, percentageData.extract2);
    let p3 = this.calculatePercentage(percentageData.total3, percentageData.extract3);
    let p4 = this.calculatePercentage(percentageData.total4, percentageData.extract4);
    let p5 = this.calculatePercentage(percentageData.total5, percentageData.extract5);
    p1 = Math.round(p1);
    p2 = Math.round(p2);
    p3 = Math.round(p3);
    p4 = Math.round(p4);
    p5 = Math.round(p5);

    let f1 = Math.round(figureData.avgPerJob);
    let f2 = Math.round(figureData.avgJobPerDay);
    let f3 = Math.round(figureData.totalActiveUsers);
    let f4 = Math.round(figureData.totalBusinessUsers);

    return (
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <NavLink to='/login' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-download fa-sm text-white-50" /> Xuất báo cáo
          </NavLink>
        </div>
        {/* Content Row */}
        <div className="row">
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số ứng viên trung bình/ công việc</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{f1}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Số công việc mới mỗi ngày</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{f2}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Số người dùng cá nhân</div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{f3}</div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pending Requests Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Số doanh nghiệp</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{f4}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Row */}
        <div className="row">
          {/* Area Chart */}
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
              {/* Card Body */}
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart" />
                </div>
              </div>
            </div>
          </div>
          {/* Pie Chart */}
          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                <div className="dropdown no-arrow">
                  <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
              </div>
              {/* Card Body */}
              <div className="card-body">
                <div className="chart-pie pt-4 pb-2">
                  <canvas id="myPieChart" />
                </div>
                <div className="mt-4 text-center small">
                  <span className="mr-2">
                    <i className="fas fa-circle text-primary" /> Direct
                    </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-success" /> Social
                    </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-info" /> Referral
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Row */}
        <div className="row">
          {/* Content Column */}
          <div className="col-lg-6 mb-4">
            {/* Project Card Example */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Thống kê báo cáo tỉ lệ</h6>
              </div>
              <div className="card-body">
                <h4 className="small font-weight-bold">Tỉ lệ được ứng viên được nhận <span className="float-right">{p1}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${p1}%` }} aria-valuenow={p1} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ công việc thời vụ <span className="float-right">{p2}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${p2}%` }} aria-valuenow={p2} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ ứng viên làm thỏa mãn nhà tuyển dụng <span className="float-right">{p3}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar" role="progressbar" style={{ width: `${p3}%` }} aria-valuenow={p3} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ nhà tuyển dụng thỏa mãn ứng viên <span className="float-right">{p4}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-info" role="progressbar" style={{ width: `${p4}%` }} aria-valuenow={p4} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ công việc hoàn thành <span className="float-right">{p5}%</span></h4>
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: `${p5}%` }} aria-valuenow={p5} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
            </div>
            {/* Color System */}
            {/* <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card bg-primary text-white shadow">
                  <div className="card-body">
                    Primary
                      <div className="text-white-50 small">#4e73df</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-success text-white shadow">
                  <div className="card-body">
                    Success
                      <div className="text-white-50 small">#1cc88a</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-info text-white shadow">
                  <div className="card-body">
                    Info
                      <div className="text-white-50 small">#36b9cc</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-warning text-white shadow">
                  <div className="card-body">
                    Warning
                      <div className="text-white-50 small">#f6c23e</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-danger text-white shadow">
                  <div className="card-body">
                    Danger
                      <div className="text-white-50 small">#e74a3b</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card bg-secondary text-white shadow">
                  <div className="card-body">
                    Secondary
                      <div className="text-white-50 small">#858796</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-lg-6 mb-4">
            {/* Illustrations */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '25rem' }} src="img/undraw_posting_photo.svg" alt="" />
                </div>
                <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw →</a>
              </div>
            </div>
            {/* Approach */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
              </div>
              <div className="card-body">
                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                <p className="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFigureData: () => {
      dispatch(getFigureData());
    },
    onGetPercentageData: () => {
      dispatch(getPercentageData());
    }
  };
};

const Home = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
);
export default Home;