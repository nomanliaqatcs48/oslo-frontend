import { Wallet } from "ethers";

export function generateAccount(seedPhrase = "", index = 0) {
  let wallet;

  if (seedPhrase === "") {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }
  // If the seed phrase does not contain spaces, it is likely a mnemonic
  if (seedPhrase.includes(" ")) {
    try {
      wallet = Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`);
      debugger
    } catch (err) {
      return false;
    }
  } else {
    wallet = new Wallet(seedPhrase);
  }

  const { address } = wallet; // we are capturing address variable from 'wallet' object

  const account = {
    address,
    privateKey: wallet?.privateKey || "",
    balance: "0",
  };

  // If the seedphrase does not include spaces then it's actually a private key, so return a blank string.
  return { account, seedPhrase: seedPhrase.includes(" ") ? seedPhrase : "" };
}
