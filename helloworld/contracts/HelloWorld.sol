// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    string message = "Hello World"; 
    function setMessage(string memory _message) public {
        message = _message;
    }
    function getMessage() public view returns (string memory) {
        return message;
    }
}
