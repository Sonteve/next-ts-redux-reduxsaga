export interface Inquire {
  name: string;
  email: string;
  content: string;
}

export interface InquireSuccess {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  updateAt: string;
}
