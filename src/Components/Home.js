import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HomeComponent extends Component {
    render() {
        return (
            <div>
                Home work !!!
            </div>
        )
    }
}

// Container
const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

const Home = withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));
export default Home;