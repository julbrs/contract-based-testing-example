const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { eachLike } = require("@pact-foundation/pact").Matchers;
const { User } = require("../lib/user");
const expect = chai.expect;
const { fetchUsers } = require("../lib/userClient");
const { provider } = require("../pact");
chai.use(chaiAsPromised);

describe("Pact with User API", () => {
  // Start the mock service on a randomly available port,
  // and set the API mock service port so clients can dynamically
  // find the endpoint
  before(() =>
    provider.setup().then((opts) => {
      process.env.API_PORT = opts.port;
    })
  );
  afterEach(() => provider.verify());

  describe("given there are users", () => {
    const userProperties = {
      slug: "julien",
      fullname: "Julien Bras",
      twitter: "_julbrs",
    };

    describe("when a call to the API is made", () => {
      before(() => {
        return provider.addInteraction({
          state: "there are users",
          uponReceiving: "a request for users",
          withRequest: {
            path: "/users",
            method: "GET",
          },
          willRespondWith: {
            body: eachLike(userProperties),
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          },
        });
      });

      it("will receive the list of current users", () => {
        return expect(fetchUsers()).to.eventually.have.deep.members([
          new User(userProperties.slug, userProperties.fullname, userProperties.twitter),
        ]);
      });
    });
  });

  // Write pact files to file
  after(() => {
    return provider.finalize();
  });
});
