// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0; 

import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {

    constructor (uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {

    }

}