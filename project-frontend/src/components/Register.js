import React from "react";
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
export class Register extends React.Component {
  componentDidMount() {
    if (readCookie("token")) {
      this.props.login();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repassword: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/api/register", {
      method: "post",
      headers: new Headers({
        "content-type": "application/json",
      }),
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(this.state),
    }).then((res) => {
      res.json().then((result) => {
        if (result.success) {
          this.props.rToggle();
          alert("Register Success");
        } else {
          alert("Username exists or passwords don't match");
        }
      });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form className="box mt-6" onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left">
            <input
              type="username"
              placeholder="Username"
              className="input"
              required
              name="username"
              onChange={this.onChange}
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
              placeholder="*******"
              className="input"
              required
              name="password"
              onChange={this.onChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Re-Enter Password</label>
          <div className="control has-icons-left">
            <input
              type="password"
              placeholder="*******"
              className="input"
              required
              name="repassword"
              onChange={this.onChange}
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="field has-text-centered">
          <input
            type="submit"
            value="Register"
            className="button is-link mt-2"
          />
          <p className="mt-2 ">Already have an Account?</p>
          <button className="button" onClick={this.props.rToggle}>
            <p>Login here</p>
          </button>
        </div>
      </form>
    );
  }
}

export default Register;
