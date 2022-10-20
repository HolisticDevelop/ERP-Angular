import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../entity/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string;

  constructor(private http: HttpClient) {
    this.productUrl = "http://localhost:8080/product"
  }

  public findAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.productUrl);
  }

  public save(product: Product){
    return this.http.post(this.productUrl, product)
  }
}
