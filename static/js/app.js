import lottery from '../../build/bolts/Lottery.json'

const getContractInc=function(){
    console.log(lottery)
    var contractInstance = aionweb3.eth.contract(lottery.abi).at(lottery.migrations[0]['1546071477969'].address)
    return contractInstance
}
const getAccounts=function(){
    var accounts = aionweb3.eth.accounts;
    return accounts
}

const newBlockFilter= function(w3, count, timeout) {
    let blockCount = 0;
    return new Promise((resolve, reject) => {
        var filter = w3.eth.filter("latest");
        var timer = setTimeout(function () {
            filter.stopWatching(function () { });
            reject("new block filter did not respond after timeout");
        }, timeout);
        filter.watch(function (err, res) {
            blockCount++;
            if (err) reject(err);
            else if (res) {
                if (blockCount >= count) {
                    filter.stopWatching(function () { });
                    if (timer) {
                        clearTimeout(timer);
                        timer = 0;
                    }
                    resolve(res);
                }
            } else reject("new block filter failed");
        });
    });
}

export {
    getContractInc,
    getAccounts,
    newBlockFilter,
}