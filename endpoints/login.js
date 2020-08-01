const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
let connection = require("../database");

const endpoint = function (request, response) {
  let { username, password } = request.body;
  connection.query(
    `SELECT id AS username, password AS hashedPass FROM user_credentials WHERE id="${username}"`,
    (err, res, fields) => {
      if (err) {
        return response.send(err);
      }
      if (res.length == 0)
        return response.send(
          JSON.stringify({
            success: false,
            data: "No such user found",
          })
        );
      let check = passwordHash.verify(password, res[0].hashedPass);
      if (check) {
        let token = jwt.sign({ data: { username } }, "secret", {
          expiresIn: 60 * 60 * 24,
        });
        response.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24,
        });
        response.contentType("application/json");
        return response.send(
          JSON.stringify({
            success: true,
            data: {
              token,
            },
          })
        );
      } else {
        response.contentType("application/json");
        return response.send(
          JSON.stringify({
            success: false,
            data: "Wrong password",
          })
        );
      }
    }
  );
};

module.exports = endpoint;
