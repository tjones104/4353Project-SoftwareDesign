const assert = require("assert");
const got = require("got");
const _ = require("underscore");
const server = require("../server");

describe("Login", async () => {
  it("should return {success:true, data:some token} for good creds", async () => {
    let result = await got("http://localhost:8080/api/login", {
      body: JSON.stringify({
        username: "test",
        password: "test",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    let body = JSON.parse(result.body);
    assert(body.success && body.data && body.data.token != null);
  });
  it("should return {successs: false, data:null} for bad creds", async () => {
    let result = await got("http://localhost:8080/api/login", {
      body: JSON.stringify({
        username: "not_test",
        password: "invalid_pass",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    let body = JSON.parse(result.body);
    assert(!body.success && body.data == "No such user found");
  });
});

describe("Register", async () => {
  it("should allow a new, unique user to register", async () => {
    let result = await got("http://localhost:8080/api/register", {
      body: JSON.stringify({
        username: "not_test",
        password: "pass",
        repassword: "pass",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    let body = JSON.parse(result.body);
    //console.log(body.data);
    assert(body.success && body.data == null);
  });
  it("should not allow a user with mismatching passwords to register", async () => {
    let result = await got("http://localhost:8080/api/register", {
      body: JSON.stringify({
        username: "not_test",
        password: "pass",
        repassword: "pass_",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    let body = JSON.parse(result.body);
    assert(!body.success && body.data == "Password mismatch");
  });
  it("should not allow an existing username to register", async () => {
    let result = await got("http://localhost:8080/api/register", {
      body: JSON.stringify({
        username: "test",
        password: "pass",
        repassword: "pass",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    let body = JSON.parse(result.body);
    console.log(body.data);
    assert(!body.success && body.data === "Username exists");
  });
});

describe("Authentication Middleware", () => {
  it("should not allow api requests without token", async () => {
    let result = await got("http://localhost:8080/api/quote_history", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie: "",
      },
    });
    let body = JSON.parse(result.body);
    assert(!body.success && body.data == "No token");
  });
  it("should not allow api requests with an *invalid* token", async () => {
    let result = await got("http://localhost:8080/api/quote_history", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie: "token=NOTVALIDLOL",
      },
    });
    let body = JSON.parse(result.body);
    assert(!body.success && body.data == "Invalid token");
  });
});

describe("History", async () => {
  it("Should return expected history", async () => {
    let history = await got("http://localhost:8080/api/quote_history", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
    const expectedHistory = [
      {
        id: "test",
        quote_id: 3,
        gallons_requested: 3,
        address_1: "0005 Example Dr",
        delivery_date: "2020-06-28",
        suggested_price: 1,
        total_amount_due: 5,
      },
      {
        id: "test",
        quote_id: 1,
        gallons_requested: 1,
        address_1: "0005 Example Dr",
        delivery_date: "2020-06-28",
        suggested_price: 1,
        total_amount_due: 5,
      },
    ];
    /* console.log(history.body);
    console.log(JSON.stringify(expectedHistory)); */
    console.log(
      "  NOTICE: The sql statement must be rerun for this check to pass!"
    );
    assert(history.body == JSON.stringify(expectedHistory));
  });
});

describe("Profile", async () => {
  it("Should return expected profile", async () => {
    let profile = await got("http://localhost:8080/api/profile_info", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
    const expectedProfile = [
      {
        id: "test",
        full_name: "Test Testerson",
        address_1: "0005 Example Dr",
        address_2: "",
        city: "Houston",
        state: "TX",
        zipcode: 77204,
      },
    ];
    assert(profile.body == JSON.stringify(expectedProfile));
  });
  it("Should update profile", async () => {
    let profile = await got("http://localhost:8080/api/profile_update", {
      body: JSON.stringify({
        full_name: "Test Testerson",
        address_1: "0005 Example Dr",
        address_2: "",
        city: "Dallas",
        state: "TX",
        zipcode: "77204",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
  });
  it("Should return updated profile", async () => {
    let profile = await got("http://localhost:8080/api/profile_info", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
    const expectedProfile = [
      {
        id: "test",
        full_name: "Test Testerson",
        address_1: "0005 Example Dr",
        address_2: "",
        city: "Dallas",
        state: "TX",
        zipcode: "77204",
      },
    ];
    assert(profile.body == JSON.stringify(expectedProfile));
  });
});

describe("Fuel Quote", async () => {
  it("Should return expected fuel quote", async () => {
    let fuel_quote = await got("http://localhost:8080/api/fuel_quote", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
    const expectedfuel_quote = [
      {
        address_1: "0005 Example Dr",
      },
    ];
    assert(fuel_quote.body == JSON.stringify(expectedfuel_quote));
  });
});

describe("Fuel Quote Post", async () => {
  it("Should post fuel quote", async () => {
    let fuel_quote = await got("http://localhost:8080/api/fuel_quote_post", {
      body: JSON.stringify({
        gallons_requested: 100,
        delivery_date: "2020-07-11",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
    console.log(
      "  NOTICE: The sql statement must be rerun for the secondary check to pass!"
    );
  });
  it("Should return history with fuel quote post", async () => {
    let history = await got("http://localhost:8080/api/quote_history", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdCJ9LCJpYXQiOjE1OTM5OTU2NzcsImV4cCI6MTU5NDA4MjA3N30.TXcORmTYd9Iade3hBy4WqvwXMheuWWidQuYR4_XQSXc",
      },
    });
    const expectedHistory = [
      {
        id: "test",
        quote_id: 4,
        gallons_requested: 100,
        address_1: "0005 Example Dr",
        delivery_date: "2020-07-11",
        suggested_price: 0,
        total_amount_due: 0,
      },
      {
        id: "test",
        quote_id: 3,
        gallons_requested: 3,
        address_1: "0005 Example Dr",
        delivery_date: "2020-06-28",
        suggested_price: 1,
        total_amount_due: 5,
      },
      {
        id: "test",
        quote_id: 1,
        gallons_requested: 1,
        address_1: "0005 Example Dr",
        delivery_date: "2020-06-28",
        suggested_price: 1,
        total_amount_due: 5,
      },
    ];
    assert(history.body == JSON.stringify(expectedHistory));
  });
});
