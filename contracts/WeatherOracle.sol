// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherOracle is Ownable {
  struct Measurements {
    string measurements;
    string validator;
    uint16 validatorResult;
    string bacalhauJobId;
    uint16 votes;
    address[] voters;
  }

  mapping(address => bool) oracles;
  string public validator;
  mapping(address => Measurements) public submission;
  uint16 quorum = 2;

  event NewSubmission (
    address oracle,
    string validator,
    uint16 validatorResult,
    string bacalhauJobId
  );

  event NewMeasurement(
    address oracle,
    string measurements,
    string validator,
    uint16 validatorResult,
    string bacalhauJobId,
    uint16 votes,
    address[] voters
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
    Measurements memory _measurements = Measurements(_measurementsFile,_validator, _validatorResult, _bacalhauJobId, 0, new address[](0));
    submission[msg.sender] = _measurements;
    emit NewSubmission(msg.sender, _validator, _validatorResult, _bacalhauJobId);
  }

  function confirmSubmission(address oracle) public{
    submission[oracle].votes = submission[oracle].votes + 1;
    submission[oracle].voters.push(msg.sender);
    if(submission[oracle].votes == quorum){
      emit NewMeasurement(
        oracle,
        submission[oracle].measurements,
        submission[oracle].validator,
        submission[oracle].validatorResult,
        submission[oracle].bacalhauJobId,
        submission[oracle].votes,
        submission[oracle].voters
      );

    }
  }

}
