import {
  GET_DETAIL_INFO_FAILURE,
  GET_DETAIL_INFO_REQUEST,
  GET_DETAIL_INFO_SUCCESS,
  GET_RESTARAURANT_INFO_FAILURE,
  GET_RESTARAURANT_INFO_REQUEST,
  GET_RESTARAURANT_INFO_SUCCESS,
  REMOVE_IMAGE_FRONT,
  RE_IMAGE_PATH,
  SEARCH_TARGETS_FAILURE,
  SEARCH_TARGETS_REQUEST,
  SEARCH_TARGETS_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_RESTARAURANT_INFO_FAILURE,
  UPLOAD_RESTARAURANT_INFO_REQUEST,
  UPLOAD_RESTARAURANT_INFO_SUCCESS,
} from "./actions/restaurant";
import { RestaurantAction, RestaurantState } from "./types";

export const initialState: RestaurantState = {
  restaurant: [],
  imagePaths: [],
  resDetail: {
    id: 0,
    name: "",
    star: 0,
    foodtype: "",
    tag: "",
    createdAt: "",
    updatedAt: "",

    DetailInfo: {
      description: "",
      location: "",
      phonenumber: "",
      weekday: "",
      weekend: "",
      id: 0,
      createdAt: "",
      updatedAt: "",
      RestaurantId: 0,
    },
    Images: [],
  },
};

// export default createReducer<RestaurantState, RestaurantAction>(initialState, {
//   [GET_RESTARAURANT_INFO_FAILURE]: (state) => ({
//     ...state,
//   }),
// });
export default (
  state = initialState,
  action: RestaurantAction
): RestaurantState => {
  switch (action.type) {
    case GET_RESTARAURANT_INFO_REQUEST:
    case GET_RESTARAURANT_INFO_FAILURE:
    case GET_DETAIL_INFO_REQUEST:
    case SEARCH_TARGETS_REQUEST:
    case SEARCH_TARGETS_FAILURE:
    case GET_DETAIL_INFO_FAILURE: {
      return {
        ...state,
        restaurant: [],
      };
    }
    case RE_IMAGE_PATH: {
      return {
        ...state,
        imagePaths: [],
      };
    }
    case GET_RESTARAURANT_INFO_SUCCESS:
    case SEARCH_TARGETS_SUCCESS: {
      return {
        ...state,
        restaurant: action.payload,
      };
    }
    case GET_DETAIL_INFO_SUCCESS: {
      return {
        ...state,
        resDetail: action.payload,
        // restaurant: action.data,
      };
    }

    case UPLOAD_RESTARAURANT_INFO_REQUEST:
    case UPLOAD_RESTARAURANT_INFO_FAILURE: {
      return {
        ...state,
      };
    }
    case UPLOAD_RESTARAURANT_INFO_SUCCESS: {
      return {
        ...state,

        imagePaths: [],
      };
    }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state,
      };
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        imagePaths: state.imagePaths.concat(action.payload),
      };
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state,
      };
    }
    case REMOVE_IMAGE_FRONT: {
      return {
        ...state,
        imagePaths: state.imagePaths.filter((v, i) => i !== action.payload),
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
