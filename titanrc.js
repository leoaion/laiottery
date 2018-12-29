module.exports = {
  defaultBlockchain: "aion",
  blockchains: {
    aion: {
      networks: {
        development: {
          host: "http://127.0.0.1:8545",
          defaultAccount: "0xa00a2d0d10ce8a2ea47a76fbb935405df2a12b0e2bc932f188f84b5f16da9c2c",
          password: "password"
        }
      }
    }
  }
};
