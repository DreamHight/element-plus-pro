export interface IExceptionItem {
  title: string;
  subTitle: string;
  backText?: string;
}

export interface IException {
  [key: string]: IExceptionItem;
}