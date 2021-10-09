import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuButton, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        async function onStreamKeyClicked() {
            const token = await authService.getAccessToken();
            const response = await fetch('/channels/streamkey', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            navigator.clipboard.writeText(data.streamKey);
        }

        return (<>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
                    {userName}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => onStreamKeyClicked()}>Copy stream key</MenuItem>
                    <MenuItem as={Link} to={profilePath}>Profile</MenuItem>
                    <MenuItem as={Link} to={logoutPath}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </>);
    }

    anonymousView(registerPath, loginPath) {
        return (<>
            <Button as={Link} to={registerPath} variant="ghost" mr="2">Register</Button>
            <Button as={Link} to={loginPath} variant="ghost">Login</Button>
        </>);
    }
}
