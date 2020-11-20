

import { makeApiCall } from "./rest_util";

export async function getShopInfo(shop_id: number){
  makeApiCall("/wp-json/api/v1/shop", {
    type: "info",
    shop_id,
  });
}