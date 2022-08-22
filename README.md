# lukso

    This is a project for hackathon.I'm building a tool in order to recover society account.

## How to get the project started?

    git clone git@github.com:coffiasd/lukso.git
    cd lukso/frontend
    npm i
    npm run dev

## Youtube Video

    http://aaa.com

## Contract

### What we use to deploy and test our contract?

    hardhat
    Used local network by command: npx hardhat node.

### LSP0 ER725Account Contract

    first and foremost we need to deploy an ER725Account.

### LSP6 kEY Manager Contract

    need an address of the ER725Account to control.

### LSP11 Recover Contract

    need the address of ER725Account contract

#### Owner:

- set guardian
- remove guardian
- set secret

#### Guardians:

- vote
- recovery

## Frontend

### what we use to build our webiste?

- react
- next.js
- web3.js
- bootstrap
