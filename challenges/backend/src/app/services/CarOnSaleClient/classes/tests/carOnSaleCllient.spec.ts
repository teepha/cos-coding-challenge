import "reflect-metadata";
import { expect } from "chai";
import "mocha";
import { CarOnSaleClientStub } from "../CarOnSaleClientStub";
import { mockData } from "./mocks/mock";

const carOnSaleClientStub = new CarOnSaleClientStub();

describe("CarOnSaleClientStub class test", () => {
  describe("getStubRunningAuctions() class method", () => {
    it("should successfully return the stubbed running auctions", async () => {
      const result = await carOnSaleClientStub.getStubRunningAuctions();
      expect(result).to.eql(mockData.stubbedRunningAuctions);
    });
  });
});
