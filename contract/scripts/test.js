// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    //deploy account contract
    const [owner, otherAccount] = await ethers.getSigners();
    const Account = await hre.ethers.getContractFactory("Account");
    const account = await Account.deploy(owner.address);
    await account.deployed();
    const LSP0ER725AccountAddress = account.address;
    console.log("LSP0 ERCaccount deployed to:", LSP0ER725AccountAddress);
    const res = await account.owner();
    console.log("check owner address:", owner.address, " | ", res);

    //deploy key manager contract
    const Manager = await hre.ethers.getContractFactory("Manager");
    const manager = await Manager.deploy(LSP0ER725AccountAddress);
    const target = await manager.target();
    console.log("target get target address:", target);
    console.log("lsp manager address:", manager.address);

    //deplay recover contract
    const Recover = await hre.ethers.getContractFactory("Recover");
    const recover = await Recover.deploy(LSP0ER725AccountAddress);
    await recover.deployed();
    console.log("recover address:", recover.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
