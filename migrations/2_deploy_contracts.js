const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
require("dotenv").config({path: "../.env"});


module.exports = async function(deployer) {
    const addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, 1000000);//instead of hardcoding the 1000000 it should be connected t the ENV file but I cant manage it to work
    const myToken = await MyToken.deployed();
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);
    myToken.transfer(MyTokenSale.address, 1000000);//instead of hardcoding the 1000000 it should be connected t the ENV file but I cant manage it to work
}