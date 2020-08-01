import React from "react";

const stateList = [
  {
    name: "State",
    abbreviation: "",
  },
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];

class ProfileManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      profile: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/profile_info", {
      method: "get",
      credentials: "include",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((profile) =>
        this.setState({ profile }, () =>
          console.log("Profile fetched...", profile)
        )
      );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/api/profile_update", {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(this.state),
    }).then((res) => {
      res.json().then((result) => {
        //window.location.reload();
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-3-desktop">
            <form className="box" onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Full Name</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    id="fullName"
                    name="full_name"
                    placeholder="Jeff Jefferson"
                    className="input"
                    required
                    maxLength="50"
                    defaultValue={this.state.profile.map(
                      (profile) => profile.full_name
                    )}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-id-card"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Address 1</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    placeholder="1234 Example Dr"
                    id="addr1"
                    name="address_1"
                    className="input"
                    required
                    maxLength="100"
                    defaultValue={this.state.profile.map(
                      (profile) => profile.address_1
                    )}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Address 2</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    name="address_2"
                    id="address_2"
                    defaultValue=""
                    placeholder="Apartment, suite, building etc."
                    maxLength="100"
                    defaultValue={this.state.profile.map(
                      (profile) => profile.address_2
                    )}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">City</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Houston"
                    className="input"
                    required
                    maxLength="100"
                    defaultValue={this.state.profile.map(
                      (profile) => profile.city
                    )}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <div className="field control has-icons-left">
                <label className="label">State</label>
                <div className="select">
                  <select
                    required
                    id="state"
                    name="state"
                    //value={this.state.profile.map((profile) => profile.state)}
                    onChange={this.onChange}
                  >
                    {stateList.map((e) => {
                      return (
                        <option value={e.abbreviation} key={e.abbreviation}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="icon is-small is-left">
                    <i className="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Zip/Postal Code</label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    placeholder="01234"
                    id="zip"
                    name="zipcode"
                    className="input"
                    required
                    defaultValue={this.state.profile.map(
                      (profile) => profile.zipcode
                    )}
                    onChange={this.onChange}
                    maxLength="9"
                    minLength="5"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <input type="submit" className="button" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileManagementPage;
