import "reflect-metadata";
import { expect } from "chai";
import "mocha";
import { stub, SinonStub } from "sinon";
import { CarOnSaleClientStub } from "../CarOnSaleClientStub";
import { CarOnSaleClient } from "../CarOnSaleClient";
import { Logger } from "../../../Logger/classes/Logger";
import { mockData } from "./mocks/mock";

const carOnSaleClientStub = new CarOnSaleClientStub();
const logger = new Logger();
const baseUrl = "someUrl.com";
const carOnSaleClient = new CarOnSaleClient(logger, baseUrl);

describe("CarOnSaleClientStub class test", () => {
  describe("getStubRunningAuctions() class method", () => {
    it("should successfully return the stubbed running auctions", async () => {
      const result = await carOnSaleClientStub.getStubRunningAuctions();
      expect(result).to.eql(mockData.stubbedRunningAuctions);
    });
  });
});

describe("CarOnSaleClient class test", () => {
  describe("getAuthData() class method", () => {
    let getAuthDataStub: SinonStub<
      [userMailId: string, password: string],
      Promise<any>
    >;

    afterEach(() => {
      getAuthDataStub.restore();
    })

    it("should successfully return the authtoken and userid", async () => {
      const { email, password, returnedAuthData } = mockData;
      getAuthDataStub = stub(carOnSaleClient, "getAuthData").returns(
        new Promise((resolve) => {
          resolve(returnedAuthData);
        })
      );

      const result = await carOnSaleClient.getAuthData(email, password);
      expect(result).to.equal(returnedAuthData);
      expect(getAuthDataStub.calledOnce).to.be.true;
      expect(result).to.have.property("userid").to.be.an("string");
      expect(result).to.have.property("authtoken").to.be.an("string");
    });

    it("should throw an error if wrong user email id and password are used", async () => {
      getAuthDataStub = stub(carOnSaleClient, "getAuthData").throws({
        message: "Request failed with status code 401"
      });

      try {
        await carOnSaleClient.getAuthData("email@email.com", "password");

      } catch (error) {
        expect(error).to.have.property("message", "Request failed with status code 401");
      }
    });
  });

  describe("getRunningAuctions() class method", () => {
    let getRunningAuctionsStub: SinonStub<
      [userMailId: string, password: string, filter: string],
      Promise<any>
    >;

    it("should successfully return the running auctions", async () => {
      const { email, password, filter, returnedAuction } = mockData;
      getRunningAuctionsStub = stub(carOnSaleClient, "getRunningAuctions").returns(
        new Promise((resolve) => {
          resolve(returnedAuction);
        })
      );

      const result = await carOnSaleClient.getRunningAuctions(email, password, filter);
      expect(result).to.equal(returnedAuction);
      expect(getRunningAuctionsStub.calledOnce).to.be.true;
      expect(result).to.have.property("numberOfAuctions").to.be.an("number");
      expect(result).to.have.property("averageNumberOfBids").to.be.an("number");
      expect(result).to.have.property("averagePercentageOfAuctionProgress").to.be.an("number");
      getRunningAuctionsStub.restore();
    });
  });
});
