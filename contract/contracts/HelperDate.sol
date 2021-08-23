// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BokkyPooBahsDateTimeLibrary.sol";

contract HelperDate is Ownable {
    using BokkyPooBahsDateTimeLibrary for uint256;

    uint8 public minimumHour;
    uint8 public maximumHour;
    uint16 constant utc3 = 10800;

    constructor() {
        minimumHour = 13;
        maximumHour = 21;
    }

    function isAllowedDate(
        uint16 year,
        uint8 month,
        uint8 day,
        uint8 hour
    ) internal view dateValid(year, month, day) {
        require(
            BokkyPooBahsDateTimeLibrary.timestampFromDateTime(year, month, day, hour, 0, 0) > (block.timestamp - utc3),
            "HelperDate: The date has passed"
        );
        require(hour >= minimumHour, "HelperDate: Invalid minimum hour");
        require(hour <= maximumHour, "HelperDate: Invalid maximum hour");
    }

    modifier dateValid(
        uint16 year,
        uint8 month,
        uint8 day
    ) {
        require(BokkyPooBahsDateTimeLibrary.isValidDate(year, month, day), "HelperDate: Invalid date");
        _;
    }

    function setMinimumHour(uint8 _minimumHour) public onlyOwner validHour(_minimumHour) returns (bool) {
        require(_minimumHour < maximumHour, "HelperDate: Minimum hour not allowed");
        minimumHour = _minimumHour;
        return true;
    }

    function setMaximumHour(uint8 _maximumHour) public onlyOwner validHour(_maximumHour) returns (bool) {
        require(_maximumHour > minimumHour, "HelperDate: Maximum hour not allowed");
        maximumHour = _maximumHour;
        return true;
    }

    modifier validHour(uint8 hour) {
        require(hour > 0 && hour <= 24, "HelperDate: Invalid hour");
        _;
    }

    function generateId(
        uint16 year,
        uint8 month,
        uint8 day
    ) internal pure returns (uint32) {
        return uint32(year) + uint32(month) * (10**4) + uint32(day) * (10**6);
    }

    function fullRefund(
        uint16 year,
        uint8 month,
        uint8 day,
        uint8 hour
    ) internal view returns (bool) {
        return
            BokkyPooBahsDateTimeLibrary.timestampFromDateTime(year, month, day, hour, 0, 0) - block.timestamp >=
            BokkyPooBahsDateTimeLibrary.SECONDS_PER_HOUR * 2;
    }
}
