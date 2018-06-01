import { MatSnackBar } from '@angular/material';
import { DividendService } from './services/dividend.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.css']
})
export class DividendComponent implements OnInit {

  private pendingDividends: number;

  constructor(private dividendService: DividendService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dividendService.getPendingDividends().subscribe((pendingDividends: number) => {
      this.pendingDividends = pendingDividends;
    },
      error => {
        //this.notificationService.printErrorMessage(error);
      });
  }


  public claimDividends(){
    this.dividendService.claimDividends().subscribe(() => {
      this.snackBar.open('Dividends claimed', '',{
        duration: 3000
      });
      
    },
      error => {
        //this.notificationService.printErrorMessage(error);
      });
  }

}
