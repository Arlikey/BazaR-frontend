export type ReviewPhoto = {
  id: string;
  src: string;
  alt?: string;
};

export type ReviewReply = {
  id: string;
  author: string;
  isSeller: boolean;
  text: string;
  date: string;
};

export type Review = {
  id: string;
  author: string;
  isSeller: boolean;
  sellerName: string;
  date: string;
  rating: number;
  text: string;
  pros?: string;
  cons?: string;
  photos?: ReviewPhoto[];
  likes: number;
  dislikes: number;
  replies?: ReviewReply[];
};