import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Header from '../../Components/Header';

export class SRoute extends Component {

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={
                (props) => {     
                    console.log('flag');                   
                    return (
                        <div id='wrapper'>
                            <SideBar></SideBar>
                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Header></Header>

                                    <Component {...props}></Component>
                                </div>
                            </div>
                        </div>
                    )                
                }
            }
            ></Route >
        )
    }
}