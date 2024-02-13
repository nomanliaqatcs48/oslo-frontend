export const mumbai = {
    chainId: '80001',
    name: 'Polygon Testnet Mumbai',
    blockExplorerUrl: 'https://mumbai.polygonscan.com ',
    rpcUrl: 'https://rpc.oslocrypto.com/',
};

export const mainnet = {
    chainId: '5',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://rpc.oslocrypto.com/',
};

export const CHAINS_CONFIG = {
    [mumbai.chainId]: mumbai,
    [mainnet.chainId]: mainnet,
};