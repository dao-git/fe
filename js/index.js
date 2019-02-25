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
    },
    {
      constant: false,
      inputs: [
        {
          name: "_repoId",
          type: "bytes32"
        },
        {
          name: "_passingThreshold",
          type: "uint256"
        }
      ],
      name: "createRepo",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "_repoId",
          type: "bytes32"
        },
        {
          name: "_address",
          type: "address"
        }
      ],
      name: "isWhiteListed",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_repoId",
          type: "bytes32"
        },
        {
          name: "_address",
          type: "address"
        }
      ],
      name: "revokeWhitelist",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_repoId",
          type: "bytes32"
        },
        {
          name: "_address",
          type: "address"
        }
      ],
      name: "whitelist",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ],
  contract_address
);

// Get user account wallet address first
let accounts = web3.eth.getAccounts();
console.log(accounts);

let handleSendApproval = function() {
  contract.methods.approvePullRequest(repo, pr).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}

let handleSendInit = function() {
  const voteThreshold = document.getElementById("input-vote").value;
 
  contract.methods.createRepo(repo, voteThreshold).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}

let handleSendWL = function() {
  const address = document.getElementById("input-address").value;
  contract.methods.createRepo(repo, address).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}


