const App = {
    web3: null,
    account: null,
    contracts: null,

    start: async function () {

        const { web3 } = this;

        try {
            // 合約地址及abi從build/constracts/MyToken.json查詢
            var contractAddress = '合約地址';
            var abi = [
                //合約abi
            ];

            this.contracts = new web3.eth.Contract(
                abi,
                contractAddress
            );
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];
        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    },

    //轉移代幣
    sendCoin: async function () {
        amount = $("#amount").val();
        receiver = $("#receiver").val();

        await this.contracts.methods.transfer(receiver, amount).send({ from: this.account }).then((tx) =>
            console.log("Transaction: ", tx)
        );
        $("#amount").val('');
        $("#info").html('轉移成功')
    },

    //查詢餘額
    getBalance: async function () {

        await this.contracts.methods.getBalance().call().then((info) =>
            //document.getElementById('info').innerHTML = info
            $("#balance").html(info)
        );
    }
}

//window.App = App;

window.addEventListener("load", function () {
    // if (window.ethereum) {
    //     // use MetaMask's provider
    //     App.web3 = new Web3(window.ethereum);
    //     window.ethereum.enable(); // get permission to access accounts
    // } else {
    //     console.warn(
    //         "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    //     );
    //     App.web3 = new Web3(
    //         new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    //     );
    // }

    // 檢查瀏覽器的ethereum
    if (window.ethereum) {
        App.web3 = new Web3(window.ethereum);
        try {
            // 請求帳號存取權限
            window.ethereum.enable();
        } catch (error) {
            // User denied account access...
            console.error("User denied account access")
        }
    } else if (window.web3) {
        // 用於相容老的瀏覽器錢包外掛程式(使用window.web3)
        App.web3 = window.web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, fall back to Ganache
        App.web3 = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    App.start();
});