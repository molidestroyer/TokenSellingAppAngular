import { WalletDetails } from './../models/wallet.details.interface';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';

declare let window: any;
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  private web3: Web3;
  private walletDetails: WalletDetails;
  private transferAmount: number;

  constructor(private dashboardService: DashboardService) {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }

  public async sendEther() {
    var accounts = await this.web3.eth.getAccounts();
    let transferValue = this.web3.utils.toWei(this.transferAmount.toString(), 'ether')
    try{
      await this.web3.eth.sendTransaction({
      from: accounts[0],
      to: this.walletDetails.address,
      value: transferValue
    });
    this.walletDetails.ethBalance += this.transferAmount;
  }     
   catch(e){
      alert('error in transfer');
   } 
     
  }

  ngOnInit() {

    this.dashboardService.getWalletDetails()
      .subscribe((walletDetails: WalletDetails) => {
        this.walletDetails = walletDetails;
      },
        error => {
          //this.notificationService.printErrorMessage(error);
        });

  }

}
