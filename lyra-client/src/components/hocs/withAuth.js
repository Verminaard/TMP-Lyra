import React, { Component } from 'react';
import AuthService from '../../auth/AuthService';

export default function withAuth(AuthComponent) {

    const Auth = new AuthService('http://localhost:8080');
        return class AuthWrapped extends Component {
            constructor() {
                super();
                this.state = {
                    user: null
                };
            }

            componentWillMount() {
                if (!Auth.loggedIn()) {
                    this.props.navigation.navigate('HomeScreen');
                }
                else {
                    try {
                        const profile = Auth.getProfile();
                        this.setState({
                            user: profile
                        })
                    }
                    catch(err){
                        Auth.logout();
                        this.props.navigation.navigate('');
                    }
                }
            }

            render() {
                if (this.state.user) {
                    return (
                        <AuthComponent history={this.props.history} user={this.state.user} />
                    )
                }
                else {
                    return null
                }
            }
        }
}