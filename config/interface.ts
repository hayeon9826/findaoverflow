interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface postType {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}