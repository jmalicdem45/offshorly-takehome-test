import { Observable } from 'rxjs';
import { OrderStore } from './../state/order.store';
import { AddEditOrderComponent } from './../add-edit-order/add-edit-order.component';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  bsModalRef?: BsModalRef;
  loading: boolean = true;
  orders$?: Observable<Order[]>

  constructor(
    private modalService: BsModalService,
    private orderStore: OrderStore
  ) {}

  ngOnInit(): void {
    this.orderStore.init().subscribe(() => {
      this.loading = false;
      this.orders$ = this.orderStore.getOrders();
    });
  }

  openModal(order: any = null) {
    const initialState: ModalOptions = {
      initialState: {
        order
      } as Partial<Object>
    };
    this.bsModalRef = this.modalService.show(AddEditOrderComponent, initialState);
  }

  deleteOrder(order: Order): void {
    this.orderStore.deleteOrder(order.id as string).subscribe();
  }
}
