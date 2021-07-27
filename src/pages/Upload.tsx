import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE_FRONT,
  UPLOAD_RESTARAURANT_INFO_REQUEST,
  RE_IMAGE_PATH,
} from "../reducers/actions/restaurant";
import "../css/upload.css";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../reducers";
const Upload = (props: RouteComponentProps): JSX.Element => {
  const [name, setName] = useState("");
  const [star, setStar] = useState("");
  const [type, setType] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [weekday, setWeekday] = useState("");
  const [weekend, setWeekend] = useState("");
  const [descrip, setDescrip] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state: RootState) => state.restaurant);
  // const [state, setState] = useState({});
  console.log(imagePaths, "@");
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch({
      type: RE_IMAGE_PATH,
    });
  }, []);
  const onChangeImage = useCallback((e) => {
    e.preventDefault();
    const imageData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageData.append("image", f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      payload: imageData,
    });
  }, []);
  const onClickImageInput = useCallback((e) => {
    e.preventDefault();
    (imageInput.current as HTMLInputElement).click();
  }, []);
  const onSetName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onSetStar = useCallback((e) => {
    setStar(e.target.value);
  }, []);
  const onSetType = useCallback((e) => {
    setType(e.target.value);
  }, []);
  const onSetPhoneNum = useCallback((e) => {
    setPhoneNum(e.target.value);
  }, []);
  const onSetWeekday = useCallback((e) => {
    setWeekday(e.target.value);
  }, []);
  const onSetWeekend = useCallback((e) => {
    setWeekend(e.target.value);
  }, []);
  const onSetDescrip = useCallback((e) => {
    setDescrip(e.target.value);
  }, []);
  const onSetTag = useCallback((e) => {
    setTag(e.target.value);
  }, []);
  const onSetLocation = useCallback((e) => {
    setLocation(e.target.value);
  }, []);

  const onSubmit = () => {
    dispatch({
      type: UPLOAD_RESTARAURANT_INFO_REQUEST,
      payload: {
        name,
        star,
        type,
        phoneNum,
        weekday,
        weekend,
        descrip,
        imagePaths,
        tag,
        location,
      },
    });

    props.history.push("/");
  };

  const removeImage = (e: React.MouseEvent<HTMLDivElement>) => {
    // const item: HTMLElement = (e as HTMLElement);
    const target = e.target as HTMLImageElement;
    const a = target.src.slice(22);
    dispatch({
      type: REMOVE_IMAGE_FRONT,
      data: imagePaths.indexOf(a),
    });
    return axios.delete("http://localhost:8010/api/restaurant/images", {
      data: { src: a },
    });
  };
  return (
    <div className="uploadwrap">
      <form>
        <div>
          <div className="infoinput">
            <div className="infoinput_under">
              <input value={name} onChange={onSetName} required />
              <span>이름</span>
            </div>
            <div className="infoinput_under">
              <input value={star} onChange={onSetStar} required />
              <span>별 개수</span>
            </div>
          </div>
          <div className="infoinput">
            <div className="infoinput_under">
              <input value={type} onChange={onSetType} required />
              <span>업종</span>
            </div>
            <div className="infoinput_under">
              <input value={tag} onChange={onSetTag} required />{" "}
              <span>태그</span>
            </div>
          </div>
          <div className="infoinput">
            <div className="infoinput_under">
              <input value={phoneNum} onChange={onSetPhoneNum} required />{" "}
              <span>전화번호</span>
            </div>
            <div className="infoinput_under">
              <input value={location} onChange={onSetLocation} required />{" "}
              <span>위치</span>
            </div>
          </div>
          <div className="infoinput">
            <div className="infoinput_under">
              <input value={weekday} onChange={onSetWeekday} required />{" "}
              <span>평일</span>
            </div>
            <div className="infoinput_under">
              <input value={weekend} onChange={onSetWeekend} required />{" "}
              <span>주말</span>
            </div>
          </div>

          <div className="infoinput_under last">
            <textarea
              rows={8}
              value={descrip}
              onChange={onSetDescrip}
              required
            />
            <span>설명</span>
          </div>

          {/* <button type="primary" htmlType="submit"> */}
          <button type="submit" onClick={onSubmit}>
            send
          </button>
        </div>
        <div className="showimgwrap">
          <input
            type="file"
            multiple
            ref={imageInput}
            hidden
            onChange={onChangeImage}
          />
          <button onClick={onClickImageInput}>이미지 등록</button>
          <div onClick={removeImage}>
            {imagePaths.map((v, i) => (
              <div key={i}>
                <img src={`http://localhost:8010/${v}`} alt="img" />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;
