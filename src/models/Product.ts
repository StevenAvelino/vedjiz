import { Supplier } from './Supplier'

export class Product {
  public id: number
  public productName: string
  public price: number
  public unit: string
  public suppliers: Array<Supplier>
  public picture: string
  public stock: number
  public updated: boolean
  public low_stock_threshold: number

  constructor(id:number, name:string, price:number, unit:string, suppliers:Array<Supplier>, path: string, stock: number, updated: boolean, low_stock_threshold: number) {
    this.id = id
    this.productName = name
    this.price = price
    this.unit = unit
    this.suppliers = suppliers
    this.picture = path
    this.stock = stock
    this.updated = updated
    this.low_stock_threshold = low_stock_threshold
  }

  update(name, price, unit, stock, path) {
    this.productName = name
    this.price = price
    this.unit = unit
    this.stock = stock
    this.picture = path
  }
}