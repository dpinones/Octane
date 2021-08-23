import { Component, Inject, OnInit } from '@angular/core';
import { BlockchainService } from './../../services/blockchain/blockchain.service';
import { Reservation } from '../models/reservation.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  balance!: string;
  misIdReservas!: number[];
  reservation!: Reservation;
  idReserva!: number;

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit(): void {
    this.getBalance();
    this.getReservations();
  }

  async getBalance() {
    this.balance = await this.blockchainService.getBalance();
  }

  async getReservations(){
    this.misIdReservas = await this.blockchainService.getReservationPerUser();
  }

  async getReservation(index: number){
    this.reservation = await this.blockchainService.getReservation(index);
    this.idReserva = index;
  } 

  toEth(i: number) {
    return i / 1000000000000000000;
  }

  cancel() {
    alert("not implemented");
  }

}
