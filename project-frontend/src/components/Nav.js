import React, { Component } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "../App.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click = (e) => {
    this.props.nh(e.currentTarget.id);
  };

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <div
              id="home"
              className="navbar-item navbar-item-hover"
              onClick={this.click}
            >
              Home
            </div>
          </div>

          <div className="navbar-end">
            <div
              id="profile"
              className="navbar-item navbar-item-hover"
              onClick={this.click}
            >
              Profile
            </div>
            <div
              id="quote"
              className="navbar-item navbar-item-hover"
              onClick={this.click}
            >
              Order
            </div>
            <div
              id="history"
              className="navbar-item navbar-item-hover"
              onClick={this.click}
            >
              History
            </div>
            <div
              id="signout"
              className="navbar-item navbar-item-hover"
              onClick={this.click}
            >
              Signout
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
