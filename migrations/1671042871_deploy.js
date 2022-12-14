var weatherOracle = artifacts.require("WeatherOracle")
module.exports = function(_deployer) {
  _deployer.deploy(weatherOracle)
};
