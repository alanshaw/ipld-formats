# libp2p-formats

> Tool to create a directory with all the configured IPLD format modules and all their versions for adding to IPFS

## Usage

1. Clone this repo
1. Install dependencies `npm i`
1. Add/edit the modules you want to include in the file `formats.json`
1. Install any new/missing modules
    ```sh
    npm run update # outputs to the `dist` folder
    ```
    Example output:
    ```
    dist
    ├── ipld-bitcoin@0.1.2
    │   ├── index.js
    │   ├── index.js.map
    │   └── index.min.js
    ├── ipld-bitcoin@0.1.3
    │   ├── index.js
    │   ├── index.js.map
    │   └── index.min.js
    ├── ipld-zcash@0.1.2
    │   ├── index.js
    │   ├── index.js.map
    │   └── index.min.js
    ├── ipld-zcash@0.1.3
    │   ├── index.js
    │   ├── index.js.map
    │   └── index.min.js
    ├── ipld-zcash@0.1.4
    │   ├── index.js
    │   ├── index.js.map
    │   └── index.min.js
    ├── ipld-zcash@0.1.5
    │   ├── index.js
    │   ├── index.js.map
    │   └── index.min.js
    └── ipld-zcash@0.1.6
        ├── index.js
        ├── index.js.map
        └── index.min.js
    ```
1. Deploy to IPFS (Basically: `jsipfs add -r dist`)
    ```sh
    npm run deploy
    ```
1. Now pin the last hash to IPFS using pinbot or whatever
1. You can now `ipfs.cat('/ipfs/QmHash/ipld-bitcoin@0.1.2/index.min.js')` or include `https://ipfs.io/ipfs/QmHash/ipld-bitcoin@0.1.2/index.min.js` on your web page.
