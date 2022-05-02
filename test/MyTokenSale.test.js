const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("TokenSale Test", async (accounts) => {

    const [owner, recipient, anotherAccounts] = accounts;

    it("should not have any token in my owner account"), async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(new BN(0));
    }


});