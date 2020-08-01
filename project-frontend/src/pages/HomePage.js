import React, { Component } from "react";
import Quote from "../components/FuelQuotePage";
import History from "../components/FuelQuoteHistory";
import Profile from "../components/ProfileManagementPage";
import Nav from "../components/Nav";

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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.navHandler = this.navHandler.bind(this);
  }

  state = {
    page: "profile",
  };

  navHandler(tab) {
    this.setState({ page: tab });
  }

  submitform = () => {
    this.setState({ page: "history" });
    alert("Fuel Quote Submitted");
  };

  newUser = () => {
    this.setState({ page: "profile" });
    alert("Please fill out your profile before ordering");
  };

  appletSwitch(s) {
    switch (s) {
      case "quote":
        return <Quote submitform={this.submitform} newUser={this.newUser} />;
      case "profile":
        return <Profile />;
      case "history":
        return <History />;
      case "signout":
        eraseCookie("token");
        window.location.reload(false);
        return;
      default:
        return <div></div>;
    }
  }

  render() {
    return (
      <div>
        <Nav nh={this.navHandler} />

        <section className="hero is-fullheight-with-navbar">
          <div className="section">{this.appletSwitch(this.state.page)}</div>
        </section>
      </div>
    );
  }
}

export default HomePage;
