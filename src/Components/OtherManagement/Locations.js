import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class LocationsComponent extends Component {
    render() {
        return (
            <div>
                Locations component work !!!
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

const Locations = withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationsComponent));
export default Locations;