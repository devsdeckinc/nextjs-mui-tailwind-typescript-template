export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: Array<string>;
  authors?: Array<string>;
  date?: string;
}