const HDWalletProvider = require("@truffle/hdwallet-provider");
// Moonbeam Development Node Private Key
// The official Alith account
// Public Address: 0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac
// Private Key: 0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133
const privateKeyDev =
  "5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";
// Moonbase Alpha Private Key --> Please change this to your own Private Key with funds
// NOTE: Do not store your private key in plaintext files
//       this is only for demostration purposes only
const privateKeyMoonbase =
  "13e755880a9cfda5417971a487aaef6ea4b5fc87ee3a4a47a20efe3ab846478a";

const infuraId = "60e1abccbdab4163a25a5572fb0435b8";

module.exports = {
  networks: {
    // Moonbeam Development Network
    dev: {
      provider: () => {
        if (!privateKeyDev.trim()) {
          throw new Error(
            "Please enter a private key with funds, you can use the default one",
          );
        }
        return new HDWalletProvider(privateKeyDev, "http://localhost:9933/");
      },
      network_id: 1281,
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    // Moonbase Alpha TestNet
    moonbase: {
      provider: () => {
        if (!privateKeyMoonbase.trim()) {
          throw new Error(
            "Please enter a private key with funds to send transactions to TestNet",
          );
        }
        if (privateKeyDev === privateKeyMoonbase) {
          throw new Error(
            "Please change the private key used for Moonbase to your own with funds",
          );
        }
        return new HDWalletProvider(
          privateKeyMoonbase,
          "https://rpc.api.moonbase.moonbeam.network",
        );
      },
      network_id: 1287,
    },
    moonriver: {
      provider: () => {
        if (!privateKeyMoonbase.trim()) {
          throw new Error(
            "Please enter a private key with funds to send transactions to MainNet",
          );
        }
        return new HDWalletProvider(
          privateKeyMoonbase,
          "https://rpc.moonriver.moonbeam.network",
        );
      },
      network_id: 1285,
    },
    heco: {
      provider: () => {
        if (!privateKeyDev.trim()) {
          throw new Error(
            "Please enter a private key with funds to send transactions to MainNet",
          );
        }
        return new HDWalletProvider(
          privateKeyDev,
          "https://http-mainnet.hecochain.com",
        );
      },
      network_id: 128,
    },
    avax: {
      provider: () => {
        if (!privateKeyDev.trim()) {
          throw new Error(
            "Please enter a private key with funds to send transactions to MainNet",
          );
        }
        return new HDWalletProvider(
          privateKeyDev,
          "https://api.avax.network/ext/bc/C/rpc",
        );
      },
      network_id: 43114,
    },
    rinkeby: {
      provider: () => {
        if (!privateKeyDev.trim()) {
          throw new Error(
            "Please enter a private key with funds, you can use the default one",
          );
        }
        return new HDWalletProvider(privateKeyDev, "https://rinkeby.infura.io/v3/" + infuraId);
      },
      network_id: 4,
    },
  },
  // Solidity 0.8.13 Compiler
  compilers: {
    solc: {
      version: "^0.8.13",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
  },
  // Moonbeam Truffle Plugin & Truffle Plugin for Verifying Smart Contracts
  plugins: ["moonbeam-truffle-plugin", "truffle-plugin-verify"],
};
