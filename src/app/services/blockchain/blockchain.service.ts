import {
  Injectable
} from '@angular/core';
import { BigNumber, Contract, ethers } from 'ethers';
import * as abis from './../../../utils/getAbis';
import * as contractAddresses from './../../../utils/getContractAddress';
import { Reservation } from '../../ui/models/reservation.model';


declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  ethereum: any;
  private signer: any;
  private enable: any;
  private accounts: any;
  private octaneAddress: string;

  constructor() {
    this.octaneAddress = contractAddresses.getOctaneAddress()
  }

  async userConnected(){
    try {
      var provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return true;
    } catch {
      return false;
    }
  }

  async connectToMetamask() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.ethereum !== 'undefined') {
        console.log('typeof window.ethereum ', typeof window.ethereum !== 'undefined');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      this.enable = this.enableMetaMaskAccount();
    }
  }

  async disconnectedToMetamask() {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('provider:', provider);
    
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.request({ method: 'eth_requestAccounts' });
    });
    return Promise.resolve(enable);
  }

  async getAccount() {
    let accounts: [];
    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('accounts:', accounts);
    return accounts;
  }

  async getChainId() {
    let chainId: number;
    console.log('window.ethereum = ', window.ethereum);
    chainId = parseInt(window.ethereum.chainId);
    return chainId;
  }

  async getBnbBalance(address: string) {
    let balance: string;
    balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    return balance;
  }

  /**
   *  OCTANE
   */

  async createReservation(year: number, month: number, day: number, hour: number, amount: number) {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let idReserva: any;
    try {
      idReserva = await octaneContract.createReservation(year, month, day, hour, { value: ethers.utils.parseEther(String(amount)) });
      await idReserva.wait();
    } catch(error) {
      if(error.data){
        alert(error.data.message);
      }else {
        alert(error);
      }
    }
    return idReserva;
  }
  
  async listReservationPerDay(year: number, month: number, day: number) {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let listaReserva: boolean[] = await octaneContract.listReservationPerDay(year, month, day);
    return listaReserva;
  }
  
  async getReservationPerUser() {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let listaReservasPorUsuario: number[] = await octaneContract.getReservationPerUser();
    return listaReservasPorUsuario;
  }

  async getReservation(idReserva: number){
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let reserva: Reservation = await octaneContract.getReservation(idReserva);
    // let priceStr: string = reserva.price.toString(); 
    // let ret = ethers.utils.formatEther(priceStr);
    // console.log('ret:', typeof ret);
    // reserva.price = "ret";
    return reserva;
  }

  async minimumHour() {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let horaMinima: number = await octaneContract.minimumHour();
    return horaMinima;
  }
  
  async maximumHour() {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let horaMaxima: number = await octaneContract.maximumHour();
    return horaMaxima;
  }

  async hourValue() {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let valorHora: number = await octaneContract.hourValue();
    let ret = ethers.utils.formatEther(valorHora);
    return ret;
  }

  async getBalance() {
    let octaneContract: Contract;
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    octaneContract = new ethers.Contract(
      this.octaneAddress,
      abis.getAbiForOctane(),
      signer
    );
    octaneContract.connect(signer);
    let balance: BigNumber = await octaneContract.getBalance();
    let balanceStr: string = balance.toString(); 
    let ret = ethers.utils.formatEther(balanceStr);
    return ret;
  }
  
}
