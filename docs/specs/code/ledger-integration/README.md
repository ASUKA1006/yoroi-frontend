# Abstract

Briefly describe the proposal

# Motivation

Why you think the proposal is necessary

# Background

Background information related to the proposal (current implementation, rationale for the implementation you will propose)

# Iteration-1

# Proposal
User will be able to:
1. Setup a new Yoroi Wallet without exposing its private key/ mnemonics in a computer.
2. Send ADA using the Ledger Nano S Wallet Security.

## Prerequisite
TBD

## Ledger Integrated Wallet Creation
TBD

## Send ADA using Trezor
1. Go to the Send Tab as usual, fill with the receiver's address and desire amount.
2. Press NEXT button and select option to sign transaction.
3. Approve the transaction on the Ledger device.

## Low Level Implementation Design

### Ledger Integrated Wallet Creation
* For a Yoroi Wallet, we need to create: `adaWallet` and `cryptoAccount` objects.<br/>
`adaWallet`     = no change on how we were using it before  
`cryptoAccount` = we need to create it manually, because to create it with rust-cardano we would need the master private key, which we don’t have. This object is created in the following way:
```
const cryptoAccount = {
  root_cached_key: 'master public key',
  derivation_scheme: 'V2',
  account: 0 // we currently only support one account in Yoroi.
};
```

* `localStorage` changes

Before:    
```
ACCOUNT = {
"account": 0,
"root_cached_key": "master public key",
"derivation_scheme": "V2"
}
```
```
LAST_BLOCK_NUMBER = "last_block_number"
```
```
WALLET = {
  "adaWallet": {
    "cwAccountsNumber": 1,
    "cwAmount": {
      "getCCoin": "1000000"
    },
    "cwId": "1",
    "cwMeta": {
      "cwAssurance": "CWANormal",
      "cwName": "TEST-ADA",
      "cwUnit": 0
    },
    "cwPassphraseLU": "2018-10-26T18:26:43+09:00"
  },
  "masterKey": "master private Key"
}
```

After:
```
ACCOUNT = {
"account": 0,
"root_cached_key": "master public key from Trezor device",
"derivation_scheme": "V2"
}
```
```
LAST_BLOCK_NUMBER = "last_block_number"
```
```
WALLET = {
  "adaWallet": {
    "cwAccountsNumber": 1,
    "cwAmount": {
      "getCCoin": "1000000"
    },
    "cwId": "1",
    "cwMeta": {
      "cwAssurance": "CWANormal",
      "cwName": "TEST-ADA",
      "cwUnit": 0
    },
    "cwType": "CWTHardware",
    "cwHardwareInfo": {
      "vendor": "trezor.io",
      "deviceId": "device id",
      "label": "device label",
      "language": "english",
      "majorVersion": 2,
      "minorVersion": 0,
      "patchVersion": 8,
      "model": "T",
      "publicMasterKey": "master public key"
    }
  }
}
```

* app/domain/Wallet.js `Wallet` changes

```
  id: string = '';
  address: string = 'current address';
new-> type : WalletType = WalletTypeOption.WEB_WALLET;
new-> hardwareInfo : ?WalletHardwareInfo;
  @observable name: string = '';
  @observable amount: BigNumber;
  @observable assurance: AssuranceModeOption;
  @observable passwordUpdateDate: ?Date;
```

```
app/types/WalletTypes.js
// @flow
export type WalletType = 'CWTWeb' | 'CWTHardware';

export type WalletHardwareInfo = {
  vendor : string,
  model: string,
  deviceId: string,
  label: string,
  majorVersion: number,
  minorVersion: number,
  patchVersion: number,
  language: string,
  publicMasterKey: string,
};
```

* other changes, we need to change following modules similar to `restoreWallet` implementation. 
```
app/action => Action for Connect to Trezor
```
```
app/store => Pass Action from View to API
```
```
app/containers => View containers(dialog)
```
```
app/components => View base components
```
```
chrome => add static files(js/html) needed for Trezor connection
```
```
chrome/manifest.[ENV].json => Add permission to allow Trezor Connect API and load static files needed for Trezor connection
```
```
scripts => change build script to move static files(js/html) needed for Trezor connection to build directory
```

* getting public key from Trezor Wallet(sequence diagram).  
![trezort-getpublickey-sequence](https://user-images.githubusercontent.com/19986226/51812399-b07f2d00-22f4-11e9-8c5f-00b673d11840.jpg)

### Send ADA using Trezor Sign Transaction
[TODO]

# Iteration-2
TBD

# Reference
1. https://github.com/trezor/connect
2. https://github.com/trezor/trezor-core
3. https://github.com/trezor/trezord-go
4. https://doc.satoshilabs.com/
