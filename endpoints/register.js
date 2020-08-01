let passwordHash = require("password-hash");
let connection = require("../database");

const endpoint = async function (request, response) {
  let { username, password, repassword: extrapass } = request.body;
  if (password !== extrapass)
    return response.send(
      JSON.stringify({
        success: false,
        data: "Password mismatch",
      })
    );
  connection.query(
    "SELECT id as username FROM user_credentials",
    (err, res, fields) => {
      if (err) {
        return response.send(err);
      }
      let username_list = res.map((e) => e.username);
      if (username_list.includes(username))
        return response.send(
          JSON.stringify({
            success: false,
            data: "Username exists",
          })
        );

      let hashedPass = passwordHash.generate(password, {
        algorithm: "sha256",
        iterations: 5,
        saltLength: 32,
      });
      connection.query(
        `INSERT INTO user_credentials (id, password) VALUES ("${username}","${hashedPass}")`,
        (err, res, fields) => {
          if (err) {
            return response.send(err);
          }
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
