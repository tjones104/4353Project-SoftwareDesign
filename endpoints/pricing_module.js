let connection = require("../database");

const endpoint = function (request, response) {
  let margin = 0;
  connection.query(
    `SELECT state FROM client_information WHERE id = '${request.username}'`,
    function (error, rows, fields) {
      if (!!error) {
        //console.log("Error in Query");
      } else {
        //console.log("Successful Query");
        //console.log(rows[0]);
        //console.log(rows);
        if (Object.keys(rows).length !== 0) {
          if (rows[0].state == "TX") {
            margin += 0.02;
            //console.log(margin);
          } else {
            margin += 0.04;
            //console.log(margin);
          }
          connection.query(
            `SELECT EXISTS(SELECT * FROM fuel_quote WHERE id = '${request.username}')`,
            function (error, rows, fields) {
              if (!!error) {
                //console.log("Error in Query");
              } else {
                //console.log("Successful Query");
                let data = JSON.stringify(rows[0]);
                data = data[data.length - 2];
                if (data == 0) {
                  //console.log(margin);
                } else {
                  margin -= 0.01;
                  //console.log(margin);
                }

                response.contentType("application/json");
                response.json(margin);
              }
            }
          );
        } else {
          //console.log("No History");
        }
      }
    }
  );
};

/*
Current price per gallon = $1.50
Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor) 
Location Factor = 2% for Texas, 4% for out of state.
Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
Company Profit Factor = 10% always
*/

module.exports = endpoint;
