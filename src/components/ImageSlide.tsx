import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "../css/imageslide.css";
import { RootState } from "../reducers";
function ImageSlide(): JSX.Element {
  const restaurant = useSelector(
    (state: RootState) => state.restaurant.resDetail.Images
  );
  const slide = useRef<HTMLUListElement>(null);
  const left_btn = useRef<HTMLImageElement>(null);
  const right_btn = useRef<HTMLImageElement>(null);

  // restaurant = restaurant as detailRestaurant;
  const slide_max_count = restaurant && Math.floor(restaurant.length / 4);
  let s_itv: NodeJS.Timeout;
  let s_count = 0;
  let s_posX = 0;
  const frame = (sign: number) => () => {
    if (s_posX === s_count * -1000) {
      clearInterval(s_itv);
    } else {
      s_posX = s_posX + sign;
      (slide.current as HTMLUListElement).style.left = s_posX + "px";
    }
  };
  const S_ani_L = () => {
    s_itv = setInterval(frame(5), 1);
  };
  const S_ani_R = () => {
    s_itv = setInterval(frame(-5), 1);
  };
  const onClickleft = () => {
    if (s_count > 0) {
      clearInterval(s_itv);
      s_count--;
      S_ani_L();
    }
    if (s_count === 0) {
      (left_btn.current as HTMLImageElement).style.visibility = "hidden";
      (right_btn.current as HTMLImageElement).style.visibility = "visible";
    } else {
      (right_btn.current as HTMLImageElement).style.visibility = "visible";
    }
  };
  const onClickright = () => {
    if (s_count < slide_max_count) {
      clearInterval(s_itv);
      s_count++;
      S_ani_R();
    }
    if (s_count === slide_max_count) {
      (right_btn.current as HTMLImageElement).style.visibility = "hidden";
      (left_btn.current as HTMLImageElement).style.visibility = "visible";
    } else {
      (left_btn.current as HTMLImageElement).style.visibility = "visible";
    }
  };

  return (
    <div id="container">
      <div className="icon leftbtn" onClick={onClickleft}>
        {restaurant && restaurant.length <= 4 ? null : (
          <img src="/images/icon-left.png" alt="left-arrow" ref={left_btn} />
        )}
      </div>
      <div id="slide">
        <ul id="slide_box" ref={slide}>
          {restaurant &&
            restaurant.map((v, i) => (
              <li key={i}>
                <img src={`http://localhost:8010/${v.src}`} alt={v.src} />
              </li>
            ))}
        </ul>
      </div>
      {restaurant && restaurant.length > 4 ? (
        <div className="icon rightbtn" onClick={onClickright}>
          <img src="/images/icon.png" alt="right-arrow" ref={right_btn} />
        </div>
      ) : null}
    </div>
  );
}

export default ImageSlide;
