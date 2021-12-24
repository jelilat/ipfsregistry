#!/usr/bin/env npx node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry = require("./registry");
const version_1 = require("./version");
/**
 *  return the arguments of the command except node and index.ts
 */
const getArgs = () => {
    // We retrieve all the command argumnts except the first 2
    const args = process.argv.slice(2);
    return args;
};
/**
 * Command Help
 */
const printCommandHelp = () => {
    const version = (0, version_1.getVersion)();
    const help = `
  ipfsregistry (version: ${version})
  
    $ registry upload <file path> <private key>    //upload a file to ipfs and store the cid to the registry smart contract.
    $ registry getallcids                          //get all cids from the registry smart contract.
    $ registry cidowner <cid>                      //get the address that uploaded a cid.
    $ registry cidtime <cid>                       //get the time a cid was uploaded.
    $ registry cidinfo <cid>                       //get the info of a cid.
    $ registry confirm <cid>                       //confirm a cid.
  
  `;
    console.log(help);
};
const args = getArgs();
if (args.length === 0) {
    printCommandHelp();
}
else if (args[0] === 'upload') {
    if (args.length !== 3) {
        printCommandHelp();
    }
    else {
        registry.registerCid(args[1], args[2]);
    }
}
else if (args[0] === 'getallcids') {
    registry.getAllCids();
}
else if (args[0] === 'cidowner') {
    if (args.length !== 2) {
        printCommandHelp();
    }
    else {
        registry.getCidOwner(args[1]);
    }
}
else if (args[0] === 'cidtime') {
    if (args.length !== 2) {
        printCommandHelp();
    }
    else {
        registry.getCidTime(args[1]);
    }
}
else if (args[0] === 'cidinfo') {
    if (args.length !== 2) {
        printCommandHelp();
    }
    else {
        registry.getCidInformation(args[1]);
    }
}
else if (args[0] === 'confirm') {
    if (args.length !== 2) {
        printCommandHelp();
    }
    else {
        registry.confirm(args[1]);
    }
}
//# sourceMappingURL=index.js.map