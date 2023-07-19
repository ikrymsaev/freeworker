export interface ISubItem {
  title: string;
}

export interface IItem extends ISubItem {
  icon: string;
  subItems?: ISubItem[];
}
