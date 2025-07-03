# @dropfi/xrpl-react

> React context + hook to access DropFi Wallet via `window.xrpl`

## 🚀 Features

- ✅ Auto-initializes the injected `window.xrpl` provider (extension or mobile)
- ✅ Provides `connect`, `disconnect`, `sendTransaction`, and `signMessage`
- ✅ React hook with `address`, `network`, `connectedAccounts`, and more
- ✅ Compatible with both browser extension and mobile webview injection

---

## 📦 Installation

```bash
pnpm add @dropfi/xrpl-react
```

> Requires the DropFi wallet to be injected as `window.xrpl` — via Chrome extension or React Native WebView.

---

## 🧪 Usage

```tsx
import { XrplProvider, useXrplReact } from '@dropfi/xrpl-react';

export default function App() {
  return (
    <XrplProvider>
      <SomeComponent />
    </XrplProvider>
  );
}

function SomeComponent() {
  const { address, connect, disconnect } = useXrplReact();

  return (
    <div>
      <p>Address: {address ?? 'Not connected'}</p>
      <button onClick={connect}>Connect Wallet</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

---

## 🔌 API

### `useXrplReact()`

Returns:

```ts
{
  address: string | undefined;
  wallet: string | undefined;
  isConnected: boolean;
  connect: () => Promise<string>;
  disconnect: () => Promise<void>;
  sendTransaction: (tx: any) => Promise<any>;
  signMessage: (message: string) => Promise<{ signature: string }>;
  changeNetwork: (network: string) => Promise<any>;
  connectedAccounts: string[];
  network: string;
  isConnecting: boolean;
  error: string | null;
  initialized: boolean;
}
```

---

## 🎧 Events

These are internally emitted and listened to:

- `xrpl_selectedAddress`
- `xrpl_connectedAccounts`
- `xrpl_selectedNetwork`
- `xrpl_disconnect`

---

## 🔒 Requirements

Make sure your app runs in an environment where `window.xrpl` is available. This is injected by the DropFi wallet:

- Chrome extension
- React Native mobile app via WebView

---

---

title: XRPL Transactions
description: How to use `sendTransaction` and supported XRPL transaction types in @dropfi/xrpl-react.

---

import { Highlight } from '@theme-ui/components'

# 📤 Sending XRPL Transactions

The `useXrpl` hook provided by `@dropfi/xrpl-react` includes a powerful `sendTransaction` function that allows you to send XRPL transactions directly from your React app using the connected wallet.

```tsx
const { sendTransaction } = useXrpl();
```

---

## ⚙️ Supported Transaction Types

You can send any valid XRPL transaction using `sendTransaction`. Common supported types include:

- `Payment`
- `TrustSet`
- `AccountSet`
- `OfferCreate`
- `OfferCancel`
- `NFTokenMint`
- `NFTokenBurn`
- `NFTokenCreateOffer`
- `NFTokenCancelOffer`
- `NFTokenAcceptOffer`
- `SetRegularKey`
- `SignerListSet`
- `EscrowCreate`
- `EscrowCancel`
- `EscrowFinish`
- `DepositPreauth`
- `CheckCreate`
- `CheckCash`
- `CheckCancel`
- `TicketCreate`
- `AccountDelete`
- `PaymentChannelCreate`
- `PaymentChannelFund`
- `PaymentChannelClaim`
- `AMMCreate`
- `AMMDeposit`
- `AMMWithdraw`
- `AMMVote`

_For full documentation, see the [XRPL Transaction Types](https://xrpl.org/transaction-types.html)._

---

## 💸 Example: Sending a Payment

```ts
const tx: Payment = {
  TransactionType: 'Payment',
  Account: wallet.address,
  Destination: 'rDestinationAddressHere',
  Amount: '1000000', // 1 XRP in drops
};

await sendTransaction(tx);
```

---

## 🧾 Example: NFTokenCreateOffer

```ts
const tx: NFTokenCreateOffer = {
  TransactionType: 'NFTokenCreateOffer',
  Account: nft.owner,
  NFTokenID: nft.NftId,
  Destination: 'rBrokerAccountHere',
  Flags: 0x00000001, // 1 = sell offer
};

await sendTransaction(tx);
```

---

## 🛠 Notes

- Every transaction must include the `TransactionType` and `Account` fields.
- Amounts must be specified in **drops** for XRP or as `{ currency, issuer, value }` for tokens.
- You must be connected with a valid XRPL-compatible wallet like **DropFi** to sign and submit.

> Need more examples? Check the [xrpl.org transaction explorer](https://xrpl.org/transaction-types.html) or open an issue.

## 📄 License

MIT © [Travis Delly](https://github.com/dellybro)
