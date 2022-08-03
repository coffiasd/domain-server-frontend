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
    console.log("deployed to:", account.address);
    const res = await account.owner();
    console.log("check owner address:", owner.address, " | ", res);
    console.log("start transfer owner address");
    // await account.transferOwnership(otherAccount.address);
    // const pending = await account.pendingOwner();
    // console.log("check pending owner address:", pending);
    // await account.connect(otherAccount).claimOwnership();
    // const res2 = await account.owner();
    // console.log("check owner address:", otherAccount.address, " | ", res2);

    //deploy manager contract
    const Manager = await hre.ethers.getContractFactory("Manager");
    console.log("deployed to:", account.address);
    const manager = await Manager.deploy(account.address);
    const target = await manager.target();
    console.log("target get target address:", target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
