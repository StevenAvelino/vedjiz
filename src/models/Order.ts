export class Order {
  public id: number
  public productName: string
  public placedby: string
  public quantity: number
  public companyName: string

  constructor(id: number, productName: string, placedby: string, quantity: number, companyName: string) {
    this.id = id
    this.productName = productName
    this.placedby = placedby
    this.quantity = quantity
    this.companyName = companyName
  }
}