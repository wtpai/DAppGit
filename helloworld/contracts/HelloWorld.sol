// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    // string message = "Hello World"; 
    // function setMessage(string memory _message) public {    //設定Message(帶新值給Message)
    //     message = _message;
    // }
    // function getMessage() public view returns (string memory) {    //取得Message
    //     return message;
    // }

    string private info;

    function setInfo(string memory _info) public {
        info = _info;
    }
    
    function getInfo() public view returns (string memory) {
        return info;
    }
}
