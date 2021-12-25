# IPFS Upload & Contract Registry

This is a simple command line tool that uploads a file to ipfs and stores the CID in a smart contract.

## Installation

```
$ git clone https://github.com/jelilat/ipfsregistry
$ cd ipfsregistry/registry
$ yarn global add registry --ignore-engines
$ yarn build

```

## Usage 

For help, run: `registry`

```
 $ registry upload <file path> <private key>    //upload a file to ipfs and store the cid to the registry smart contract.
    $ registry getallcids                          //get all cids from the registry smart contract.
    $ registry cidowner <cid>                      //get the address that uploaded a cid.
    $ registry cidtime <cid>                       //get the time a cid was uploaded.
    $ registry cidinfo <cid>                       //get the info of a cid.
    $ registry confirm <cid>                       //confirm a cid.

```

To upload a file to ipfs and store the cid to the registry smart contract, run:
```
$ registry upload <file path> <private key>
```

To get all cids from the registry smart contract, run:
```
$ registry getallcids
```

To get the address that uploaded a cid, run:
```
$ registry cidowner <cid>
```

To get the time a cid was uploaded, run:
```
$ registry cidtime <cid>
```

To get the info of a cid, run:
```
$ registry cidinfo <cid>
```

To confirm if a cid has been uploaded, run:
```
$ registry confirm <cid>
```

## Smart Contract

`registry` smart contract is currently deployed to [rinkeby testnet](https://rinkeby.etherscan.io/address/0x1dc2305f2c96172027c1a4e56df1ffb1d2b225b2).

You can also find the smart contract code [here](https://github.com/jelilat/ipfs_registry)