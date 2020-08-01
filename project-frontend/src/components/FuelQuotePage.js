import React, { Component } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

//Script to get todays date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;

export class FuelQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [
        {
          gallons_requested: "",
          address_1: "None",
          delivery_date: "",
          suggessted_price: "0",
          total_amount_due: "0",
        },
      ],
      pricing: 0,
      margin: 0,
      total: 0,
      disabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCalculation = this.handleCalculation.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/api/fuel_quote_post", {
      method: "post",
      headers: new Headers({
        "content-type": "application/json",
      }),
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(this.state),
    }).then((res) => {
      res.json().then((result) => {
        this.props.submitform();
      });
    });
  }

  handleCalculation(e) {
    e.preventDefault();
    //console.log(this.state.quote[0].address_1);
    if (this.state.quote[0].address_1 != "None") {
      if (
        this.state.gallons_requested >= 1 &&
        this.state.gallons_requested <= 1000000 &&
        this.state.delivery_date != undefined &&
        this.state.delivery_date >= today
      ) {
        this.setState({ disabled: !this.state.disabled });
        alert("Locking in variables and Calculating Price (WIP)");
        if (this.state.gallons_requested > 1000) {
          let marginC = (this.state.pricing + 0.02 + 0.1) * 1.5 + 1.5;
          this.setState({ margin: marginC });
          let total_price = marginC * this.state.gallons_requested;
          this.setState({ total: total_price });
        } else {
          let marginC = (this.state.pricing + 0.03 + 0.1) * 1.5 + 1.5;
          this.setState({ margin: marginC });
          let total_price = marginC * this.state.gallons_requested;
          this.setState({ total: total_price });
        }
      } else {
        alert(
          "Please input valid date and number for gallons! \nDates cannot be from the past \nGallons can only go from 1 to 1000000"
        );
      }
    } else {
      this.props.newUser();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/fuel_quote", {
      method: "get",
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((quote) =>
        this.setState({ quote }, () => console.log("Quote fetched...", quote))
      );
    fetch("http://localhost:8080/api/pricing_module", {
      method: "get",
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((pricing) =>
        this.setState({ pricing }, () =>
          console.log("Pricing fetched...", pricing)
        )
      );
  }

  render() {
    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-3-desktop">
            <form className="box" onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Gallons Requested</label>
                <div className="control has-icons-left">
                  <input
                    type="number"
                    placeholder="0"
                    min="1"
                    max="1000000"
                    name="gallons_requested"
                    className="input"
                    required
                    //value={this.gallons_requested}
                    onChange={this.onChange}
                    disabled={this.state.disabled}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-hashtag"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Delivery Address</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    placeholder="No Address Found"
                    className="input"
                    name="address_1"
                    defaultValue={this.state.address_1}
                    value={this.state.quote.map((quote) => quote.address_1)}
                    disabled
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div>
                <label className="label">Delivery Date</label>
                <div className="control has-icons-left">
                  <input
                    type="date"
                    className="input"
                    name="delivery_date"
                    //value={this.state.delivery_date}
                    onChange={this.onChange}
                    required
                    disabled={this.state.disabled}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-calendar"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Suggested Price/Gallon</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    placeholder="0"
                    className="input"
                    disabled
                    name="suggestedPrice"
                    onChange={this.onChange}
                    value={this.state.margin}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-dollar"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Total Price</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    placeholder="0"
                    className="input"
                    name="totalPrice"
                    value={this.state.total}
                    onChange={this.onChange}
                    disabled
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-dollar"></i>
                  </span>
                </div>
              </div>
              <div className="field has-text-centered">
                <button
                  className="button"
                  onClick={this.handleCalculation}
                  disabled={this.state.disabled}
                >
                  <p>Get Quote</p>
                </button>
              </div>
              <div className="field has-text-centered">
                <input
                  type="submit"
                  className="button is-link"
                  value="Submit Form"
                  disabled={!this.state.disabled}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FuelQuote;
