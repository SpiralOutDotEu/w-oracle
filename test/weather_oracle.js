const WeatherOracle = artifacts.require("WeatherOracle");
const { expect } = require('chai');


/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("WeatherOracle", function ([owner, oracle1, oracle2, other]) {
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

  it("owner can add oracles", async function(){
    await this.oracle.addOracle(oracle1, {from: owner});
    await this.oracle.addOracle(oracle2, {from: owner});
    const _isOracle1Whitelisted = await this.oracle.isOracle.call(oracle1);
    const _isOracle2Whitelisted = await this.oracle.isOracle.call(oracle2);
    const _isOtherWhitelisted = await this.oracle.isOracle.call(other);
    expect(_isOracle1Whitelisted).to.equal(true);
    expect(_isOracle2Whitelisted).to.equal(true);
    expect(_isOtherWhitelisted).to.equal(false);
  })

  it("owner can set measurements validator", async function(){
    const _setValidator = "docker.io/WeatherComputationNetwork/weathervalidator:1.0"
    await this.oracle.setValidator("docker.io/WeatherComputationNetwork/weathervalidator:1.0");
    const _getValidator = await this.oracle.validator.call();
    expect(_setValidator).to.equal(_getValidator)
  })

});
