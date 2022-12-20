import { Contracts } from "../src";
import {BigNumber, Erc20, Utils, Wallet} from "@ijstech/eth-wallet";
import * as Config from '../data/config';

let rpcUrl = Config.rpcUrl
let account = Config.deployer;

async function deploy() {
    let {name, symbol, operator} = Config.deploymentOptions;
    let provider = rpcUrl;
    let wallet = new Wallet(provider, account);
    let drip = new Contracts.Drip(wallet);
    let address = await drip.deploy({name, symbol});
    console.log(address);
    await drip.permit(operator);
    console.log("permit set");
}

deploy();