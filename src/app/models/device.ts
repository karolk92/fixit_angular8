import { Condition } from './condition';
import { Category } from './category';

export interface Device {
  id?: number;
  name: string;
  condition: Condition;
  category: Category;
}
