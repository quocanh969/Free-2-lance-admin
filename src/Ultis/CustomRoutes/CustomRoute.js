import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideBar from '../../Components/SideBar';

export class SRoute extends Component {

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={
                (props) => {                        
                    return (                        
                        <div className='wrapper'>
                            <SideBar></SideBar>
                        </div>
                    )                
                }
            }
            ></Route >
        )
    }
}