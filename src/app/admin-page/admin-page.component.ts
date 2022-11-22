import { Observable } from 'rxjs';
import { OrderStore } from './../state/order.store';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  orders$?: Observable<Order[]>;

  constructor(
    private orderStore: OrderStore
  ) {}

  ngOnInit(): void {
    this.orderStore.init().subscribe(() => {
      this.orders$ = this.orderStore.getOrders();
    });
  }

  approveOrder(order: Order): void {
    const newOrder = { ...order, status: 'approved' };
    this.orderStore.updateOrder(newOrder).subscribe();
  }

  rejectOrder(order: Order): void {
    const newOrder = { ...order, status: 'rejected' };
    this.orderStore.updateOrder(newOrder).subscribe();
  }

}
