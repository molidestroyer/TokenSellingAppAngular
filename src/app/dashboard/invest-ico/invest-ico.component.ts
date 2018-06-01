import { InvestICOService } from './services/invest-ico.services';
import { WalletDetails } from './../models/wallet.details.interface';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invest-ico',
  templateUrl: './invest-ico.component.html',
  styleUrls: ['./invest-ico.component.css']
})
export class InvestICOComponent implements OnInit {
 
  private tokenPrice: number;
  private walletDetails: WalletDetails;
  private userAddress: string;
  private investAmount: number;

  constructor(private dashboardService: DashboardService, private investICOService: InvestICOService)  { }

  public sendEther(){
    this.investICOService.invest(this.investAmount)
      .subscribe(() => {
        alert("Transaction done");
      },
        error => {
          //this.notificationService.printErrorMessage(error);
        });
  }

  ngOnInit() {
    this.dashboardService.getWalletDetails()
      .subscribe((walletDetails: WalletDetails) => {
        this.walletDetails = walletDetails;
      },
        error => {
          //this.notificationService.printErrorMessage(error);
        });

        this.investICOService.getTokenPrice()
      .subscribe((tokenPrice: number) => {
        this.tokenPrice = tokenPrice;
      },
        error => {
          //this.notificationService.printErrorMessage(error);
        });
  }

}
