export interface Photos {
  photos?: {
    page: number;
    pages: number;
    perpages: number;
    total: number;
    photo: Photo[];
  };
  stat?: string;
}

export interface Photo {
  farm: number;
  id: string;
  isfamily: boolean;
  isfriend: boolean;
  ispublic: boolean;
  owner: string;
  secret: string;
  server: string;
  title: string;
  url: string;
  datetaken: string;
  description: {
    _content: string;
  };
}
