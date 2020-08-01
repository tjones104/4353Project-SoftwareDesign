let connection = require("../database");

const endpoint = function (request, response) {
  connection.query(
    `SELECT address_1 FROM client_information WHERE id = '${request.username}'`,
    function (error, rows, fields) {
      if (!!error) {
        //console.log("Error in Query");
      } else {
        //console.log("Successful Query");
        if (Object.keys(rows).length !== 0) {
          response.contentType("application/json");
          response.json(rows);
        } else {
          console.log("No Address");
        }
      }
    }
  );
};

module.exports = endpoint;
