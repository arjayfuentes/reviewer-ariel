import { Practice } from './practice.model';

export interface Section {
  title: string;
  icon: string;
  color: string;
  practices: Practice[];
  expanded?: boolean;
}
