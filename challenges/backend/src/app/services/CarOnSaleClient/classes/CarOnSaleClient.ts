import axios from "axios";
import { inject, injectable } from "inversify";
import { ILogger } from "../../Logger/interface/ILogger";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import {
  ICarOnSaleClient,
  AuthData,
  RunningAuctionsData,
  BuyerAuctions,
  UserAuthenticationResponse,
  BuyerAuctionsResponse,
} from "../interface/ICarOnSaleClient";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.BASE_URL) private baseUrl: string
  ) {}

  async getAuthData(userMailId: string, password: string): Promise<AuthData> {
    this.logger.log("Getting authentication data");

    try {
      const response: UserAuthenticationResponse = await axios.put(
        `${this.baseUrl}/v1/authentication/${userMailId}`,
        { password }
      );
      return { userid: response.data.userId, authtoken: response.data.token };
    } catch (error) {
      throw error;
    }
  }

  async getRunningAuctions(userMailId: string, password: string, filter: string): Promise<RunningAuctionsData> {
    this.logger.log("Getting entity from admin");

    try {
      const { userid, authtoken } = await this.getAuthData(userMailId, password);

      const response: BuyerAuctionsResponse = await axios.get(`${this.baseUrl}/v2/auction/buyer/?filter=${filter}`,
        { headers: { userid, authtoken } }
      );

      const numberOfAuctions = response.data.total;

      const totalNumberOfBids = response.data.items.reduce(
        function (cummulatedValue: number, currentValue: BuyerAuctions) {
          return cummulatedValue + currentValue.numBids;
        }, 0
      );
      const averageNumberOfBids = totalNumberOfBids / numberOfAuctions;

      const totalPercentageOfAuctionProgress = response.data.items.reduce(
        function (cummulatedValue: number, currentValue: BuyerAuctions) {
          return (cummulatedValue + (currentValue.currentHighestBidValue / currentValue.minimumRequiredAsk) * 100);
        }, 0
      );
      const averagePercentageOfAuctionProgress = totalPercentageOfAuctionProgress / numberOfAuctions;

      return { numberOfAuctions, averageNumberOfBids, averagePercentageOfAuctionProgress };
    } catch (error) {
      throw error;
    }
  }
}
