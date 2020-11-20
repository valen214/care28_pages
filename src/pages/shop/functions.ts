
import type { Agent, Product } from "../../api";
import { makeApiCall } from "../../api";

export async function getShopInfo(shop_id: number): Promise<[ Agent[], Product[], any[] ]> {
  
  let {
    agents,
    products,
    reports
  }: {
    agents: Agent[]
    products: Product[]
    reports: any[]
  } = await makeApiCall("/wp-json/api/v1/shop", {
    "type": "info",
    shop_id,
  }).then(res => res.json());

  products.forEach(product => {
    product["id"] = product["ID"];
    
    
    delete product["ID"];
  });


  return [ agents, products, reports ];
}