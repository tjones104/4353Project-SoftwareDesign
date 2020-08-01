import React, { Component } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      wrongPassword: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async componentDidMount() {
    if (readCookie("token")) {
      this.props.login();
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/api/login");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(
      JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    );
    xhttp.onreadystatechange = (e) => {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        let body = JSON.parse(xhttp.response);
        if (body.success) {
          this.props.login();
        } else {
          this.setState({ wrongPassword: true });
        }
      }
    };
  }

  render() {
    return (
      <form className="box mt-6" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input"
              required
              value={this.state.username}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              type="password"
              name="password"
              placeholder="*******"
              className="input"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div
          className="has-text-centered"
          style={{ display: this.state.wrongPassword ? "inline" : "none" }}
        >
          <p> Wrong username/password </p>
        </div>
        <div className="field has-text-centered">
          <input type="submit" value="Login" className="button is-link mt-2" />
          <p className="mt-2 has-text-centered">Don't have an Account?</p>
          <button
            className="button has-text-centered"
            onClick={this.props.rToggle}
          >
            <p>Register Here</p>
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
