export interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children: TreeNode[];
  expanded: boolean;
  download_url?: string;
}
