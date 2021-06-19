export interface ICarOnSaleClientStub {
  getStubRunningAuctions(): Promise<BuyerAuctions[]>;
}

export interface BuyerAuctions {
  numBids: number;
  currentHighestBidValue: number;
  minimumRequiredAsk: number;
  [prop: string]: any;
}
