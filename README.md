## Frontend Test

Implement **NFTs Card** frame.

The design and the task information can be found in this [figma file](https://www.figma.com/file/CFmY7QnCK0MdkQKLjWuUGU/Frontend-Test-(Seacwos)?t=l3E1Klf9QZB90Fpf-1).

##UI Features

* “Select NFT Cards” is the main frame to implement.
* “Show NFT Attributes (On Hover)” indicates the additional UI behavior, when hovered on 
circled information icon on Each NFT box.

* Users should be able to connect their wallet. Apart from these UI frames, 
* There should be an additional input box for NFT collection address
* Show “Select NFT Cards” UI frame under the collection input box. 
* It should show NFTs of the given collection that are owned by the connected user wallet
* When clicked on List icon on the right side of the toolbar, it should show the NFTs in table layout
* Use Ant design’s Table component to show NFT image, name and any other information you want to show
* When the user hovers on the circled information icon on each NFT box, it should show the following information in the given UI
NFT image 
* NFT attributes
* Current price (use dummy data only for this)
* Search ID (Search by token ID) should be functional

## Notes
* For all the data you need, use Reservoir API (we’re using this, API key is free)
* API docs: https://docs.reservoir.tools/reference/getting-started
* Only use this Reservoir API (If you use other API, we’ll not consider your test work :) )
* If you have any questions regarding the API usage, feel free to ask us
* In terms of libraries, we’re using https://ant.design/components/overview
* Styled components
* Wagmi
* RainbowKit
* Next.js 13
* ... so ideally, you should try to use as much as same libraries as we use, but if you’re not comfortable with that, that could be OK.
Feel free to choose Ethereum Mainnet or Goerli testnet to support.

##Bonus points:
* If you can implement Table layout (What’s showed on the design now is called List layout)
* If you can implement the Sweep feature (OpenSea, LooksRare, Blur and Gem all have Sweep functionality, so you should be familiar with what it is)
* UI interaction is to select the first N NFTs.
* Regarding the NFT selection status, reference the following design