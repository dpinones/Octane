import { Component, OnInit } from '@angular/core';
import { Constants } from '../models/constant';
import { State } from '../models/state.model';
import { ReservationUI } from '../models/reservationUI.model';
import { BlockchainService } from './../../services/blockchain/blockchain.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  minimumHour!: number;
  maximumHour!: number;
  hourValue!: string;
  amountOfReservations!: number;
  listReservationPerDay!: boolean[];
  dayReservations!: ReservationUI[];
  indexReservationSelected!: number;
  daySelected: Date = new Date;
  minDate: Date = new Date;
  amount!: number;
  balance!: string;

  constructor(private spinner: NgxSpinnerService, private blockchainService: BlockchainService) {
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.spinner.show();
    this.minimumHour = await this.blockchainService.minimumHour();
    this.maximumHour = await this.blockchainService.maximumHour();
    this.hourValue = await this.blockchainService.hourValue();
    this.amountOfReservations = this.maximumHour - this.minimumHour + 1;
    this.balance = await this.blockchainService.getBalance();
    this.updateReservations();
    this.spinner.hide();
  }

  async updateReservations() {
    let year = this.daySelected.getFullYear();
    let month = this.daySelected.getMonth() + 1;
    let day = this.daySelected.getUTCDate();
    this.listReservationPerDay = await this.blockchainService.listReservationPerDay(year, month, day);


    this.dayReservations = new Array<ReservationUI>();
    let auxMinumumHour: number = this.minimumHour; 
    // if(horaMinimaLoop < this.minDate.getHours()){
    //   horaMinimaLoop = this.minDate.getHours();
    // }
    for (let i = 0; i < this.amountOfReservations; i++) {
      let turn: boolean = this.listReservationPerDay[i];
      this.dayReservations.push(new ReservationUI(this.generateLabel(auxMinumumHour), turn ? "BUSY" : "FREE", auxMinumumHour, turn ? State.BUSY : State.FREE, turn ? Constants.colourBusy : Constants.colourFree));
      auxMinumumHour++;
    }
  }

  generateLabel(hour: number): string {
    return hour + " - " + (hour + 1);
  }

  selectReservation(reservation: ReservationUI, index: number){
    if(reservation.state == State.BUSY){
      alert("its busy");
    } else {
        if (this.indexReservationSelected >= 0) {
          this.dayReservations[this.indexReservationSelected].state = State.FREE;
          this.dayReservations[this.indexReservationSelected].stateLabel = "FREE";
          this.dayReservations[this.indexReservationSelected].colour = Constants.colourFree;
        }

        this.indexReservationSelected = index;
        
        this.dayReservations[this.indexReservationSelected].state = State.SELECTED;
        this.dayReservations[this.indexReservationSelected].stateLabel = "SELECTED";
        this.dayReservations[this.indexReservationSelected].colour = Constants.colourSelected;
    }
  }

  async confirm(){
    console.log('amount:', this.amount);
    if(this.indexReservationSelected >= 0) {
      this.spinner.show();
      let year = this.daySelected.getFullYear();
      let month = this.daySelected.getMonth() + 1;
      let day = this.daySelected.getUTCDate();
      let hour = this.dayReservations[this.indexReservationSelected].hour;
      let reserva = await this.blockchainService.createReservation(year, month, day, hour, this.amount);
      this.updateReservations();
      this.balance = await this.blockchainService.getBalance();
      this.spinner.hide();
    } else {
      alert("I do not select a reservation");
    }
  }

  withdraw() {
    alert("not implemented");
  }
}
