

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
  phone?: string
  rating?: number
  shopID?: number
};

export type Agent = {
  id?: string | number
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
  valuation1_name?: string,
  valuation1?: string,
  valuation2_name?: string,
  valuation2?: string,
  last_transaction_date?: string,
  last_transaction_price?: string,
  block?: string,
  flat?: string,
  floor?: string,
  saleable_area?: string,
  partition?: string,
  unit_rate?: string,
  agent_remark?: string
  recent_similar_transaction?: string
  hand?: string

  
  upload?: {
    thumbnail?: File
  }
  associated_agent_id?: number | string
};

export * from "./users";
export * from "./appointment_util";
export * from "./appointment";
export * from "./constants";
export * from "./rest_util";
export * from "./session";
export * from "./posts";
