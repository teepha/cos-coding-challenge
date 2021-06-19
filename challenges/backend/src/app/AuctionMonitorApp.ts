import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CARONSALECLIENT)
    private carOnSaleClient: ICarOnSaleClient,
    @inject(DependencyIdentifier.USERMAILID) private userMailId: string,
    @inject(DependencyIdentifier.PASSWORD) private password: string
  ) {}

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);

    try {
      const {
        numberOfAuctions,
        averageNumberOfBids,
        averagePercentageOfAuctionProgress,
      } = await this.carOnSaleClient.getRunningAuctions(
        this.userMailId,
        this.password,
        "isLive=false"
      );

      this.logger.log(`Number of Auction: ${numberOfAuctions}`);
      this.logger.log(`Average number of bids: ${averageNumberOfBids}`);
      this.logger.log(
        `Average percentage of auction progress: ${averagePercentageOfAuctionProgress}`
      );
      process.exit(0);
    } catch (error) {
      this.logger.log(JSON.stringify(error));
      process.exit(-1);
    }
  }
}
