const fm = new Fortmatic("pk_test_2886ED2326F7B9CE");
const web3 = new Web3(fm.getProvider());
const url_string = window.location.href
const url = new URL(url_string);
const pr = url.searchParams.get("pr");
const repo = url.searchParams.get("repo");
const contract_address = url.searchParams.get("contract");
const deserialized_repo = web3.utils.hexToUtf8(repo);
document.getElementById("_repoId").innerText = deserialized_repo

var contract = new web3.eth.Contract(
  [{
      constant: false,
      inputs: [{
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
      inputs: [{
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
      inputs: [{
          name: "_repoId",
          type: "bytes32"
        },
        {
          name: "_address",
          type: "address"
        }
      ],
      name: "isWhiteListed",
      outputs: [{
        name: "",
        type: "bool"
      }],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [{
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
      inputs: [{
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


let handleSendApproval = function () {
  contract.methods.approvePullRequest(repo, pr).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}

let handleSendInit = function () {
  const voteThreshold = document.getElementById("input-vote").value;
  contract.methods.createRepo(repo, voteThreshold).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}

let handleAddWhitelist = function () {
  const address = document.getElementById("input-address").value;
  contract.methods.whitelist(repo, address).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}

let handleRevokeWhitelist = function () {
  const address = document.getElementById("input-address").value;
  contract.methods.revokeWhitelist(repo, address).send({
    from: "0x0000000000000000000000000000000000000000"
  });
}