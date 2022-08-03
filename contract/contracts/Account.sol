// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.sol";
import "./LSP11/LSP11BasicSocialRecovery.sol";

contract Account is LSP0ERC725Account,LSP11BasicSocialRecovery {
    address public _owner;

    constructor(address _newOwner) LSP0ERC725Account(_newOwner) {
        _owner = _newOwner;
    }
}
