const request = require("superagent");
const { User } = require("./user");

const fetchUsers = () => {
  return request.get(`http://localhost:${process.env.API_PORT}/users`).then(
    (res) => {
      return res.body.reduce((acc, u) => {
        acc.push(new User(u.slug, u.fullname, u.twitter));
        return acc;
      }, []);
    },
    (err) => {
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchUsers,
};
