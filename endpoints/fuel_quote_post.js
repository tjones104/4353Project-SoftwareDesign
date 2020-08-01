let connection = require("../database");

const endpoint = async function (request, response) {
  let { gallons_requested, delivery_date, margin, total } = request.body;
  //Sending address to frontend
  connection.query(
    `SELECT address_1 FROM client_information WHERE id = '${request.username}'`,
    function (error, rows, fields) {
      let address = rows[0].address_1;
      //console.log(delivery_date);
      connection.query(
        `INSERT INTO fuel_quote VALUES ("${request.username}","","${gallons_requested}",
        "${address}","${delivery_date}","${margin}","${total}")`,
        (err, res, fields) => {
          if (err) {
            //console.log("Error: Cannot Post");
            return response.send(err);
          }
          //console.log("Post Successful");
          return response.send(
            JSON.stringify({
              success: true,
              data: null,
            })
          );
        }
      );
    }
  );
};

module.exports = endpoint;
