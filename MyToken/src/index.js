const App = {
    web3: null,
    account: null,
    meta: null,

    start: async function () {

        const { web3 } = this;

        try {
            // 合約地址及abi從build/constracts/MyToken.json查詢
            var contractAddress = '0xa6b67a31c55Ac1Ccf9346eC43898369391D06Dac';
            var abi =
                [
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

            this.meta = new web3.eth.Contract(
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

        await this.meta.methods.transfer(receiver, amount).send({ from: this.account }).then((tx) =>
            console.log("Transaction: ", tx)
        );
        $("#amount").val('');
        $("#info").html('轉移成功')
    },

    //查詢餘額
    getBalance: async function () {

        await this.meta.methods.getBalance().call().then((info) =>
            //document.getElementById('info').innerHTML = info
            $("#balance").html(info)
        );
    }
}

//window.App = App;

window.addEventListener("load", function () {
    if (window.ethereum) {
        // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn(
            "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
        );
        App.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
    }

    App.start();
});