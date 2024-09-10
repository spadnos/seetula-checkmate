export type Id = string;

export interface ItemType {
  id: Id;
  categoryId: Id | null;
  title: string;
  quantity: number;
  completed: boolean;
  private: boolean;
}

export interface CategoryType {
  id: Id;
  title: string;
  checklistId: string;
}
