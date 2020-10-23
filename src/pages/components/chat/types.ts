

export enum MESSAGE_TYPE {
  LEFT      = "LEFT",
  CENTER    = "CENTER",
  RIGHT     = "RIGHT",

  OTHERS    = "OTHERS",
  SELF      = "SELF",
  SYSTEM    = "SYSTEM",
};

export type TMessage = {
  type: MESSAGE_TYPE
  text?: string
}