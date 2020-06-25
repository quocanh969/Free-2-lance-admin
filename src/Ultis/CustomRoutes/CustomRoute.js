import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideBar from '../../Components/SideBar';
import Header from '../../Components/Header';
import { MyStore } from '../..';
import Login from '../../Components/Account/Login';

export class SRoute extends Component {
    render() {
        let token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            return (
                <Redirect to='/login'></Redirect>
            )
        }
        else {
            const { component: Component, ...rest } = this.props;
            return (
                <Route {...rest} render={
                    (props) => {
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
}