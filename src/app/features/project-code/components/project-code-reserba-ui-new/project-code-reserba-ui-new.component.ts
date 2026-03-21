import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import hljs from 'highlight.js';
import { TreeNode } from '../models/tree-node.model';

@Component({
  selector: 'app-project-code-reserba-ui-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-code-reserba-ui-new.component.html',
  styleUrl: './project-code-reserba-ui-new.component.css',
})
export class ProjectCodeReserbaUiNewComponent implements OnInit {
  readonly OWNER = 'arjayfuentes';
  readonly REPO = 'reserba';
  readonly BRANCH = 'main';

  tree: TreeNode[] = [];
  filteredTree: TreeNode[] = [];
  selectedFile: TreeNode | null = null;
  highlightedCode = '';
  rawCode = '';
  isLoadingTree = false;
  isLoadingFile = false;
  errorMessage = '';
  copied = false;
  searchQuery = '';

  private readonly IGNORED = [
    '.git',
    '.gitignore',
    '.mvn',
    '.idea',
    '.vscode',
    'target',
    'node_modules',
    '.DS_Store',
    '.angular',
    'dist',
    'package-lock.json',
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFullTree();
  }

  loadFullTree(): void {
    this.isLoadingTree = true;
    const url = `https://api.github.com/repos/${this.OWNER}/${this.REPO}/git/trees/${this.BRANCH}?recursive=1`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.tree = this.buildTree(response.tree);
        this.filteredTree = this.tree;
        this.isLoadingTree = false;
      },
      error: (err) => {
        this.errorMessage =
          err.status === 403
            ? 'GitHub API rate limit reached. Try again in a minute.'
            : 'Could not load repository. Check if the branch is "main" or "master".';
        this.isLoadingTree = false;
      },
    });
  }

  private buildTree(items: any[]): TreeNode[] {
    const root: TreeNode[] = [];
    const map = new Map<string, TreeNode>();

    const filtered = items.filter((item) => {
      const parts = item.path.split('/');
      return !parts.some((p: string) => this.IGNORED.includes(p));
    });

    filtered.sort((a, b) => {
      const aIsDir = a.type === 'tree';
      const bIsDir = b.type === 'tree';
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
      return a.path.localeCompare(b.path);
    });

    for (const item of filtered) {
      const parts = item.path.split('/');
      const name = parts[parts.length - 1];
      const parentPath = parts.slice(0, -1).join('/');
      const isRoot = parentPath === '';

      const node: TreeNode = {
        name,
        path: item.path,
        type: item.type === 'tree' ? 'folder' : 'file',
        children: [],
        expanded: isRoot,
        download_url:
          item.type === 'blob'
            ? `https://raw.githubusercontent.com/${this.OWNER}/${this.REPO}/${this.BRANCH}/${item.path}`
            : undefined,
      };

      map.set(item.path, node);

      if (isRoot) {
        root.push(node);
      } else {
        const parent = map.get(parentPath);
        if (parent) parent.children.push(node);
      }
    }

    return root;
  }

  toggleFolder(node: TreeNode): void {
    node.expanded = !node.expanded;
  }

  collapseAll(): void {
    this.collapseNodes(this.tree);
  }

  expandAll(): void {
    this.expandNodes(this.tree);
  }

  private collapseNodes(nodes: TreeNode[]): void {
    for (const node of nodes) {
      node.expanded = false;
      if (node.children.length) this.collapseNodes(node.children);
    }
  }

  private expandNodes(nodes: TreeNode[]): void {
    for (const node of nodes) {
      node.expanded = true;
      if (node.children.length) this.expandNodes(node.children);
    }
  }

  loadFile(node: TreeNode): void {
    if (node.type !== 'file' || !node.download_url) return;
    this.selectedFile = node;
    this.isLoadingFile = true;
    this.errorMessage = '';
    this.highlightedCode = '';

    this.http.get(node.download_url, { responseType: 'text' }).subscribe({
      next: (content) => {
        this.rawCode = content;
        const lang = this.detectLanguage(node.name);
        try {
          this.highlightedCode = hljs.highlight(content, { language: lang }).value;
        } catch {
          this.highlightedCode = hljs.highlightAuto(content).value;
        }
        this.isLoadingFile = false;
      },
      error: () => {
        this.errorMessage = `Could not load ${node.name}`;
        this.isLoadingFile = false;
      },
    });
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.rawCode).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredTree = this.tree;
      return;
    }
    this.filteredTree = this.filterTree(this.tree, this.searchQuery.toLowerCase());
  }

  private filterTree(nodes: TreeNode[], query: string): TreeNode[] {
    const result: TreeNode[] = [];
    for (const node of nodes) {
      if (node.type === 'folder') {
        const filteredChildren = this.filterTree(node.children, query);
        if (filteredChildren.length > 0 || node.name.toLowerCase().includes(query)) {
          result.push({ ...node, expanded: true, children: filteredChildren });
        }
      } else if (node.name.toLowerCase().includes(query)) {
        result.push(node);
      }
    }
    return result;
  }

  getFileIcon(node: TreeNode): string {
    if (node.type === 'folder') return node.expanded ? 'pi-folder-open' : 'pi-folder';
    const ext = node.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'java':
        return 'pi-file-code';
      case 'ts':
        return 'pi-file-code';
      case 'html':
        return 'pi-file-code';
      case 'css':
        return 'pi-file-code';
      case 'xml':
        return 'pi-file-code';
      case 'yml':
      case 'yaml':
        return 'pi-file-code';
      case 'json':
        return 'pi-file-code';
      case 'properties':
        return 'pi-file-code';
      case 'sql':
        return 'pi-file-code';
      case 'md':
        return 'pi-file';
      default:
        return 'pi-file';
    }
  }

  getFileIconColor(node: TreeNode): string {
    if (node.type === 'folder') return '#e3b341';
    const ext = node.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'java':
        return '#f89b29';
      case 'ts':
        return '#3178c6';
      case 'html':
        return '#e34c26';
      case 'css':
        return '#563d7c';
      case 'xml':
        return '#f16529';
      case 'yml':
      case 'yaml':
        return '#cb171e';
      case 'json':
        return '#cbcb41';
      case 'properties':
        return '#6db33f';
      case 'sql':
        return '#336791';
      case 'md':
        return '#083fa1';
      default:
        return '#6b7280';
    }
  }

  getLanguageLabel(filename: string): string {
    return this.detectLanguage(filename);
  }

  getGithubUrl(): string {
    return `https://github.com/${this.OWNER}/${this.REPO}`;
  }

  getFileGithubUrl(): string {
    if (!this.selectedFile) return '';
    return `https://github.com/${this.OWNER}/${this.REPO}/blob/${this.BRANCH}/${this.selectedFile.path}`;
  }

  private detectLanguage(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const map: Record<string, string> = {
      java: 'java',
      ts: 'typescript',
      html: 'html',
      css: 'css',
      scss: 'scss',
      xml: 'xml',
      yml: 'yaml',
      yaml: 'yaml',
      json: 'json',
      md: 'markdown',
      properties: 'properties',
      sql: 'sql',
      sh: 'bash',
      js: 'javascript',
    };
    return map[ext ?? ''] ?? 'plaintext';
  }
}
