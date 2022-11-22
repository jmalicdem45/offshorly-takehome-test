import { OrderStore } from './../state/order.store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Order } from './../models/order.model';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrls: ['./add-edit-order.component.scss']
})
export class AddEditOrderComponent implements OnInit {

  order?: Order;
  newOrder?: Order;

  orderName?: string;

  constructor(
    private modalRef: BsModalRef,
    private orderStore: OrderStore
  ) {}

  ngOnInit(): void {
    if (this.order) {
      this.newOrder = { ...this.order};
      this.orderName = this.newOrder.orderName;
    }
  }

  createOrUpdateOrder(): void {
    if (this.order) {
      this.updateOrder();
      return;
    }

    this.createOrder();
  }

  close(): void {
    this.modalRef.hide();
  }

  createOrder(): void {
    const createOrder: Order = {
      id: uuidv4(),
      orderName: this.orderName,
      status: 'pending'
    }
    this.orderStore.addOrder(createOrder).subscribe(() => {
      this.close();
    }, err  => {
      console.log(err)
    })
  }

  updateOrder(): void {
    const updatedOrder = { ...this.newOrder, orderName: this.orderName};
    this.orderStore.updateOrder(updatedOrder).subscribe(() => {
      this.close();
    });
  }
}
