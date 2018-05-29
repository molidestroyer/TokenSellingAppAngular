import { OrderDetails } from './../models/order.details.interface';
import { ExchangeService } from './services/exchange.services';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'createOrderDialog.component',
  templateUrl: 'createOrderDialog.component.html',
})
export class CreateOrderDialog {

  private amount: number;
  private price: number;

  constructor(
    public dialogRef: MatDialogRef<CreateOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private exchangeService: ExchangeService,
    private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public createOrder() {
    this.exchangeService.createOrder(this.amount, this.price).subscribe(() => {
      this.snackBar.open('Message archived', '',{
        duration: 3000
      });

      this.dialogRef.close();
    },
      error => {
        //this.notificationService.printErrorMessage(error);
      });
  }

}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  public orders = new Array<OrderDetails>();

  constructor(private dashboardService: DashboardService, private exchangeService: ExchangeService, public dialog: MatDialog, private snackBar: MatSnackBar)  { }

  ngOnInit() {
    this.exchangeService.getOrders().subscribe((orderDetails: Array<OrderDetails>) => {
      this.orders  = orderDetails;
    },
      error => {
        //this.notificationService.printErrorMessage(error);
      });
      
  }

  public openDialog(){
    let order : OrderDetails;
    let dialogRef = this.dialog.open(CreateOrderDialog, {
      width: '250px'
    });
  }

  public buyOrder(transactionId: string) {
    this.exchangeService.buyOrder(transactionId).subscribe(() => {
      this.snackBar.open('Order bought', '',{
        duration: 3000
      });
      
    },
      error => {
        //this.notificationService.printErrorMessage(error);
      });
  }

}



