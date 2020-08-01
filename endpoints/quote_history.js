let connection = require("../database");

const endpoint = function (request, response) {
  connection.query(
    `SELECT * FROM fuel_quote WHERE id = '${request.username}' ORDER BY quote_id DESC`,
    function (error, rows, fields) {
      if (!!error) {
        //console.log("Error in Query");
      } else {
        //console.log("Successful Query");
        response.contentType("application/json");
        response.json(rows);
      }
    }
  );
};

module.exports = endpoint;
