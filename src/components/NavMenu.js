import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Button, NavDropdown } from 'react-bootstrap';
import ReactSession from 'react-client-session/dist/ReactSession';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    state = {
        loggedIn: false,
        token: '',
        collapsed: false
    }

    constructor(props) {
        super(props);
        let loggedIn = false;
        let token = null;

        if (props.loggedIn !== undefined || props.token === undefined) {
            loggedIn = ReactSession.get("loggedIn");
            token = ReactSession.get("token");
        }

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn: loggedIn,
            token: token
        };
    }

    navbarStyle = {
        paddingLeft: "1rem",
        paddingRight: "1rem"
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        let LoginLogoutButton;
        let path = window.location.pathname;

        if (path === "/login" || path === "/logout" || path === "/register") {
            LoginLogoutButton = <></>;
        }else if (localStorage.getItem("loggedin")) {
            LoginLogoutButton = (
                <NavDropdown id="accountdropdown" title="Account">
                    <NavDropdown.Item href="/user/dashboard/">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="/userinfo">Account</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
            );
        } else {
            LoginLogoutButton = (
                <NavItem>
                    <NavLink style={{color:"white"}} href="/login">Login</NavLink>
                </NavItem>
            );
        }
    return (
        <header>
            <Navbar style={this.navbarStyle} className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" dark>
                <NavbarBrand style={this.navbarBrandStyle} tag={Link} to="/" className="p-3"><img src="./images/logo_white_name_only.svg" alt=""/></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavDropdown id="aboutdropdown" title="Plugins" className="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Forms</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown id="aboutdropdown" title="About" className="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                {LoginLogoutButton}
                <Button variant="outline-light" href="/login">Get Started</Button>
              </ul>
            </Collapse>
        </Navbar>
      </header>
    );
  }
}
