export type IGetMetadataResp =
  | {
      success: true;
      data: {
        name: string;
        image: string;
        external_url: string;
        attributes: {
          trait_type: string;
          value: string;
        }[];
      };
    }
  | {
      success: false;
      data: {
        message: string;
      };
    };
