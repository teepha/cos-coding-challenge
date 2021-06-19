export interface ICarOnSaleClientStub {
  getStubRunningAuctions(): Promise<BuyerAuctions[]>;
}

export interface ICarOnSaleClient {
  getAuthData(userMailId: string, password: string): Promise<AuthData>;
  getRunningAuctions(
    userMailId: string,
    password: string,
    filter: string
  ): Promise<RunningAuctionsData>;
}

export interface AuthData {
  userid: string;
  authtoken: string;
}

export interface UserAuthentication {
  token: string;
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: number;
  privileges: string;
}

export interface UserAuthenticationResponse {
  data: UserAuthentication;
}

export interface RunningAuctionsData {
  numberOfAuctions: number;
  averageNumberOfBids: number;
  averagePercentageOfAuctionProgress: number;
}

export interface BuyerAuctions {
  numBids: number;
  currentHighestBidValue: number;
  minimumRequiredAsk: number;
  [prop: string]: any;
}

export interface BuyerAuctionsItems {
  items: BuyerAuctions[];
  total: number;
  page: number;
}

export interface BuyerAuctionsResponse {
  data: BuyerAuctionsItems;
}
