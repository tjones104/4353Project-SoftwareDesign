let connection = require("../database");

const endpoint = function (request, response) {
  console.log(request.body);
  let { full_name, address_1, address_2, city, state, zipcode } = request.body;
  console.log(full_name, address_1, address_2, city, state, zipcode);

  if (request.body.profile.length == 0) {
    connection.query(
      `INSERT INTO client_information 
      VALUES  ("${request.username}","${full_name}", "${address_1}", "${address_2}", "${city}", "${state}", "${zipcode}")`,
      (err, res, fields) => {
        if (err) {
          console.log("Error: Cannot Post");
          return response.send(err);
        }
        console.log("Post Successful");
        return response.send(
          JSON.stringify({
            success: true,
            data: null,
          })
        );
      }
    );
  } else {
    if (full_name == undefined) {
      [{ full_name }] = request.body.profile;
    }
    if (address_1 == undefined) {
      [{ address_1 }] = request.body.profile;
    }
    if (address_2 == undefined) {
      [{ address_2 }] = request.body.profile;
    }
    if (city == undefined) {
      [{ city }] = request.body.profile;
    }
    if (state == undefined) {
      [{ state }] = request.body.profile;
    }
    if (zipcode == undefined) {
      [{ zipcode }] = request.body.profile;
    }
    connection.query(
      `UPDATE client_information 
    SET full_name = "${full_name}", address_1 = "${address_1}", address_2 = "${address_2}", city = "${city}", state = "${state}", zipcode= "${zipcode}"
    WHERE id = "${request.username}"`,
      (err, res, fields) => {
        if (err) {
          console.log("Error: Cannot Update");
          return response.send(err);
        }
        console.log("Update Successful");
        return response.send(
          JSON.stringify({
            success: true,
            data: null,
          })
        );
      }
    );
  }
};

module.exports = endpoint;
