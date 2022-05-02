const MyToken = artifacts.require("MyToken");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Token Test", async (accounts) => {

    const [owner, recipient, anotherAccounts] = accounts;

    beforeEach(async() => { //I have no fucking idea why my beforeEach is not working lol, but each of the test do work if you comment them
        this.myToken = await MyToken.new(1000000);//instead of hardcoding the 1000000 it should be connected t the ENV file but I cant manage it to work
    })

    it("all tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), totalSupply.valueOf(), "The balance is not the same")
        return expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })

    it("is not possible to send more tokens than the ones you have", async() => {
        let instance = this.myToken;
        let balanceOfOwner = await instance.balanceOf(owner);

        expect(instance.transfer(recipient, new BN(balanceOfOwner+1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(owner)).to.eventually.be.a.bignumber.equal(balanceOfOwner)
    })
});