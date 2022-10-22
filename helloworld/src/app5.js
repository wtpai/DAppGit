const App = {
    web3: null,
    account: null,
    contract: null,

    start: async function () {
        const { web3 } = this;

        try {
            //以下有問題
            // const networkId = await web3.eth.net.getId();
            // $.getJSON("HelloWorld.json", function (result) {
            //     const deployedNetwork = result.networks[networkId];
            //     this.contract = new web3.eth.Contract(
            //         result.abi,
            //         deployedNetwork.address,
            //     );
            //     //this.contract = new web3.eth.Contract(result.abi, deployedNetwork.address);
            //     // alert(JSON.stringify(result.abi));
            //     // alert(JSON.stringify(deployedNetwork.address));
            // });

            var contractAddress = '0xF969C0A8969c70D1f7bf29D7a86DBEA17Cd171Ac';
            var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
            // var abi = [
            //     {
            //         "inputs": [
            //             {
            //                 "internalType": "string",
            //                 "name": "_info",
            //                 "type": "string"
            //             }
            //         ],
            //         "name": "setInfo",
            //         "outputs": [],
            //         "stateMutability": "nonpayable",
            //         "type": "function"
            //     },
            //     {
            //         "inputs": [],
            //         "name": "getInfo",
            //         "outputs": [
            //             {
            //                 "internalType": "string",
            //                 "name": "",
            //                 "type": "string"
            //             }
            //         ],
            //         "stateMutability": "view",
            //         "type": "function",
            //         "constant": true
            //     }
            // ]
            
            //contract instance
            this.contract = new web3.eth.Contract(abi, contractAddress);

            // get accounts
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];

        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    },
    registerSetInfo: async function () {
        info = $("#newInfo").val();

        //await voteForCandidate(aInBytes32).send({ from: this.account });;  
        this.contract.methods.setInfo(info).send({ from: this.account });
        // this.contract.methods.setInfo(info).send({ from: this.account }).then(function (tx) {
        //     console.log("Transaction: ", tx);
        // });
        $("#newInfo").val('');
    },
    registerGetInfo: async function () {
        App.contract.methods.getInfo().call().then(function (info) {
            console.log("info: ", info);
            document.getElementById('lastInfo').innerHTML = info;
        });
    }
}

window.App = App;

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