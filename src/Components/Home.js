import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { history } from '../Ultis/history/history';

import { getFigureData, getPercentageData, getAnnualJobsChartData, getAnnualUsersChartData, getPendingReports, getPendingJobReports } from '../Actions/Home.action';

import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, ArcSeries } from 'react-vis';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.loadDataFunc();
  }

  loadDataFunc() {
    let { onGetFigureData, onGetPercentageData, onGetAnnualJobsChartData, onGetAnnualUsersChartData, onGetPendingReports, onGetPendingJobReports } = this.props;
    onGetFigureData();
    onGetPercentageData();
    onGetAnnualJobsChartData();
    onGetAnnualUsersChartData();
    onGetPendingReports();
    onGetPendingJobReports();
  }

  calculatePercentage(total, extract) {
    return (extract / total * 100);
  }

  render() {
    // console.log(this.props.HomeReducer.percentageData);
    let { percentageData, figureData, annualJobsChartData, annualUsersChartData, pendingReports, pendingJobReports } = this.props.HomeReducer;
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

    let annualJobsChart = [];
    let annualUsersChart = [];
    let i = 0;
    for (let e in annualJobsChartData) {
      annualJobsChart.push({ x: ++i, y: annualJobsChartData[e] });
    }
    i = 0;
    for (let e in annualUsersChartData) {
      annualUsersChart.push({ x: ++i, y: annualUsersChartData[e] });
    }
    console.log("FLAG");
    console.log(pendingReports)
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <NavLink to='/login' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
            <i className="fas fa-download fa-sm text-white-50" /> Xuất báo cáo
          </NavLink>
        </div> */}
        {/* Content Row */}
        <div className="row">
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số ứng viên trung bình/ công việc</div>
                    {(
                      figureData.length === 0
                        ?
                        <div className='w-100 text-center my-1'>
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                        :
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{f1} ứng viên</div>
                    )}


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
                    {(
                      figureData.length === 0
                        ?
                        <div className='w-100 text-center my-1'>
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                        :
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{f2} công việc</div>
                    )}

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
                        {(
                          figureData.length === 0
                            ?
                            <div className='w-100 text-center my-1'>
                              <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                            :
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{f3} tài khoản</div>
                        )}

                      </div>
                      {/* <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div> */}
                    </div>
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
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Số người dùng doanh nghiệp</div>
                    {(
                      figureData.length === 0
                        ?
                        <div className='w-100 text-center my-1'>
                          <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                        :
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{f4} tài khoản</div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Row */}
        <div className="row">
          {/* Area Chart */}
          <div className="col-xl-6 col-lg-7">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Số công việc được đăng trong năm theo tháng</h6>
                {/* <div className="dropdown no-arrow">
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
                </div> */}
              </div>
              {/* Card Body */}
              <div className="card-body">
                {(
                  annualJobsChartData === null
                    ?
                    <div className='w-100 text-center my-1'>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    :
                    <div className="chart-area">
                      {/* <canvas id="myAreaChart" /> */}
                      <XYPlot height={300} width={500}>
                        <LineSeries data={annualJobsChart} />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Tháng" titlePosition="middle-under" style={{ title: { fontSize: '16px' } }} />
                        <YAxis title="Số lượng công việc được đăng" />
                      </XYPlot>
                    </div>

                )}


              </div>
            </div>
          </div>
          {/* Pie Chart */}
          <div className="col-xl-6 col-lg-7">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Số tài khoản đăng ký trong năm theo tháng</h6>
                {/* <div className="dropdown no-arrow">
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
                </div> */}
              </div>
              {/* Card Body */}
              <div className="card-body">
              {(
                  annualUsersChartData === null
                    ?
                    <div className='w-100 text-center my-1'>
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    :
                    <div className="chart-area">
                    {/* <canvas id="myPieChart" /> */}
                    <XYPlot height={300} width={500}>
                      <LineSeries data={annualUsersChart} />
                      <VerticalGridLines />
                      <HorizontalGridLines />
                      <XAxis title="Tháng" titlePosition="middle-under" style={{ title: { fontSize: '16px' } }} />
                      <YAxis title="Số lượng tài khoản mới" />
                    </XYPlot>
                  </div>

                )}
                
                {/* <div className="mt-4 text-center small">
                  <span className="mr-2">
                    <i className="fas fa-circle text-primary" /> Direct
                    </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-success" /> Social
                    </span>
                  <span className="mr-2">
                    <i className="fas fa-circle text-info" /> Referral
                    </span>
                </div> */}
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
                <h4 className="small font-weight-bold">Tỉ lệ được ứng viên được nhận <span className="float-right">{Number.isNaN(p1) ? 0 : p1}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${p1}%` }} aria-valuenow={p1} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ công việc thời vụ <span className="float-right">{Number.isNaN(p2) ? 0 : p2}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${p2}%` }} aria-valuenow={p2} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ ứng viên làm thỏa mãn nhà tuyển dụng <span className="float-right">{Number.isNaN(p3) ? 0 : p3}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar" role="progressbar" style={{ width: `${p3}%` }} aria-valuenow={p3} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ nhà tuyển dụng thỏa mãn ứng viên <span className="float-right">{Number.isNaN(p4) ? 0 : p4}%</span></h4>
                <div className="progress mb-4">
                  <div className="progress-bar bg-info" role="progressbar" style={{ width: `${p4}%` }} aria-valuenow={p4} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <h4 className="small font-weight-bold">Tỉ lệ công việc hoàn thành <span className="float-right">{Number.isNaN(p5) ? 0 : p5}%</span></h4>
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
                <h6 className="m-0 font-weight-bold text-primary">Khiếu nại đang chờ xem xét</h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '25rem' }} src="img/undraw_posting_photo.svg" alt="" />
                </div>
                <p>Hiện đang có {pendingReports} khiếu nại đang đợi xử lý</p>
                <a target="_blank" rel="nofollow" href="/report-management">Xem thêm →</a>
              </div>
            </div>

            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Yêu cầu dừng việc đang chờ xem xét</h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '25rem' }} src="img/undraw_posting_photo.svg" alt="" />
                </div>
                <p>Hiện đang có {pendingJobReports} yêu cầu đang đợi xử lý</p>
                <a target="_blank" rel="nofollow" href="/job-report-management">Xem thêm →</a>
              </div>
            </div>
            {/* Approach */}
            {/* <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
              </div>
              <div className="card-body">
                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                <p className="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
              </div>
            </div> */}
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
    },
    onGetAnnualJobsChartData: () => {
      dispatch(getAnnualJobsChartData());
    },
    onGetAnnualUsersChartData: () => {
      dispatch(getAnnualUsersChartData())
    },
    onGetPendingReports: () => {
      dispatch(getPendingReports());
    },
    onGetPendingJobReports: () => {
      dispatch(getPendingJobReports());
    }
  };
};

const Home = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
);
export default Home;