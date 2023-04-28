## Frontend Test

Implement **NFTs Card** frame.

The design and the task information can be found in this [figma file](https://www.figma.com/file/CFmY7QnCK0MdkQKLjWuUGU/Frontend-Test-(Seacwos)?t=l3E1Klf9QZB90Fpf-1).

## Backend Test

Build a REST API Node.js project that parse and returns the NFT metadata for a specific token.

We ask you to build only a single endpoint, but from the implementation, we’re interested in seeing how you’re broadly thinking the problem  (scalability, e.g.) and design accordingly.

### Requirement
1. Make an endpoint to return NFT metadata (token id, toke name, token attributes) when collection address and token id are given
    1. If you’re not familiar with NFT metadata, check EIP721/EIP1155 standard. [This](https://nftschool.dev/reference/metadata-schemas/#intro-to-json-schemas) will also be helpful.
    2. You should be making a RPC call to read token metadata from NFT contract’s `tokenURI` method, parse it, and return the analyzed metadata (name, description, attributes, etc)
    3. Consider as many possible cases as you can imagine for token URI. There are basically on-chain and off-chain metadata. Basic requirement is that you should support at least 2 cases (among Decentralized storage, base64 encoded on-chain data, and HTTPS URLs)
        1. On-chain metadata includes 
            1. Decentralized storage  (e.g. IPFS hash)
                1. ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/323 (from [Azuki](https://etherscan.io/address/0xED5AF388653567Af2F388E6224dC7C4b3241C544#readContract))
            2. Base64 encoded string
                1. data:application/json;base64,eyJuYW1lIjogIkJhZyAjMiIsIC … (from [Loot](https://etherscan.io/address/0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7#readContract))
        2. Off-chain metadata can be anything starts with `http` or `https`. e.g.
            1.  https://live---metadata-5covpqijaa-uc.a.run.app/metadata/2100 (from [Moonbirds](https://etherscan.io/address/0x23581767a106ae21c074b2276D25e5C3e136a68b#readContract))
            2. https://www.miladymaker.net/milady/json/3 (from [Milady](https://etherscan.io/address/0x5Af0D9827E0c53E4799BB226655A1de152A425a5#readContract))

#### Example

Here's an example of API schema:
Request: `[GET] /metadata?collection=0xED5AF388653567Af2F388E6224dC7C4b3241C544&tokenId=323`
Response:

```json
{
  "success": true,
  "data": {
    "name": "#2100",
    "image": "https://live---metadata-5covpqijaa-uc.a.run.app/images/2100",
    "external_url": "https://www.proof.xyz/moonbirds/2100",
    "attributes": [
      {
        "trait_type": "Eyes",
        "value": "Open"
      },
      {
        "trait_type": "Headwear",
        "value": "Fire"
      },
      {
        "trait_type": "Body",
        "value": "Crescent"
      },
      {
        "trait_type": "Feathers",
        "value": "Pink"
      },
      {
        "trait_type": "Background",
        "value": "Yellow"
      },
      {
        "trait_type": "Beak",
        "value": "Long"
      }
    ],
  }
}
```

### Notes

1. Think about metadata caching, so you’re not querying the metadata again that you already queried. Use any caching method as you’re comfortable with (memory, Redis or Database)
2. Think about modularization, especially for parsing various kinds of on-chain metadata outlined above.

### Bonus points

1. Support as many kinds of metadata as you think (Basic requirement is that you should support at least 2 cases.)
2. Dockerize the code
3. Unit or E2E tests
