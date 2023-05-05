import { ethers, Signer } from 'ethers';
import { Logger } from '@nestjs/common';
import { TokenService } from './token.service';
const ERC721_ABI = [
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
];
const ERC1155_ABI = [
  'function uri(uint256 _id) public view returns (string memory)',
  'function balanceOf(address account, uint256 id) public view returns (uint256)',
];

export class EthersService {
  provider: ethers.JsonRpcProvider;
  signer: Signer | null = null;
  initFinished: boolean = false;
  private _initPromise: Promise<void>;
  constructor(public rpcUrl: string, private tokenService: TokenService) {
    this._initPromise = this._init();
  }

  private async _init(): Promise<void> {
    try {
      this.initFinished = false;
      this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
      this.signer = await this.provider.getSigner();
    } catch (err) {
      Logger.warn(`account may not exist: ${err}`);
    }
    this.initFinished = true;
  }

  static async createEthersService(rpcUrl: string, tokenService: TokenService) {
    const service = new EthersService(rpcUrl, tokenService);
    await service._initPromise;
    return service;
  }

  async readNftMetadata(contractAddress: string, tokenId: string) {
    const tokenUri = await this.readNftTokenUri(contractAddress, tokenId);
    if (tokenUri) {
      return this.tokenService.fetchMetadataFromUri(tokenUri);
    }
  }
  // TODO(laizn): Find ways to determine which contract the collection used.
  async readNftTokenUri(contractAddress: string, tokenId: string) {
    Logger.debug(
      `EtherService.readNftTokenUri(${contractAddress}, ${tokenId})`,
    );

    try {
      const contract = new ethers.Contract(
        contractAddress,
        ERC1155_ABI,
        this.provider,
      );
      const tokenUri = await contract.uri(tokenId);
      Logger.log(`token read as: ${tokenUri}`);
      return tokenUri;
    } catch (err) {
      Logger.log(
        `ERC1155_ABI's uri method not exist, check contract as other methods: ${err}`,
      );
    }
    await (this._initPromise = this._init());
    try {
      const contract = new ethers.Contract(
        contractAddress,
        ERC721_ABI,
        this.provider,
      );

      // return contract.tokenOfOwnerByIndex(tokenId);
      const tokenUri = await contract.tokenURI(tokenId);
      Logger.log(`token read as: ${tokenUri}`);
      return tokenUri;
    } catch (err) {
      Logger.log(
        `ERC721_ABI's tokenURI method not exist, check contract as other methods: ${err}`,
      );
    }

    Logger.error(
      `None of supported contract used in EthersService.readNftTokenUri(${contractAddress}, ${tokenId})`,
    );
    return '';
  }
}
