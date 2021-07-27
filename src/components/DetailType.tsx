import React, { useEffect } from "react";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { GET_DETAIL_INFO_REQUEST } from "../reducers/actions/restaurant";

import { AiOutlinePhone } from "react-icons/ai";
import { MdAccessTime, MdDescription } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import ImageSlide from "./ImageSlide";
import { func_tag } from "./ShowingRestaurant";
import "../css/detailtype.css";
import { RouteComponentProps } from "react-router-dom";
// import { RootState } from "../reducers";
import { RootState } from "../reducers";
function DetailType(props: RouteComponentProps): JSX.Element {
  const { name, star, foodtype, tag, DetailInfo } = useSelector(
    (state: RootState) => state.restaurant.resDetail
  );
  const query = queryString.parse(props.location.search);
  const dispatch = useDispatch();

  // const tag_arr = (restaurant.tag && restaurant.tag.split(",")) || [];
  // const trim_tag_arr = tag_arr.map((v) => v.trim());
  // restaurant = restaurant as detailinfoType;
  useEffect(() => {
    dispatch({
      type: GET_DETAIL_INFO_REQUEST,
      payload: query.name,
    });
  }, []);
  return (
    <div style={{ margin: "0 auto", width: "1100px", position: "relative" }}>
      <ImageSlide />
      <div className="detailWrap"></div>
      <div>
        <div className="detail-header">
          <div>
            <div>
              <strong>{name}</strong>
              <span className="rescountry">{foodtype}</span>
            </div>
            <div>
              <div>
                <img
                  src={
                    star === 3
                      ? "/images/star3.jpg"
                      : star === 2
                      ? "/images/star2.jpg"
                      : "/images/star1.jpg"
                  }
                  alt="star"
                  style={{
                    width: star === 3 ? "100%" : star === 2 ? "70%" : "40%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detail-main">
          <div>{tag && func_tag(tag)}</div>
          <div className="detail_main-info">
            <AiOutlinePhone
              style={{
                fontSize: "20px",
                marginRight: "12px",
              }}
              className="icon"
            />
            <div>{DetailInfo.phonenumber}</div>
          </div>
          <div className="detail_main-info">
            <GoLocation
              style={{
                fontSize: "20px",
                marginRight: "12px",
              }}
              className="icon"
            />
            <div>{DetailInfo.location}</div>
          </div>
          <div className="detail_main-info">
            <MdAccessTime
              style={{ fontSize: "20px", marginRight: "12px" }}
              className="icon"
            />
            <span className="detail_main-info-weekday">
              {DetailInfo.weekday}
            </span>
            <span>{DetailInfo.weekend}</span>
          </div>
          <div className="detail_main-info">
            <MdDescription
              style={{ fontSize: "20px", marginRight: "12px" }}
              className="icon"
            />
            <div className="detail_main-info-desc">
              {DetailInfo.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailType;
