import { Masa } from "@masa-finance/masa-sdk";
import { providers } from "ethers";

import { createWalletClient, custom } from "viem";
import { mainnet, celoAlfajores, celo } from "viem/chains";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getSoulNameByAddress = async (address: string, chain: any) => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const client = createWalletClient({
    account,
    chain: celoAlfajores,
    transport: custom(window.ethereum),
  });
  const chainName: any = chain?.name.toLowerCase();

  const masa = new Masa({
    signer: account,
    environment: "dev",
    networkName: chainName,
  });

  const soul = await masa.soulName.list(address);
  console.log("SOULNAME: ", soul[0].tokenDetails.sbtName);

  if (soul) {
    return soul[0].tokenDetails.sbtName;
  }

  //     const soulName = 'gabe.celo'
  //     const address = await masa.soulName.resolve(soulName);
  // console.log(addresss.address)
  //     const soul = await masa.soulName.list(address);
  //     console.log('SOULNAME: ', soul[0].tokenDetails.sbtName)

  // console.log('creating SoulName:::')
  // console.log(masa.config.signer)
  //    const createSoulNames = await masa.soulName.create('CELO', 'nonso', 1)
  //    console.log(createSoulNames)
};
