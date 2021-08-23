// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReservePrice is Ownable {
    uint256 public hourValue;

    constructor() {
        hourValue = 0.5 ether;
    }

    function calculate(uint256 balance) internal view returns (uint256 _price, uint8 _discount) {
        require(msg.value + balance >= hourValue, "ReservePrice: Insufficient amount");
        uint8 discount = createDiscount();
        uint256 price = hourValue * discount;
        return (price, discount);
    }

    function createDiscount() private pure returns (uint8) {
        //call the oracle
        return 1;
    }

    function setHourValue(uint256 _hourValue) public onlyOwner returns (bool) {
        hourValue = _hourValue;
        return true;
    }
}
