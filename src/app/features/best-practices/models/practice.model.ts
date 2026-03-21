import { CodeExample } from './code-example.model';

export interface Practice {
  title: string;
  explanation: string;
  detail?: string; // ← add this
  code?: CodeExample;
}
