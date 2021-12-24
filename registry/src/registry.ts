const Web3 = require('web3');
const IPFS = require('ipfs-core');
const fs = require('fs');
const ether = require('ethers');
const abi = require('../../abi/abi.json').abi;
const address = "0x1dC2305F2C96172027c1A4E56df1FfB1D2B225b2"
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/0b5684a2dfdb41bfaf72e29ecc001ced"));
const registryContract = new web3.eth.Contract(abi, address);

//upload file to ipfs
export async function uploadFile(filePath: string) {
    const content: string = fs.readFileSync(filePath);
    const ipfs = await IPFS.create()
    console.log("Uploading file to ipfs...");
    const { cid } = await ipfs.add({
        path: filePath,
        content: content
    })
    
    console.log("Uploaded file", filePath, "to ipfs with CID", cid.toString())
    ipfs.stop()
    return cid.toString()
}
//add cid to smart contract
export async function registerCid(filePath: string, key: string){
    const provider = new ether.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/0b5684a2dfdb41bfaf72e29ecc001ced');
    const wallet = new ether.Wallet(key, provider);
    const contract = new ether.Contract(address, abi, wallet);
    const cid = await uploadFile(filePath);

    await contract.register(cid)
    .then(function(txHash: string){
        console.log("Transaction hash:", txHash);
    })
    .catch(function(error: any){
        console.log("Error:", error);
    });
}

//get all cids from smart contract
export async function getAllCids(){
    await registryContract.methods.getCids().call()
    .then(function(cid: string){
        console.log("CID:", cid);
    })
    .catch(function(error: any){
        console.log("Error:", error);
    })
}

//get the address that uploaded a cid
export async function getCidOwner(cid: string){
    await registryContract.methods.getOwner(cid).call()
    .then(function(address: string){
        console.log("This cid was uploaded by:", address);
    })
    .catch(function(error: any){
        console.log("Error:", error);
    })
}

//get the time a cid was uploaded
export async function getCidTime(cid: string){
    await registryContract.methods.getTimestamp(cid).call()
    .then(function(time: number){
        console.log("This cid was uploaded at:", time);
    })
    .catch(function(error: any){
        console.log("Error:", error);
    })
}
//get information about a cid
export async function getCidInformation(cid: string){
    await registryContract.methods.getCidInfo(cid).call()
    .then(function(info: any){
        console.log("This cid was uploaded at:", info);
    })
    .catch(function(error: any){
        console.log("Error:", error);
    })
}
//confirm if a cid has been uploaded
export async function confirm(cid: string){
    await registryContract.methods.confirmRegistry(cid).call()
    .then(function(status: string){
        console.log(status);
    })
    .catch(function(error: any){
        console.log("Error:", error);
    })
}
