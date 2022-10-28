App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',

    init: async function () {
        return await App.initWeb3();
    },

    // 使用initWeb3函數來完成web3的初始化
    initWeb3: async function () {

        // 檢查瀏覽器的ethereum
        if (window.ethereum) {
            App.web3Provider = new Web3(window.ethereum);
            try {
                // 請求帳號存取權限
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        } else if (window.web3) {
            // 用於相容老的瀏覽器錢包外掛程式(使用window.web3)
            App.web3Provider = window.web3.currentProvider;
        }
        else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    // 進行合約初始化
    initContract: async function () {

        // 合約地址及abi從build/constracts/MyToken.json查詢
        var contractAddress = '0x48923a36e9B9779b97B7745da6F461B58fD9310c';
        var abi = [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "initialSupply",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function",
                "payable": true
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            }
        ];

        App.contracts = new web3.eth.Contract(
            abi,
            contractAddress
        );
        const accounts = await web3.eth.getAccounts();
        this.account = accounts[0];
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

$(function () {
    $(window).load(function () {
        App.init();
    });
});