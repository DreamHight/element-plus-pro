export interface IResultItem {
  title: string;
  subTitle: string;
  icon?: string;
  backText?: string;
}

export interface IResult {
  [key: string]: IResultItem;
}