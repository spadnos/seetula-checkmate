export type Id = string;

export interface ItemType {
  id: Id;
  categoryId: Id | null;
  title: string;
  quantity: number;
  completed: boolean;
  private: boolean;
  category?: CategoryType;
}

export interface CategoryType {
  id: Id;
  title: string;
  checklistId: string;
}

export interface ChecklistType {
  id: Id;
  title: string;
  description: string | null;
  user?: object;
  items: ItemType[];
}
