export type Id = string;

export interface ItemType {
  id: Id;
  categoryId: Id | null;
  title: string;
  quantity: number;
  completed: boolean;
  private: boolean;
  category?: CategoryType;
  checklist?: ChecklistType;
  checklistId?: Id;
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

export interface ItemGroupType {
  title: string;
  checklistId: Id;
  categoryId: Id | null;
  items: ItemType[];
}
