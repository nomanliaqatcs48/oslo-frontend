import { ethers } from "ethers";
import { CHAINS_CONFIG, mumbai, mainnet } from "./Chain";

export async function sendToken(
  amount,
  from,
  to,
  privateKey
) {
  const chain = CHAINS_CONFIG[mumbai.chainId];
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);//creating a 
  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = { to, value: ethers.utils.parseEther(amount.toString()) };

  const transaction = await wallet.sendTransaction(tx);

  const receipt = await transaction.wait();

  return { transaction, receipt };
}
