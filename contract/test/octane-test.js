const { expectRevert, BN } = require("@openzeppelin/test-helpers");
const { accounts, contract } = require("@openzeppelin/test-environment");
const { expect } = require("chai");

describe("Octane", () => {
  let octane;

  let deployer, user, otherUser, otherUser2;

  let year = 2021;
  let month = 12;
  let day = 12;
  let hour = 13;
  const amount = { value: ethers.utils.parseEther("0.5") };

  beforeEach(async () => {
    const Octane = await ethers.getContractFactory("Octane");
    octane = await Octane.deploy();
    await octane.deployed();
    [deployer, user, otherUser, otherUser2] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should deploy with the right params", async () => {
      expect(await octane.owner()).to.equal(deployer.address);
      expect(await octane.getBalanceOwner()).to.equal(0);
      expect(await octane.hourValue()).to.equal(ethers.utils.parseEther("0.5"));
      expect(await octane.minimumHour()).to.equal(13);
      expect(await octane.maximumHour()).to.equal(21);
    });
  });

  describe("Require", () => {
    it("The date has passed", async () => {
      await expectRevert(octane.createReservation(2020, month, day, hour, amount), "HelperDate: The date has passed");
    });

    it("Invalid date", async () => {
      await expectRevert(octane.createReservation(year, 13, day, hour, amount), "HelperDate: Invalid date");
    });

    it("Insufficient amount", async () => {
      const amountLocal = { value: ethers.utils.parseEther("0.4") };
      await expectRevert(
        octane.createReservation(year, month, day, hour, amountLocal),
        "ReservePrice: Insufficient amount",
      );
    });

    it("Minimum hour", async () => {
      await expectRevert(octane.createReservation(year, month, day, 12, amount), "HelperDate: Invalid minimum hour");
    });

    it("Maximum hour", async () => {
      await expectRevert(octane.createReservation(year, month, day, 22, amount), "HelperDate: Invalid maximum hour");
    });

    it.skip("Invalid idReservation", async () => {
      await expectRevert(await octane.connect(user).cancelReservation(100), "Octane: Invalid idReservation");
    });

    it.skip("Reservation from another user", async () => {
      let hourCancel = hour;
      let createReservation = await octane.connect(user).createReservation(year, month, day + 1, hourCancel, amount);
      await createReservation.wait();
      await expectRevert(await octane.connect(otherUser).cancelReservation(0), "Octane: Reservation from another user");
    });

    it.skip("This reservation has already been canceled", async () => {
      let createReservation = await octane.connect(user).createReservation(year, month, day + 1, hour, amount);
      await createReservation.wait();
      let cancelReservation = await octane.connect(user).cancelReservation(year, month, day + 1, 0);
      await cancelReservation.wait();
      await expectRevert(
        await octane.connect(user).cancelReservation(year, month, day + 1, 0),
        "Octane: This reservation has already been canceled",
      );
      console.log("amount reservation: ", await octane.connect(otherUser).getReservationPerUser());
    });
  });

  describe("Interactive", () => {
    it("Create reservation", async () => {
      expect(await octane.connect(otherUser).isFree(year, month, day, hour)).to.equal(true);
      let idReserva = await octane
        .connect(otherUser)
        .createReservation(year, month, day, hour, { value: ethers.utils.parseEther("1.0") });
      await idReserva.wait();
      console.log("amount reservation: ", await octane.connect(otherUser).getReservationPerUser());
      let reservations = await octane.connect(otherUser).getReservationPerUser();
      let idReservation = reservations[reservations.length - 1];
      let reservation = await octane.getReservation(idReservation);
      expect(reservation.user).to.equal(otherUser.address);
    });

    it("Cancel reservation", async () => {
      let hourCancel = hour + 1;
      expect(await octane.connect(user).isFree(year, month, day, hourCancel)).to.equal(true);
      let createReservation = await octane.connect(user).createReservation(year, month, day, hourCancel, amount);
      await createReservation.wait();
      expect(await octane.connect(user).isFree(year, month, day, hourCancel)).to.equal(false);
      let reservations = await octane.connect(user).getReservationPerUser();
      let idReservation = reservations[reservations.length - 1];
      let cancelReservation = await octane.connect(user).cancelReservation(idReservation);
      await cancelReservation.wait();
      expect(await octane.connect(user).isFree(year, month, day, hourCancel)).to.equal(true);
    });

    it("getDayReservations", async () => {
      let idReserva = await octane.connect(user).createReservation(year, month, day, hour, amount);
      await idReserva.wait();
      let idReserva2 = await octane.connect(otherUser).createReservation(year, month, day, hour + 1, amount);
      await idReserva2.wait();
      let reservations = await octane.connect(user).getDayReservations(year, month, day);
      expect(reservations.length).to.equal(2);
    });

    it.skip("listReservationPerDay", async () => {
      let idReserva = await octane.connect(user).createReservation(year, month, day, hour, amount);
      await idReserva.wait();
      let idReserva2 = await octane.connect(otherUser).createReservation(year, month, day, hour + 1, amount);
      await idReserva2.wait();
      let reservations = await octane.connect(user).listReservationPerDay(year, month, day);
      console.log("reservations:", reservations);
      expect(reservations).to.equal([true, true, false, false, false, false, false, false, false]);
    });

    it("getReservationPerUser", async () => {
      let idReserva = await octane.connect(otherUser).createReservation(year, month, day, hour, amount);
      await idReserva.wait();
      let idReserva2 = await octane.connect(otherUser).createReservation(year, month, day, hour + 1, amount);
      await idReserva2.wait();
      let reservations = await octane.connect(otherUser).getReservationPerUser();
      expect(reservations.length).to.equal(2);
    });

    it("Create reservation - Balance 0", async () => {
      let hourCancel = hour + 2;
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane.createReservation(year, month, day, hourCancel, amount);
      await createReservation.wait();
      expect(await octane.connect(user).getBalance()).to.equal(0);
    });

    it("Create reservation - Balance 0.1", async () => {
      const monto = { value: ethers.utils.parseEther("0.6") };
      let hourCancel = hour + 3;
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane.connect(user).createReservation(year, month, day, hourCancel, monto);
      await createReservation.wait();
      expect(await octane.connect(user).getBalance()).to.equal("100000000000000000");
    });

    it("Create double reservation", async () => {
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane
        .connect(user)
        .createReservation(year, month, day, hour, { value: ethers.utils.parseEther("1.0") });
      await createReservation.wait();
      expect(await octane.connect(user).getBalance()).to.equal("500000000000000000");
      let createReservation2 = await octane.connect(user).createReservation(year, month, day, hour + 1);
      await createReservation2.wait();
      let reservations = await octane.connect(user).getReservationPerUser();
      expect(reservations.length).to.equal(2);
      expect(await octane.connect(user).getBalance()).to.equal(0);
    });

    it("Create double reservation plus", async () => {
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane
        .connect(user)
        .createReservation(year, month, day, hour, { value: ethers.utils.parseEther("0.9") });
      await createReservation.wait();
      expect(await octane.connect(user).getBalance()).to.equal("400000000000000000");
      let createReservation2 = await octane
        .connect(user)
        .createReservation(year, month, day, hour + 1, { value: ethers.utils.parseEther("0.1") });
      await createReservation2.wait();
      let reservations = await octane.connect(user).getReservationPerUser();
      expect(reservations.length).to.equal(2);
      expect(await octane.connect(user).getBalance()).to.equal(0);
    });

    it("Create double reservation fail", async () => {
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane
        .connect(user)
        .createReservation(year, month, day, hour, { value: ethers.utils.parseEther("0.9") });
      await createReservation.wait();
      expect(await octane.connect(user).getBalance()).to.equal("400000000000000000");
      await expectRevert(
        octane.connect(user).createReservation(year, month, day, hour + 1),
        "ReservePrice: Insufficient amount",
      );
    });

    it("Withdraw User", async () => {
      const monto = { value: ethers.utils.parseEther("2.0") };
      let hourCancel = hour + 4;
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane.connect(user).createReservation(year, month, day, hourCancel, monto);
      await createReservation.wait();
      expect(await octane.connect(user).getBalance()).to.equal("1500000000000000000");
      let withdrawPerUser = await octane.connect(user).withdrawPerUser();
      await withdrawPerUser.wait();
      expect(await octane.connect(user).getBalance()).to.equal(0);
    });

    it("Withdraw Owner", async () => {
      const monto = { value: ethers.utils.parseEther("2.0") };
      let hourCancel = hour + 5;
      expect(await octane.connect(user).getBalance()).to.equal(0);
      let createReservation = await octane.connect(user).createReservation(year, month, day, hourCancel, monto);
      await createReservation.wait();
      expect(await octane.getBalanceOwner()).to.equal("500000000000000000");
      let withdrawOwner = await octane.withdrawBalance();
      await withdrawOwner.wait();
      expect(await octane.getBalanceOwner()).to.equal(0);
    });
  });
});
