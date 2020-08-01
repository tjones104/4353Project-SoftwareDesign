import React, { Component } from "react";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "../App.css";

class WelcomePage extends Component {
  state = {
    isRegistering: false,
  };

  rToggle = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  };

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="container mt-6">
          {this.state.isRegistering ? (
            <Login rToggle={this.rToggle} login={this.props.login} />
          ) : (
            <Register rToggle={this.rToggle} login={this.props.login} />
          )}
        </div>
      </section>
    );
  }
}

export default WelcomePage;
