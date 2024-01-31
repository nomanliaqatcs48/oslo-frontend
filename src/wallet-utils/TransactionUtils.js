import { ethers } from "ethers";
import { CHAINS_CONFIG, mumbai, mainnet } from "./Chain";

export async function sendToken(amount, from, to, privateKey) {
  const chain = CHAINS_CONFIG[mumbai.chainId];
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl); //creating a
  const wallet = new ethers.Wallet(privateKey, provider);

  let tx;
  try {
    tx = { to, value: ethers.utils.parseEther(amount.toString()) };
  } catch (err) {
    return { receipt: { status: 2 } };
  }
  let transaction = await wallet.sendTransaction(tx);
  let receipt;
  if (transaction) {
    receipt = await transaction.wait();
  } else {
    return { receipt: { status: 2 } };
  }
  return { transaction, receipt };
}
