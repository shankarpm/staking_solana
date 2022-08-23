export type StakingContract = {
  "version": "0.1.0",
  "name": "staking_contract",
  "instructions": [
    {
      "name": "performAction",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "currentStakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVaultAssociatedAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakerAssociatedAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "actionAmount",
          "type": "u64"
        },
        {
          "name": "actionToken",
          "type": "publicKey"
        },
        {
          "name": "stakeAction",
          "type": "bool"
        },
        {
          "name": "count",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stakePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolAction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolActionEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "stakeAction",
            "type": "bool"
          },
          {
            "name": "timeStamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "count",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughToken",
      "msg": "Not Enough Token"
    },
    {
      "code": 6001,
      "name": "InvalidToken",
      "msg": "Not Valid Token"
    },
    {
      "code": 6002,
      "name": "InvalidUser",
      "msg": "Not Valid User"
    },
    {
      "code": 6003,
      "name": "InvalidPoolAction",
      "msg": "Not Valid Pool Action Acccount Provided"
    }
  ]
};

export const IDL: StakingContract = {
  "version": "0.1.0",
  "name": "staking_contract",
  "instructions": [
    {
      "name": "performAction",
      "accounts": [
        {
          "name": "staker",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "currentStakingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolAction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolEntry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolCount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVaultAssociatedAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakerAssociatedAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "actionAmount",
          "type": "u64"
        },
        {
          "name": "actionToken",
          "type": "publicKey"
        },
        {
          "name": "stakeAction",
          "type": "bool"
        },
        {
          "name": "count",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "stakePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolAction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolActionEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "staker",
            "type": "publicKey"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "stakeAction",
            "type": "bool"
          },
          {
            "name": "timeStamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "count",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotEnoughToken",
      "msg": "Not Enough Token"
    },
    {
      "code": 6001,
      "name": "InvalidToken",
      "msg": "Not Valid Token"
    },
    {
      "code": 6002,
      "name": "InvalidUser",
      "msg": "Not Valid User"
    },
    {
      "code": 6003,
      "name": "InvalidPoolAction",
      "msg": "Not Valid Pool Action Acccount Provided"
    }
  ]
};
