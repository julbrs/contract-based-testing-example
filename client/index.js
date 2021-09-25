const { fetchUsers } = require("./lib/userClient");

require("dotenv").config();

(async () => {
  // just returning the users from the API
  users = await fetchUsers();
  console.log(users);
})();
