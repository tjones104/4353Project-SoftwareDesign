import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

export class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/quote_history", {
      method: "get",
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((history) =>
        this.setState({ history }, () =>
          console.log("History fetched...", history)
        )
      );
  }

  render() {
    return (
      <div className="container">
        <div
          className="is-overlay has-text-centered single-spaced"
          style={{ top: 150 }}
        >
          <div className="container">
            <div className="box">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Gallons Requested</th>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Suggested Price/Gallon</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                {this.state.history.map((history) => (
                  <tr key={history.quote_id}>
                    <td>{history.gallons_requested}</td>
                    <td>{history.address_1}</td>
                    <td>{history.delivery_date}</td>
                    <td>${history.suggested_price}</td>
                    <td>${history.total_amount_due}</td>
                  </tr>
                ))}
              </table>
              {this.state.history.length == 0 ? <p>No history</p> : <div />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
