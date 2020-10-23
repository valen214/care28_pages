


import { toBase64 } from "../../util";
import type { Product, Appointment } from "../api";
import { makeApiInfoCall, IMAGE_BASE_PATH, makeApiCall } from "../api";

type setProductsCallback = (products: Array<Product>) => void;

export async function fetchProducts(
    id: number,
    setProducts: setProductsCallback
){
  try{
    let res = await makeApiInfoCall({
      type: "query_shop",
      id,
      "products": [
        "ID",
        "name",
        "description",
        "thumbnail",
        "area",
        "estate",
        "price",
        "status",
        "lastUpdated"
      ]
    });
    let result = await res.json();
    console.log(result);

    setProducts(
      Object.values(
        result.products
      ).map(product => {
        product["id"] = parseInt(product["ID"]);
        delete product["ID"];

        if(product["thumbnail"]?.startsWith?.("http")){

        } else{
          product["thumbnail"] = IMAGE_BASE_PATH + product["thumbnail"];
        }

        return product;
      })
    );
  } catch(e){
    console.error("fetchProducts failed:", e);
  }
  return;

  setProducts([
    {
      name: "product 1",
      description: "description 1",
      thumbnail: "https://upload.wikimedia.org/wikipedia/" +
          "commons/thumb/7/78/Disneyland_Resort_Station_Platform_20130726.jpg/" +
          "800px-Disneyland_Resort_Station_Platform_20130726.jpg",
      area: "將軍澳",
      estate: "SEA TO SKY",
      price: "1020 萬",
      status: "可睇",
      lastUpdated: "2020.10.6"
    }, {
      name: "product 1",
      description: "description 1",
      thumbnail: "https://upload.wikimedia.org/wikipedia/" +
          "commons/thumb/e/ea/Hang_Hau_Station_2018_03_part4.jpg/" +
          "1920px-Hang_Hau_Station_2018_03_part4.jpg",
      area: "坑口",
      estate: "東港城",
      price: "1111 萬",
      status: "已售 (暫封盤)",
      lastUpdated: "2020.10.2"
    }
  ])
}


export async function saveProducts(
    products: Product[],
    old_products: Product[]
){
  let deleted_products_id: number[];
  if(old_products){
    let old_product_keys = old_products.map(p => p.id);
    let new_product_keys = products.map(p => p.id);
    deleted_products_id = old_product_keys.filter(
      id => !new_product_keys.includes(id)
    );
    deleted_products_id.forEach((id) => {
      
    });
  }

  let transformed_products = {};
  for(let p of products){
    transformed_products[p.id] = p;
  }
  
  let res = products.map(async p => {
    // transform local Product object to payload
    let _p: Partial<Product & { images: any[] }> = Object.assign({}, p);

    if(_p?.upload){
      let thumbnail = _p?.upload?.thumbnail;
      if(thumbnail instanceof File){
        let data: string = await toBase64(thumbnail);
        data = data.slice(data.indexOf(",")+1);
        _p.images = [{
          "name": undefined,
          "data": data,
        }];

        console.log(_p.images[0].data);
      } else {
        console.error("attempt to upload non-File object");
      }
    }

    delete _p["upload"];
    delete _p["thumbnail"];
    return _p;
  }).map(async p => {
    let _p = await p;
    return makeApiCall(
      "/wp-json/api/v2/info", {
      "type": "edit_product",
      "id": _p.id,
      "fields": _p
    });
  });
  let result = await Promise.all(res);
  console.log(result);
}

export type TSetAppointmentCallback = (appointments: Array<Appointment>) => void;
export function fetchAppointments(setAppointments: TSetAppointmentCallback){
  setAppointments([
    {
      area: "將軍澳",
      estate: "SEA TO SKY",
      rating_attitude: 5.0,
      rating_info: 4.0,
      rating_time: 4.0,
      rating_property: 4.0,
      rating_overall: 4.2,
      feedback: "nice person, gives you warm feeling",
      client_name: "abcdef",
    }, {
      area: "將軍澳",
      estate: "SEA TO SKY",
      rating_attitude: 4.2,
      rating_info: 4.2,
      rating_time: 4.2,
      rating_property: 4.2,
      rating_overall: 4.2,
      feedback: "good",
      client_name: "Terry",
    }
  ])
}



export function getShopIdFromUrl(){
  let matchResult = location.href.match(/\/shop\/(\d+)(\?|$)/);
  if(matchResult){
    return parseInt(matchResult[1]) || "";
  } else{

  }
}