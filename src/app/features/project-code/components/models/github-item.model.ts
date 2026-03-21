export interface GithubItem {
  name: string;
  type: 'file' | 'dir';
  path: string;
  url: string;
  download_url: string | null;
  children?: GithubItem[];
  expanded?: boolean;
}
