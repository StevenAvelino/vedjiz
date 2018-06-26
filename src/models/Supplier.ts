import { User } from './User'

export class Supplier {
  public id: number
  public firstName: string
  public lastName: string
  public companyName: string

  constructor(id:number, firstName:string, lastName:string, companyName:string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.companyName = companyName
  }
}