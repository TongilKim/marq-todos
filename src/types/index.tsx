export type Ttodo = {
  id: string;
  text: string;
  done: boolean;
  created: string;
  updated: string;
};

export enum ApiRequest {
  POST = "post",
  GET = "get",
  PUT = "put",
  DELETE = "delete",
}

export type Tresponse = {
  resultCode: number;
  resultMessage: string;
  result: any;
};

export type TResponseError = {
  statusText: string;
};
