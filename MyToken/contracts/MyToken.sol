// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract MyToken {
    /* This creates an array with all balances */
    mapping(address => uint256) public balanceOf;

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor(uint256 initialSupply) {
        balanceOf[msg.sender] = initialSupply; // Give the creator all initial tokens
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) public payable {
        require(balanceOf[msg.sender] >= _value); // Check if the sender has enough
        require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
        balanceOf[msg.sender] -= _value; // Subtract from the sender
        balanceOf[_to] += _value; // Add the same to the recipient
    }

    /* Get balance */
    function getBalance() public view returns (uint256) {
        return balanceOf[msg.sender];
    }
}
