"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = exports.getCidInformation = exports.getCidTime = exports.getCidOwner = exports.getAllCids = exports.registerCid = exports.uploadFile = void 0;
const Web3 = require('web3');
const IPFS = require('ipfs-core');
const fs = require('fs');
const ether = require('ethers');
const abi = require('../../abi/abi.json').abi;
const address = "0x1dC2305F2C96172027c1A4E56df1FfB1D2B225b2";
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/0b5684a2dfdb41bfaf72e29ecc001ced"));
const registryContract = new web3.eth.Contract(abi, address);
//upload file to ipfs
async function uploadFile(filePath) {
    const content = fs.readFileSync(filePath);
    const ipfs = await IPFS.create();
    console.log("Uploading file to ipfs...");
    const { cid } = await ipfs.add({
        path: filePath,
        content: content
    });
    console.log("Uploaded file", filePath, "to ipfs with CID", cid.toString());
    ipfs.stop();
    return cid.toString();
}
exports.uploadFile = uploadFile;
//add cid to smart contract
async function registerCid(filePath, key) {
    const provider = new ether.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/0b5684a2dfdb41bfaf72e29ecc001ced');
    const wallet = new ether.Wallet(key, provider);
    const contract = new ether.Contract(address, abi, wallet);
    const cid = await uploadFile(filePath);
    await contract.register(cid)
        .then(function (txHash) {
        console.log("Transaction hash:", txHash);
    })
        .catch(function (error) {
        console.log("Error:", error);
    });
}
exports.registerCid = registerCid;
//get all cids from smart contract
async function getAllCids() {
    await registryContract.methods.getCids().call()
        .then(function (cid) {
        console.log("CID:", cid);
    })
        .catch(function (error) {
        console.log("Error:", error);
    });
}
exports.getAllCids = getAllCids;
//get the address that uploaded a cid
async function getCidOwner(cid) {
    await registryContract.methods.getOwner(cid).call()
        .then(function (address) {
        console.log("This cid was uploaded by:", address);
    })
        .catch(function (error) {
        console.log("Error:", error);
    });
}
exports.getCidOwner = getCidOwner;
//get the time a cid was uploaded
async function getCidTime(cid) {
    await registryContract.methods.getTimestamp(cid).call()
        .then(function (time) {
        console.log("This cid was uploaded at:", time);
    })
        .catch(function (error) {
        console.log("Error:", error);
    });
}
exports.getCidTime = getCidTime;
//get information about a cid
async function getCidInformation(cid) {
    await registryContract.methods.getCidInfo(cid).call()
        .then(function (info) {
        console.log("This cid was uploaded at:", info);
    })
        .catch(function (error) {
        console.log("Error:", error);
    });
}
exports.getCidInformation = getCidInformation;
//confirm if a cid has been uploaded
async function confirm(cid) {
    await registryContract.methods.confirmRegistry(cid).call()
        .then(function (status) {
        console.log(status);
    })
        .catch(function (error) {
        console.log("Error:", error);
    });
}
exports.confirm = confirm;
//# sourceMappingURL=registry.js.map