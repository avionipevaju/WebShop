import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Object[] = [];
  shoppingCart: Object[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/WebShopDWP/rest/products')
      .subscribe(data => {
        let i = 0;
        for (const prod in data) {
          this.products[i++] = data[prod];
        }
        console.log(this.products);
      });
  }

  selectProduct(item): void {
    const selected = document.getElementById('selected') as HTMLInputElement;
    selected.value = item.name;
  }
  addToCart(): void {
    const cart = document.getElementById('cart');

    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const selected = document.getElementById('selected') as HTMLInputElement;
    const quantity = document.getElementById('quantity') as HTMLInputElement;

    if (selected.value === '' || quantity.value === '' || isNaN((Number)(quantity.value))) {
      alert('Fields not filled correctly');
    }else {
      let price: number;
      this.products.forEach(element => {
        if (element['name'] === selected.value) {
          price = element['price'];
          const temp: Object = element;
          temp['quantity'] = quantity.value;
          this.shoppingCart.push(temp);
        }
      });
      const txt = document.createTextNode('Name: ' + selected.value + ' | Quantity: ' +
        quantity.value + ' | Price: ' + price * (Number)(quantity.value) );

      td.appendChild(txt);
      tr.appendChild(td);
      cart.appendChild(tr);

      console.log(this.shoppingCart);
    }


  }

}
