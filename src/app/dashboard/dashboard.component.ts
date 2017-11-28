import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Object[] = [];
  shoppingCart: Object[] = [];
  currentUser: String = 'Guest';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/WebShopDWP/rest/products')
      .subscribe(data => {
        let i = 0;
        for (const prod in data) {
          this.products[i++] = data[prod];
        }
        console.log(this.products);
      });
        let current: String = sessionStorage.getItem('user');
        console.log(current);
        current === null ? current = 'Guest' : current = sessionStorage.getItem('user');
        this.currentUser = current;
        const sc: String = JSON.parse(sessionStorage.getItem('cart'));
        if (sc !== null) {
          this.shoppingCart = JSON.parse(sessionStorage.getItem('cart'));
        }
  }

  selectProduct(item): void {
    const selected = document.getElementById('selected') as HTMLInputElement;
    selected.value = item.name;
  }

  deleteProduct(item): void {
    console.log(item);
    const shoppingCartTemp: Object[] = [];
    for (const product in this.shoppingCart) {
      if (this.shoppingCart[product]['name'] !== item['name']) {
        shoppingCartTemp.push(this.shoppingCart[product]);
      }
    }
    this.shoppingCart = shoppingCartTemp;
    sessionStorage.setItem('cart', JSON.stringify(this.shoppingCart));
  }

  addToCart(): void {
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
      sessionStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    }


  }

  buyProducts() {
    if (sessionStorage.getItem('user') != null) {
      this.router.navigate(['/dashboard', {outlets: {'buy': ['transaction']}}]);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('cart');
    this.router.navigate(['/']);
  }
}
