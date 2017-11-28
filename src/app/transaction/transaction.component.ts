import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  confirmBuy(): void {
    let shoppingCart: Object[] = [];
    shoppingCart = JSON.parse(sessionStorage.getItem('cart'));
    shoppingCart.forEach(element => {
        element['user'] = sessionStorage.getItem('user');
    });
    sessionStorage.setItem('cart', JSON.stringify(shoppingCart));
    const location = document.getElementById('location') as HTMLInputElement;
    if (location.value === '') {
      alert('Fields not filled correctly');
      return;
    }
    const ccn = document.getElementById('ccn') as HTMLInputElement;
    if (!this.validCreditCard(ccn.value) || ccn.value === '') {
      alert('Credit card number not valid! Try again');
      return;
    }
    this.http.post('http://localhost:8080/WebShopDWP/rest/products/store', sessionStorage.getItem('cart'),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] === 'OK') {
          alert('Transaction successful');
        }else {
          alert('Transaction failed. Try again');
        }
      });
  }

  validCreditCard(value) {
    if (/[^0-9-\s]+/.test(value)) {
      return false;
    }
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      const cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) {
          nDigit -= 9;
        }
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) === 0;
  }
}
