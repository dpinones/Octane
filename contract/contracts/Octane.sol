// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./HelperDate.sol";
import "./ReservePrice.sol";

contract Octane is Ownable, ReservePrice, HelperDate {
    enum State {
        VALID,
        INVALID
    }

    struct Schedule {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
    }

    struct Reservation {
        address user;
        Schedule schedule;
        uint256 price;
        uint8 discount;
        State state;
    }

    address[] users;
    Reservation[] private reservations;
    mapping(uint32 => uint16[]) private reservationsPerDays;
    mapping(address => uint16[]) private reservationsPerUsers;
    mapping(address => uint16) private amountReservationsPerUser;
    mapping(address => uint256) private balances;
    uint256 private balanceOwner;

    function createReservation(
        uint16 year,
        uint8 month,
        uint8 day,
        uint8 hour
    ) public payable returns (uint256) {
        isAllowedDate(year, month, day, hour);
        require(isFree(year, month, day, hour), "Octane: Not free");

        (uint256 price, uint8 discount) = calculate(balances[msg.sender]);
        reservations.push(Reservation(msg.sender, Schedule(year, month, day, hour), price, discount, State.VALID));
        uint16 idReservation = uint16(reservations.length) - 1;

        uint32 idDay = generateId(year, month, day);
        reservationsPerDays[idDay].push(idReservation);

        reservationsPerUsers[msg.sender].push(idReservation);
        amountReservationsPerUser[msg.sender]++;

        balanceOwner += price;
        balances[msg.sender] += msg.value;
        balances[msg.sender] -= price;

        if (amountReservationsPerUser[msg.sender] == 0) {
            users.push(msg.sender);
        }
        return idReservation;
    }

    function cancelReservation(uint16 idReservation) public returns (bool) {
        require(idReservation + 1 <= reservations.length, "Octane: Invalid idReservation");
        Reservation storage reservation = reservations[idReservation];
        require(reservation.user == msg.sender, "Octane: Reservation from another user");
        require(reservation.state == State.VALID, "Octane: This reservation has already been canceled");

        reservation.state = State.INVALID;
        if (
            fullRefund(
                reservation.schedule.year,
                reservation.schedule.month,
                reservation.schedule.day,
                reservation.schedule.hour
            )
        ) {
            balanceOwner -= hourValue;
            balances[msg.sender] += hourValue;
        } else {
            balanceOwner -= (hourValue / 2);
            balances[msg.sender] += (hourValue / 2);
        }
        return true;
    }

    function isFree(
        uint16 year,
        uint8 month,
        uint8 day,
        uint8 hour
    ) public view returns (bool) {
        uint32 idDay = generateId(year, month, day);
        return !listReservationPerDay(idDay)[hour - minimumHour];
    }

    function listReservationPerDay(
        uint16 year,
        uint8 month,
        uint8 day
    ) public view returns (bool[] memory) {
        uint32 idDay = generateId(year, month, day);
        return listReservationPerDay(idDay);
    }

    function listReservationPerDay(uint32 idDay) private view returns (bool[] memory) {
        bool[] memory listReservation = new bool[](maximumHour - minimumHour + 1);
        uint16[] memory dayReservations = reservationsPerDays[idDay];
        for (uint8 i = 0; i < dayReservations.length; i++) {
            Reservation memory reservation = reservations[dayReservations[i]];
            if (State.VALID == reservation.state) {
                listReservation[reservation.schedule.hour - minimumHour] = true;
            }
        }
        return listReservation;
    }

    function withdrawBalance() public onlyOwner {
        uint aux = balanceOwner;
        balanceOwner = 0;
        payable(owner()).transfer(aux);
    }

    function withdrawPerUser() public {
        uint256 aux = balances[msg.sender];
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(aux);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function getBalanceOwner() public view onlyOwner returns (uint256) {
        return balanceOwner;
    }

    function getReservation(uint16 idReservation) public view returns (Reservation memory) {
        return reservations[idReservation];
    }

    function getDayReservations(
        uint16 year,
        uint8 month,
        uint8 day
    ) public view dateValid(year, month, day) returns (uint16[] memory) {
        uint32 idDia = generateId(year, month, day);
        return reservationsPerDays[idDia];
    }

    function getReservationPerUser() public view returns (uint16[] memory) {
        return reservationsPerUsers[msg.sender];
    }
}
