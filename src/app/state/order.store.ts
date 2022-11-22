import { Order } from './../models/order.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

// I used this implementation because I can't install it in the latest version of Angular.

@Injectable({
    providedIn: 'root'
})
export class OrderStore {
    orders$: BehaviorSubject<Order[]> = new BehaviorSubject([] as Order[]);

    init(): Observable<void> {
        return new Observable((observer) => {
            const savedOrdersString = sessionStorage.getItem('orders');
            if (savedOrdersString) {
                const savedOrders = JSON.parse(savedOrdersString);
                this.orders$.next(savedOrders);
            }
            observer.next();
            observer.complete();
        });
    }

    addOrder(order: Order): Observable<Order> {
        return new Observable((observer) => {
            const collection = this.orders$.getValue();
            const newCollection = [ order, ...collection ];
            this.orders$.next(newCollection);
            sessionStorage.setItem('orders', JSON.stringify(newCollection));
            observer.next(order);
            observer.complete();
        });
    }

    updateOrder(order: Order): Observable<Order> {
        return new Observable((observer) => {
            const collection = this.orders$.getValue();
            const index = collection.findIndex((i) => i.id === order.id);
            const newCollection = [ ...collection ];
            newCollection[index] = order;
            this.orders$.next(newCollection);
            sessionStorage.setItem('orders', JSON.stringify(newCollection));
            observer.next(order);
            observer.complete();
        });
    }

    deleteOrder(id: string): Observable<void> {
        return new Observable((observer) => {
            const collection = this.orders$.getValue();
            const index = collection.findIndex((i) => i.id === id);
            const newCollection = [ ...collection ];
            newCollection.splice(index, 1);
            this.orders$.next(newCollection);
            sessionStorage.setItem('orders', JSON.stringify(newCollection));
            observer.next();
            observer.complete();
        });
    }

    getOrders(): Observable<Order[]> {
        return this.orders$;
    }
}