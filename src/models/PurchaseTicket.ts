import { PurchaseDetails } from "./PurchaseDetails";


class PurchaseTicket {
  constructor(
  private id: string,
  private purchaseDetailsTicket :PurchaseDetails,
  private createdAt: string,
  ){}
  public getId(): string {
    return this.id;
}
public getPurchaseDetailsTicket(): PurchaseDetails|undefined {
    return this.purchaseDetailsTicket;
}
public getCreatedAt(): string {
    return this.createdAt;
}
}