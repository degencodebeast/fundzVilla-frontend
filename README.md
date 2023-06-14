## FundzVilla

FundzVilla is a decentralized fundraising platform built on the principles of a Decentralized Autonomous Organization (DAO). It enables users to create campaigns to raise funds for their projects or causes, and the DAO community members can vote to determine which campaigns receive funding or donations.    

### Live Demo
https://fundz-villa.vercel.app/

## Why Buidl FundzVilla
FundzVilla aims at revolutionalizing Traditional Fundraising, introducing more community engagement, Transparency to fundraising processes
and introducing a wider range for availability accross the globe. using blockchain technology the fundraising proccesed would be much better than
Traditional fundraising bringing access to users arround the world.

## Technology Stacks
* NextJS
* Wagmi & Rainbowkit
* Solidity & Hardhat
* IPFS & Web3 storage
* Masa Finance SDK



## Features
* Create and manage campaigns for fundraising.
* Vote on Fraudulent Campaigns
* Governance system for proposal creation and decision-making.
* Easy setup and installation.

## Challenges Encountered
* Fetching Campaigns from the smart contract, looping through to retrieve the data from IPFS and displaying in the UI.
* Dependency conflicts between ethers, viem, wagmi and rainbowkit due to the packages migrations.
* Resolving soulnames on the alfajores celo network using Masa finance's Masa SDK.

## Future  Plans
* Implement a fully functional DAO for community members to create proposals that would build the community.
* Deploy and Launch to Mainnet.


## Installation
1. Clone the repository to your local machine: 
```bash
git clone https://github.com/gabrieltemtsen/fundz-villa

```
2. Change to the project directory: 
```bash
cd fundz-villa
```
3. Install the required dependencies: 
```bash
npm install
```
## Usage
Once you have completed the installation, you can run Daovation using the following 
command: 
```bash
npm run dev
```
## Deployed contract addresses on the Alfajores Celo Network

```bash
 Contract Repo: 
https://github.com/gabrieltemtsen/fundz-villa-contract

Campaign Manager Contract: 
0x520504faCDf81aB331284cdFCfD9D76da9e04a7f

Governance Token Contract: 0xD2Ff3AC32A5479F53b6dc234866AD1d7cc69C0D9
```