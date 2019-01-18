# ipld-formats

> Tool to create a directory with all the configured IPLD format modules and all their versions for adding to IPFS

IPLD formats are modules that enable your IPFS node to read different types of data. 99% of the time you'll be using a format called `dag-pb`, which is the default format used by IPFS right now, but other formats exist to allow your IPFS node to read git, bitcoin, ethereum or zcash data.

Currently all of these formats are included in the browser bundle for IPFS to give your node maximum power without having to worry about configuration. However these formats can take up a significant amount of space in the bundle and as more and more formats get added this problem will become worse and worse.

This project extracts browser builds of IPLD format modules and puts them in a directory so they can be added to IPFS. The idea is that IPFS can load an IPLD format on demand from itself, so that they don't have to be included in the browser bundle - reducing it's size without losing functionality!

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
