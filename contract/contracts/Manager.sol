// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP6KeyManager/LSP6KeyManager.sol";

// import "@lukso/lsp-smart-contracts/contracts/LSP11BasicSocialRecovery/LSP11BasicSocialRecovery.sol";

contract Manager is LSP6KeyManager {
    constructor(address _target) public LSP6KeyManager(_target) {}

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     virtual
    //     override(LSP6KeyManager, LSP11BasicSocialRecovery)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }
    receive() external payable {
        revert("bad call");
    }
}
