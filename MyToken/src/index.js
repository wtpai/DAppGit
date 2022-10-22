const App = {
    //*若App不用web3: null，則修改以下有**
    web3: null,
    account: null,
    meta: null,

    start: async function () {

        const { web3 } = this;    //**若不用web3: null則刪除

        try {
            // // get contract instance
            // const networkId = await web3.eth.net.getId();
            // const deployedNetwork = voting_artifacts.networks[networkId];
            // //換成我們新增的 Voting 合約
            // this.meta = new web3.eth.Contract(
            //     voting_artifacts.abi,
            //     deployedNetwork.address,
            // );

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

            // web3.eth.getCoinbase(function (err, account) {
            //     if (err === null) {
            //         App.account = account;
            //         alert(App.account);
            //     }
            // });

            // web3.eth.getAccounts(function (err, accounts) {
            //     web3.eth.defaultAccount = accounts[0];
            // });

            //語法ok
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];

            // web3.eth.getAccounts(function (err, accounts) {
            //     if (err != null) {
            //         alert("Error retrieving accounts.");
            //         return;
            //     }
            //     if (accounts.length == 0) {
            //         alert("No account found! Make sure the Ethereum client is configured properly.");
            //         return;
            //     }
            //     //accounts[0]是Metamask的Ganache網路的Account2
            //     this.account = accounts[0];
            //     //console.log('Account: ' + account);
            //     //web3.eth.defaultAccount = this.account;
            // });
        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    },

    //Smart contract functions
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
    // console.log("load+++++");
    if (window.ethereum) {
        // use MetaMask's provider
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn(
            "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        App.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
    }

    App.start();
});

//判斷瀏覽器是否ehterum的錢包，若無則直接連結Ganache的位址
// $(document).ready(function () {
    
//     if (window.ethereum) {
//         App.web3 = new Web3(window.ethereum);
//         window.ethereum.enable();
//     } else {
//         console.warn(
//             "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",
//         );
//         App.web3 = new Web3(
//             new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
//         )
//     }
    
//     // // New web3 provider
//     // if (window.ethereum) {
//     //     ///window.web3 = new Web3(ethereum);
        
//     //     App.web3 = new Web3(window.ethereum);
//     //     alert('2');
//     //     try {
//     //         // ask user for permission
//     //         await ethereum.enable();
//     //         // user approved permission
//     //     } catch (error) {
//     //         // user rejected permission
//     //         console.log('user rejected permission');
//     //     }
//     // }
//     // // Old web3 provider
//     // else if (window.web3) {
//     //     App.web3 = new Web3(web3.currentProvider);
//     //     // no need to ask for permission
//     // }
//     // // No web3 provider
//     // else {
//     //     App.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
//     //     //console.log('No web3 provider detected');
//     // }

//     App.start();

// });