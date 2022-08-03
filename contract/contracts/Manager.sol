// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";

contract Manager is LSP6KeyManager, LSP11BasicSocialRecovery {
    constructor(address _target) LSP6KeyManager(_target) {}
}
