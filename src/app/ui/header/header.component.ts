import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './../../services/blockchain/blockchain.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connect: boolean = false;
  account: string = '';

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit(): void {
    this.userConnect();
  }

  async userConnect(){
    this.connect = await this.blockchainService.userConnected();
    if(this.connect) {
      this.getAccount();
    }
  }

  async connectToMetamask() {
    await this.blockchainService.connectToMetamask();
    this.userConnect();
  }

  async disconnectToMetamask() {
    alert("Disconnect To Metamask");
    // await this.blockchainService.disconnectedToMetamask();
  }

  async getAccount() {
    let account: string[];
    account = await this.blockchainService.getAccount();
    this.account = account[0];
  }

  acortar(address: string): string{
    return address.substr(0, 4) + "..."+address.substr(address.length-5, address.length-1);
  }

}
