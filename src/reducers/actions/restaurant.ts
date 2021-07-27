import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { detailRestaurant, RestaurantState, restaurantType } from "../types";

export const UPLOAD_RESTARAURANT_INFO_REQUEST =
  "UPLOAD_RESTARAURANT_INFO_REQUEST";
export const UPLOAD_RESTARAURANT_INFO_SUCCESS =
  "UPLOAD_RESTARAURANT_INFO_SUCCESS";
export const UPLOAD_RESTARAURANT_INFO_FAILURE =
  "UPLOAD_RESTARAURANT_INFO_FAILURE";

export const GET_RESTARAURANT_INFO_REQUEST = "GET_RESTARAURANT_INFO_REQUEST";
export const GET_RESTARAURANT_INFO_SUCCESS = "GET_RESTARAURANT_INFO_SUCCESS";
export const GET_RESTARAURANT_INFO_FAILURE = "GET_RESTARAURANT_INFO_FAILURE";

export const GET_DETAIL_INFO_SUCCESS = "GET_DETAIL_INFO_SUCCESS";
export const GET_DETAIL_INFO_FAILURE = "GET_DETAIL_INFO_FAILURE";
export const GET_DETAIL_INFO_REQUEST = "GET_DETAIL_INFO_REQUEST";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const SEARCH_TARGETS_REQUEST = "SEARCH_TARGETS_REQUEST";
export const SEARCH_TARGETS_SUCCESS = "SEARCH_TARGETS_SUCCESS";
export const SEARCH_TARGETS_FAILURE = "SEARCH_TARGETS_FAILURE";

export const REMOVE_IMAGE_FRONT = "REMOVE_IMAGE_FRONT";
export const REMOVE_IMAGE_FRONT_SUCCESS = "REMOVE_IMAGE_FRONT_SUCCESS";
export const REMOVE_IMAGE_FRONT_FAILURE = "REMOVE_IMAGE_FRONT_FAILURE";

export const RE_IMAGE_PATH = "RE_IMAGE_PATH";
export const RE_IMAGE_PATH_SUCCESS = "RE_IMAGE_PATH_SUCCESS";
export const RE_IMAGE_PATH_FAILURE = "RE_IMAGE_PATH_FAILURE";

export const getRestaurantInfo = createAsyncAction(
  GET_RESTARAURANT_INFO_REQUEST,
  GET_RESTARAURANT_INFO_SUCCESS,
  GET_RESTARAURANT_INFO_FAILURE
)<string, restaurantType[], AxiosError>();
export const getdetailInfo = createAsyncAction(
  GET_DETAIL_INFO_REQUEST,
  GET_DETAIL_INFO_SUCCESS,
  GET_DETAIL_INFO_FAILURE
)<string, detailRestaurant, AxiosError>();
export type uploadtest = {
  data: FormData;
};
export const uploadImage = createAsyncAction(
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE
)<string, string[], AxiosError>();
export const searchTargets = createAsyncAction(
  SEARCH_TARGETS_REQUEST,
  SEARCH_TARGETS_SUCCESS,
  SEARCH_TARGETS_FAILURE
)<string, restaurantType[], AxiosError>();

export const uploadRestaraurantInfo = createAsyncAction(
  UPLOAD_RESTARAURANT_INFO_REQUEST,
  UPLOAD_RESTARAURANT_INFO_SUCCESS,
  UPLOAD_RESTARAURANT_INFO_FAILURE
)<FormData, string, AxiosError>();

export const reImagePath = createAsyncAction(
  RE_IMAGE_PATH,
  RE_IMAGE_PATH_SUCCESS,
  RE_IMAGE_PATH_FAILURE
)<RestaurantState, string, AxiosError>();

export const removeImage = createAsyncAction(
  REMOVE_IMAGE_FRONT,
  REMOVE_IMAGE_FRONT_SUCCESS,
  REMOVE_IMAGE_FRONT_FAILURE
)<number, string, AxiosError>();
