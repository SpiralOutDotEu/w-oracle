const WeatherOracle = artifacts.require("WeatherOracle");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("WeatherOracle", function (/* accounts */) {
  it("should assert true", async function () {
    await WeatherOracle.deployed();
    return assert.isTrue(true);
  });
});
