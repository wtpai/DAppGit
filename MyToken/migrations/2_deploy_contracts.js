var MyToken = artifacts.require("MyToken");
module.exports = function(deployer) {
  // 把值100000初始化進去合約裡面
  deployer.deploy(MyToken, 100000);
};
