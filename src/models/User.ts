export class User {
  private _id: number
  private _firstName: string
  private _lastName: string
  private _phone: string
  private _address: string

  constructor(id, firstName:string, lastName:string, phone:string, address:string) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.address = address
  }

  set firstName(firstName:string) {
    this._firstName = firstName
  }

  get firstName(): string {
    return this._firstName
  }

  set lastName(lastName:string) {
    this._lastName = lastName
  }

  get lastName(): string {
    return this._lastName
  }

  set phone(phone:string) {
    this._phone = phone
  }

  get phone(): string {
    return this._phone
  }

  set address(address:string) {
    this._address = address
  }

  get address(): string {
    return this._address
  }

  set id(id:number) {
    this._id = id
  }

  get id(): number {
    return this._id
  }
}