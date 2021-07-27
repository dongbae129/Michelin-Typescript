import { ActionType } from "typesafe-actions";
import * as actions from "./actions/restaurant";

export type RestaurantAction = ActionType<typeof actions>;

export type basic = {
  id: number;
  createdAt: string;
  updatedAt: string;
  RestaurantId: number;
};
export type imageType = basic & {
  src: string;
};

export type restaurantType = {
  id: number;
  name: string;
  star: number;
  foodtype: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  Images: imageType[];
};
export type detailinfo = basic & {
  description: string;
  location: string;
  phonenumber: string;
  weekday: string;
  weekend: string;
};
export type Upload_RestaurantInfos = {
  name: string;
  start: number;
  type: string;
  phoneNum: string;
  weekday: string;
  weekend: string;
  descrip: string;
  imagePaths: string[];
  tag: string;
  location: string;
};
export type detailRestaurant = {
  // restaurant: restaurantType;
  id: number;
  name: string;
  star: number;
  foodtype: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  DetailInfo: detailinfo;
  Images: imageType[];
};
// export type
export type RestaurantState = {
  restaurant: restaurantType[];
  // restaurant: restaurantType[] | detailRestaurant;
  imagePaths: string[];
  resDetail: detailRestaurant;
};
export type targetResult = {
  data: restaurantType[];
};
export type detailInfo = {
  data: detailRestaurant;
};
