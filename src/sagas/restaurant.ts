import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_RESTARAURANT_INFO_SUCCESS,
  UPLOAD_RESTARAURANT_INFO_FAILURE,
  UPLOAD_RESTARAURANT_INFO_REQUEST,
  GET_RESTARAURANT_INFO_SUCCESS,
  GET_RESTARAURANT_INFO_FAILURE,
  GET_RESTARAURANT_INFO_REQUEST,
  GET_DETAIL_INFO_REQUEST,
  GET_DETAIL_INFO_FAILURE,
  GET_DETAIL_INFO_SUCCESS,
  SEARCH_TARGETS_SUCCESS,
  SEARCH_TARGETS_FAILURE,
  SEARCH_TARGETS_REQUEST,
  searchTargets,
  getdetailInfo,
  uploadRestaraurantInfo,
} from "../reducers/actions/restaurant";
import { uploadImage } from "../reducers/actions/restaurant";
import axios from "axios";
import {
  detailinfo,
  detailInfo,
  detailRestaurant,
  restaurantType,
  targetResult,
  Upload_RestaurantInfos,
} from "../reducers/types";

async function uploadImageAPI(data: string) {
  const response = await axios.post<string[]>("/restaurant/images", data);
  return response.data;
}
function* uploadImages(action: ReturnType<typeof uploadImage.request>) {
  try {
    const result: string[] = yield call(uploadImageAPI, action.payload);
    yield put(uploadImage.success(result));
    // yield put({
    //   type: UPLOAD_IMAGES_SUCCESS,
    //   data: result.data,
    // });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}
function* watchUploadImages() {
  yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function uploadRestaurantInfoAPI(data: FormData) {
  return axios.post("/restaurant/", data);
}
function* uploadRestaurantInfos(
  action: ReturnType<typeof uploadRestaraurantInfo.request>
) {
  try {
    yield call(uploadRestaurantInfoAPI, action.payload);
    // yield put(uploadRestaraurantInfo.success(result));
    // const result = yield call(uploadRestaurantInfoAPI, action.data);
    // yield put({
    //   type: UPLOAD_RESTARAURANT_INFO_SUCCESS,
    //   // data: result.data,
    // });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_RESTARAURANT_INFO_FAILURE,
      error: e,
    });
  }
}
function* watchuploadRestaurantInfos() {
  yield takeEvery(UPLOAD_RESTARAURANT_INFO_REQUEST, uploadRestaurantInfos);
}

// function getRestaurantInfoAPI(query) {
//   return axios.get(`/restaurant/?type=${query}`);
// }
// function* getRestaurantInfos(action) {
//   try {
//     const result = yield call(getRestaurantInfoAPI, action.data);
//     yield put({
//       type: GET_RESTARAURANT_INFO_SUCCESS,
//       data: result.data,
//     });
//   } catch (e) {
//     console.error(e);
//     yield put({
//       type: GET_RESTARAURANT_INFO_FAILURE,
//       error: e,
//     });
//   }
// }
// function* watchGetRestaurantInfo() {
//   yield takeEvery(GET_RESTARAURANT_INFO_REQUEST, getRestaurantInfos);
// }

function getDetailInfoAPI(query: string) {
  return axios.get(`/restaurant/detailinfo?name=${query}`);
}
function* getDetailInfo(action: ReturnType<typeof getdetailInfo.request>) {
  try {
    const result: detailInfo = yield call(getDetailInfoAPI, action.payload);
    yield put(getdetailInfo.success(result.data));
    // yield put({
    //   type: GET_DETAIL_INFO_SUCCESS,
    //   data: result.data,
    // });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_DETAIL_INFO_FAILURE,
      error: e,
    });
  }
}
function* watchGetDetailInfo() {
  yield takeEvery(GET_DETAIL_INFO_REQUEST, getDetailInfo);
}

function searchTargetAPI(search: string) {
  return axios.get(`/restaurant/search`, {
    params: { search: encodeURIComponent(search) },
  });
}

function* searchTarget(action: ReturnType<typeof searchTargets.request>) {
  try {
    console.log(action, "****");
    const result: targetResult = yield call(searchTargetAPI, action.payload);
    console.log(result, "!@!@");
    yield put(searchTargets.success(result.data));
    // const result = yield call(searchTargetAPI, action.data);
    // yield put({
    //   type: SEARCH_TARGETS_SUCCESS,
    //   data: result.data,
    // });
  } catch (e) {
    console.error(e);
    yield put({
      type: SEARCH_TARGETS_FAILURE,
      error: e,
    });
  }
}
function* watchSearchTarget() {
  yield takeEvery(SEARCH_TARGETS_REQUEST, searchTarget);
}

export default function* restaurantSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchuploadRestaurantInfos),
    // fork(watchGetRestaurantInfo),
    fork(watchGetDetailInfo),
    fork(watchSearchTarget),
  ]);
}
