// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./LSP11/LSP11BasicSocialRecovery.sol";

contract Recover is LSP11BasicSocialRecovery {
    constructor(address _target) public LSP11BasicSocialRecovery(_target) {}
}
