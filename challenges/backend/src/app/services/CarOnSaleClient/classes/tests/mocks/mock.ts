export const mockData = {
  email: process.env.USERMAILID || "",
  password: process.env.PASSWORD || "",
  filter: "isLive=false",
  returnedAuction: {
    numberOfAuctions: 10,
    averageNumberOfBids: 0,
    averagePercentageOfAuctionProgress: 10.2,
  },
  returnedAuthData: {
    userid: process.env.USERMAILID || "",
    authtoken: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlRPS0VOLXNhbGVzbWFuQHJhbmRvbS5jb
      20iLCJ1c2VyVXVpZCI6ImNlNWUzZDdmLTNhM2QtNGZkZS05NmJjLTk4NmQ1ZjQ4M2RmOCIs
      ImlhdCI6MTYyNDAyODE3MSwiZXhwIjoxNjI0Mjg3MzcxfQ.hJlVtl7fSLdnBQS0AS5lSNlG2NgP9XSE
      6D8C_ks16ufisU-n8mblweyqFuN9rORmrzo5jpCpAX5pMYX39PTpFHCacJWIi1RSEJR9FIUXzBOd7
      VszFApRlybr1sJE1sptGc3q7kZfEEVrZ-UC-C3ZsDKIB0Rm_umB9DfwdjOAnp8`,
  },
  stubbedRunningAuctions: [
    {
      id: 1,
      numBids: 10,
      currentHighestBidValue: 34500,
      minimumRequiredAsk: 123566,
    },
    {
      id: 1,
      numBids: 10,
      currentHighestBidValue: 34500,
      minimumRequiredAsk: 123566,
    },
    {
      id: 1,
      numBids: 10,
      currentHighestBidValue: 34500,
      minimumRequiredAsk: 123566,
    },
  ],
};
