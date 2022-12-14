const WeatherOracle = artifacts.require("WeatherOracle");
const { expect } = require('chai');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("WeatherOracle", function ([owner, oracle1]) {
  beforeEach(async function () {
    this.oracle = await WeatherOracle.new({from: owner})
  })

  it("should assert true", async function () {
    await WeatherOracle.deployed();
    return assert.isTrue(true);
  });

  it("should have an owner", async function(){
    const _owner = await this.oracle.owner.call()
    expect(_owner).to.equal(owner);
  })
});
