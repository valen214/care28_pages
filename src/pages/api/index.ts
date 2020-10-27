

import { REMOTE_ORIGIN, LOCAL_ORIGIN, PRODUCTION } from "./constants";



console.log(`REMOTE ORIGIN: ${REMOTE_ORIGIN}
LOCAL_ORIGIN: ${LOCAL_ORIGIN}`);

export function onDev(func: () => void){
  if(!PRODUCTION){
    func();
  }
}

export type User = {
  id?: number
  name?: string
  avatar?: string
  usertype?: "client" | "agent"
  rating?: number
  shopID?: number
};

export type Agent = {
  name?: string
  rating?: number
  area?: string
  images?: string[]
}

export type Product = {
  id?: number
  name?: string
  description?: string
  thumbnail?: string
  area?: string,
  estate?: string,
  price?: string,
  status?: string,
  lastUpdated?: string
  upload?: {
    thumbnail?: File
  }
};

export * from "./appointment_util";
export * from "./appointment";
export * from "./constants";
export * from "./rest_util";
export * from "./session";

export type { Appointment } from "./appointment";