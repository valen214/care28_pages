


import type { Product, Appointment } from "../api";

type setProductsCallback = (products: Array<Product>) => void;

export function fetchProducts(setProducts: setProductsCallback){

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

export type TSetAppointmentCallback = (appointments: Array<Appointment>) => void;
export function fetchAppointments(setAppointments: TSetAppointmentCallback){
  setAppointments([
    {
      client_name: "abcdef",
      area: "將軍澳",
      estate: "SEA TO SKY",
      rating_attitude: 5.0,
      rating_info: 4.0,
      rating_time: 4.0,
      rating_property: 4.0,
      rating_overall: 4.2,
      feedback: "nice person, gives you warm feeling"
    }, {
      client_name: "Terry",
      area: "將軍澳",
      estate: "SEA TO SKY",
      rating_attitude: 4.2,
      rating_info: 4.2,
      rating_time: 4.2,
      rating_property: 4.2,
      rating_overall: 4.2,
      feedback: "good"
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