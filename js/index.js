let fm = new Fortmatic("pk_test_2886ED2326F7B9CE");
let web3 = new Web3(fm.getProvider());
var url_string = window.location.href
var url = new URL(url_string);
var pr = url.searchParams.get("pr");
var repo = url.searchParams.get("repo");
var contract_address = url.searchParams.get("contract");
var deserialized_repo = web3.utils.hexToUtf8(repo);
console.log(pr);
console.log(repo);
console.log(deserialized_repo);
console.log(contract_address);
document.getElementById("_repoId").innerText = deserialized_repo
document.getElementById("_pullRequestId").innerText = pr

var contract = new web3.eth.Contract(
  [
    {
      constant: false,
      inputs: [
        {
          name: "_repoId",
          type: "bytes32"
        },
        {
          name: "_pullRequestId",
          type: "uint256"
        }
      ],
      name: "approvePullRequest",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  contract_address
);

let handleSendApproval = function() {
  contract.methods.approvePullRequest(repo, pr).send({
    from: accounts[0]
  });
}

let handleSendInit = function() {
  contract.methods.createRepo(repo, pr).send({
    from: accounts[0]
  });
}

document.getElementById("btn-send").onclick = function() {
  handleSendApproval(repo, pr);
};

document.getElementById("btn-init").onclick = function() {
  const voteThreshold = document.getElementById("input-vote");
  handleSendInit(repo, voteThreshold);
};