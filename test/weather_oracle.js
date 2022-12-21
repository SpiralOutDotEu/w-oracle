const WeatherOracle = artifacts.require("WeatherOracle");
const { expect } = require('chai');
const {
  BN, // Big Number support
  expectEvent,  // Assertions for emitted events
} = require('@openzeppelin/test-helpers');


/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("WeatherOracle", function ([owner, oracle1, oracle2, other]) {
  beforeEach(async function () {
    this.oracle = await WeatherOracle.new({ from: owner })
  })

  it("should assert true", async function () {
    await WeatherOracle.deployed();
    return assert.isTrue(true);
  });

  it("should have an owner", async function () {
    const _owner = await this.oracle.owner.call()
    expect(_owner).to.equal(owner);
  })

  it("owner can add oracles", async function () {
    await this.oracle.addOracle(oracle1, { from: owner });
    await this.oracle.addOracle(oracle2, { from: owner });
    const _isOracle1Whitelisted = await this.oracle.isOracle.call(oracle1);
    const _isOracle2Whitelisted = await this.oracle.isOracle.call(oracle2);
    const _isOtherWhitelisted = await this.oracle.isOracle.call(other);
    expect(_isOracle1Whitelisted).to.equal(true);
    expect(_isOracle2Whitelisted).to.equal(true);
    expect(_isOtherWhitelisted).to.equal(false);
  })

  it("owner can set measurements validator", async function () {
    const _setValidator = "docker.io/WeatherComputationNetwork/weatherValidator:1.0"
    await this.oracle.setValidator(_setValidator);
    const _getValidator = await this.oracle.validator.call();
    expect(_setValidator).to.equal(_getValidator)
  })

  it("oracle provides submission with input measurements, validator, Bacalhau job id and result score", async function () {
    const _measurementsFile = "ipfs://bafkreifibaw5yjkmwiyi2nus7vphmrxxqw3xrp7utt7r3ipddideilqtti" // IPFS of measurements
    const _validator = "docker.io/WeatherComputationNetwork/weatherValidator:1.0" // Validator that is defined in contract
    const _validatorResult = 9 // Some score that is returned from validator and relates to the upcoming reward
    const _bacalhauJobId = "f591137f-7789-4871-b427-f4c1aa1a5b05" // the CID of the job returned from Bacalhau

    const _submission = await this.oracle.submitMeasurements(_measurementsFile,
      _validator,
      _validatorResult,
      _bacalhauJobId,
      { from: oracle1 })

    const _getSubmission = await this.oracle.submission.call(oracle1, { from: oracle2 })
    expect(_getSubmission[0]).to.equal(_measurementsFile)
    expect(_getSubmission[1]).to.equal(_validator)
    expect(_getSubmission[2]).to.be.bignumber.equal(BN(_validatorResult))
    expect(_getSubmission[3]).to.equal(_bacalhauJobId)
    expectEvent(_submission, 'NewSubmission', {
      oracle: oracle1,
      validator: _validator,
      validatorResult: BN(_validatorResult),
      bacalhauJobId: _bacalhauJobId
    });
  })

});
