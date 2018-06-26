import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/Product'
import { Order } from '../../models/Order'
import { Supplier } from '../../models/Supplier'
import { User } from '../../models/User'
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {

  products: Array<Product> = []
  suppliers: Supplier[] = []
  users: User[] = []
  headers: HttpHeaders
  orders: Array<Order> = []

  constructor(public http: HttpClient, public platform: Platform, public storage: Storage) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    })
  }

  getProductsAPI() {
    return new Promise(resolve => {
      this.http.get('http://vedjserver.mycpnv.ch/api/v1/vegetables').subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }

  setProducts() {
    this.storage.set('products', this.products)
  }

  getUpdatedProductsAPI() {
    return new Promise(resolve => {
      this.storage.get('lastupdate').then(val => {
        this.http.get(`http://vedjserver.mycpnv.ch/api/v1/vegetables/${val.updated_at}`).subscribe(data => {
          resolve(data)
        })
      })
    })
  }

  getLastUpdate() {
    return new Promise(resolve => {
      this.http.get('http://vedjserver.mycpnv.ch/api/v1/lastupdate').subscribe(data => {
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }

  updateProducts(changes) {
    this.http.patch('http://vedjserver.mycpnv.ch/api/v1/newstock', {"changes": changes}, {headers: this.headers}).subscribe(res => {
      console.log(JSON.stringify(res))
    }, err => {
      console.log(JSON.stringify(err))
    })
  }

  doRefreshProducts() {
    return new Promise<Product[]>(resolve => {
      this.storage.get('products').then(val => {
        this.getUpdatedProductsAPI().then(res => {
          let updatedProducts = JSON.parse(JSON.stringify(res)).map(up => {
            return new Product(up.id, up.productName, up.price, up.unit, [], up.image64, up.stock, false, up.low_stock_threshold)
          })
          let products = val.map(p => {
            let suppliers = p.suppliers.map(sup => {
              return new Supplier(sup.id, sup.firstName, sup.lastName, sup.companyName)
            })
            return new Product(p.id, p.productName, p.price, p.unit, suppliers, p.picture, p.stock, false, p.low_stock_threshold)
          })
          for (let updatedProduct of updatedProducts) {
            for (let product of products) {
              if (updatedProduct.id == product.id) {
                let index = products.findIndex((el) => (el.id === product.id))
                products[index] = updatedProduct
                break
              }
            }
          }
          this.getLastUpdate().then(newDate => {
            this.storage.set('lastupdate', newDate).then(() => {
              this.products = products
              this.setProducts()
              resolve(products)
            })
          })
        })
      })
    })
  }

  refreshProducts() {
    return new Promise<boolean>(resolve => {
      for (let product of this.products) {
        if (product.updated) {
          resolve(false)
        }
      }
      this.getLastUpdate().then(res => {
        this.storage.get('lastupdate').then(val => {
          if (val == null) {
            resolve(true)
          } else {
            if (Date.parse(val.updated_at) >= Date.parse(JSON.parse(JSON.stringify(res)).updated_at)) {
              resolve(false)
            } else {
              resolve(true)
            }
          }
        })
      })
    })
  }

  submitOrder(productID, supplierID, quantity) {
    return new Promise(resolve => {
      this.storage.get('name').then(val => {
        this.http.post('http://vedjserver.mycpnv.ch/api/v1/order', {"productid": productID, "providerid": supplierID, "placedby": val, "quantity": quantity})
          .subscribe(res => {
            resolve(res)
          })
      })
    })
    
  }

  getOrders() {
    return new Promise<Order[]>(resolve => {
      this.http.get('http://vedjserver.mycpnv.ch/api/v1/orders').subscribe(val => {
        this.storage.set('orders', val).then(() => {
          this.storage.get('orders').then(res => {
            this.orders = res.map(order => {
              return new Order(order.id, order.productName, order.placed_by, order.quantity, order.companyName)
            })
            resolve(this.orders)
          })
        })
      })
    })
  }

  withdrawOrder(order) {
    return new Promise(resolve => {
      this.http.post('http://vedjserver.mycpnv.ch/api/v1/withdraw', {"orderid": order.id}).subscribe(res => {
        resolve(res)
      })
    })
  }

  getProducts() {
    return new Promise<Product[]>(resolve => {
      this.getLastUpdate().then(res => {
        this.storage.get('lastupdate').then(val => {
          if (val == null) {
            this.storage.set('lastupdate', res).then(() => {
              this.getProductsAPI().then(res => {
                this.storage.set('products', res).then(() => {
                  this.storage.get('products').then(val => {
                    this.products = val.map(p => {
                      let suppliers = p.suppliers.map(sup => {
                        return new Supplier(sup.id, sup.firstName, sup.lastName, sup.companyName)
                      })
                      return new Product(p.id, p.productName, p.price, p.unit, suppliers, p.image64, p.stock, false, p.low_stock_threshold)
                    })
                    resolve(this.products)
                  }).catch(e => console.log(e))
                }).catch(e => console.log(e))
              })
            }).catch(e => console.log(e))
          } else {
            if (Date.parse(val.updated_at) >= Date.parse(JSON.parse(JSON.stringify(res)).updated_at)) {
              this.storage.get('products').then(val => {
                this.products = val.map(p => {
                  return new Product(p.id, p.productName, p.price, p.unit, p.suppliers, p.picture, p.stock, p.updated, p.low_stock_threshold)
                })
                resolve(this.products)
              }).catch(e => console.log(e) )
            } else {
              this.storage.set('lastupdate', res).then(() => {
                this.getProductsAPI().then(res => {
                  this.storage.set('products', res).then(() => {
                    this.storage.get('products').then(val => {
                      this.products = val.map(p => {
                        let suppliers = p.suppliers.map(sup => {
                          return new Supplier(sup.id, sup.firstName, sup.lastName, sup.companyName)
                        })
                        return new Product(p.id, p.productName, p.price, p.unit, suppliers, p.image64, p.stock, false, p.low_stock_threshold)
                      })
                      this.setProducts()
                      resolve(this.products)
                    }).catch(e => console.log(e))
                  }).catch(e => console.log(e))
                }).catch(e => console.log(e))
              }).catch(e => console.log(e))
            }
          }
        }).catch(e => console.log(e))
      })
      
    })
  }


}