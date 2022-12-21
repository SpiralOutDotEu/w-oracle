// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherOracle is Ownable {
  struct Measurements {
    string measurements;
    string validator;
    uint16 validatorResult;
    string validatorHash;
    uint16 votes;
  }

  mapping(address => bool) oracles;
  string public validator;
  mapping(address => Measurements) public submission;

  event NewSubmission (
    address oracle,
    string validator,
    uint16 validatorResult,
    string bacalhauJobId
  );

  constructor() public {
  }

  function addOracle(address _oracleAddress) public onlyOwner{
    oracles[_oracleAddress] = true;
  }

  function isOracle(address _oracleAddress) public view returns(bool){
    bool _isOracle = oracles[_oracleAddress];
    return _isOracle;
  }

  function setValidator(string memory _validator) public onlyOwner{
    validator = _validator;
  }

  function submitMeasurements(string memory _measurementsFile, string memory _validator, uint16 _validatorResult, string memory _bacalhauJobId ) public {
    Measurements memory _measurements = Measurements(_measurementsFile,_validator, _validatorResult, _bacalhauJobId, 0);
    submission[msg.sender] = _measurements;
    emit NewSubmission(msg.sender, _validator, _validatorResult, _bacalhauJobId);
  }

  function confirmSubmission(address oracle) public{
    submission[oracle].votes = submission[msg.sender].votes + 1;
  }

}
