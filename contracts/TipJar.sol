// SPDX-License-Identifier: MIT

//Maciel Norman Adrian
pragma solidity ^0.8.24;

contract TipJar {
    address public owner;

    event NewTip(address indexed from, uint amount, string message);

    struct Tip {
        address from;
        uint amount;
        string message;
        uint timestamp;
    }

    Tip[] public tips;

    constructor() {
        owner = msg.sender;
    }

    function tip(string memory message) public payable {
        require(msg.value > 0, "Debe enviar ETH");

        tips.push(Tip(msg.sender, msg.value, message, block.timestamp));
        emit NewTip(msg.sender, msg.value, message);
    }

    function withdraw() public {
        require(msg.sender == owner, "Solo el owner puede retirar");
        payable(owner).transfer(address(this).balance);
    }

    function getTipsCount() public view returns (uint) {
        return tips.length;
    }

    function getTip(uint index) public view returns (Tip memory) {
        require(index < tips.length, "Indice invalido");
        return tips[index];
    }
}
