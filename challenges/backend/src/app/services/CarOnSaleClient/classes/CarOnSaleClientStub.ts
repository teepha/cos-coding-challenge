import { ICarOnSaleClientStub } from "../interface/ICarOnSaleClient";
import { mockData } from "./tests/mocks/mock";

export class CarOnSaleClientStub implements ICarOnSaleClientStub {
  async getStubRunningAuctions() {
    return Promise.resolve(mockData.stubbedRunningAuctions);
  }
}
