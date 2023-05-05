export interface ITokenReader {
  isSupport(uri: string): boolean;
  read(uri: string): Promise<any>;
}
