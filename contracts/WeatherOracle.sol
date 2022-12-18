// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WeatherOracle is Ownable {
  mapping(address => bool) oracles;
  string public validator;
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
}
