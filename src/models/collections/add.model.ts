export interface AddCollectionBackendBody {
  printing_name: string;
  collection_name: string;
  group: string;
  image: File;
}

export interface AddCollectionFrontendBody {
  printingName: string;
  collectionName: string;
  group: string;
  imagePath: string;
  imageFile: File;
}

export interface AddCollectionResponse {
  id: string;
}
