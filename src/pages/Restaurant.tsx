import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import queryString, { ParsedQuery } from "query-string";
import { useDispatch, useSelector } from "react-redux";
import {
  // GET_RESTARAURANT_INFO_REQUEST,
  SEARCH_TARGETS_REQUEST,
} from "../reducers/actions/restaurant";
import { stick, func_tag } from "./lottostick";
import "../css/restaurantball.css";
import { Link, RouteComponentProps } from "react-router-dom";
import { lottoArrCheck, pointTest } from "./lotto";
import { RootState } from "../reducers";
const Restaurant = (props: RouteComponentProps) => {
  const [boxtop, setBoxtop] = useState(false);
  const [boxopentop, setBoxopentop] = useState(false);
  const [randomtrans, setRandomtrans] = useState(false);
  const [ballmoveTest, setballMoveTest] = useState(false);
  const [opentest, setOpentest] = useState(false);
  const reftest1 = useRef<pointTest[]>([]);
  const testref = useRef(0);
  const moveballboxTestref = useRef(0);
  const moveballTestref = useRef(0);
  console.log(props, "11");
  function tesref() {
    testref.current += 1;
  }
  tesref();
  let query: ParsedQuery<string>;
  if (props.location.search) {
    query = queryString.parse(props.location.search);
  } else {
    query = queryString.parse(props.location.search);
  }
  console.log(query, "22");
  const { restaurant } = useSelector((state: RootState) => state.restaurant);

  console.log(restaurant, "%%");
  const dispatch = useDispatch();
  const lottoNum = useCallback(
    (array: number[] | null, num: number, max: number): number[] => {
      let arr = array;
      if (arr === null) arr = [];
      // if (!array || null) {
      //   var array = [];
      // }

      const n = Math.floor(Math.random() * (max - 3)) + 3;
      if (arr.length < num && arr.indexOf(n) < 0) {
        arr.push(n);
        return lottoNum(arr, num, max);
      } else {
        if (arr.length < num) {
          return lottoNum(arr, num, max);
        }
        return arr;
      }
    },
    []
  );

  const arrcheck = useCallback(
    (arrX: number[], arrY: number[], point: pointTest[]): pointTest[] => {
      lottoArrCheck(arrX, arrY, point);
      // eslint-disable-next-line no-constant-condition
      // while (true) {
      //   for (let i = 0; i < arrX.length; i++) {
      //     for (let j = 0; j < arrY.length; j++) {
      //       if (i === j) break;
      //       if (point[i].x + 2 >= point[j].x) {
      //         if (point[i].x - 2 <= point[j].x) {
      //           if (point[i].y + 2 >= point[j].y) {
      //             if (point[i].y - 2 <= point[j].y) {
      //               point.splice(j, 1);
      //               const randomX = lottoNum(null, 1, 95)[0];
      //               const randomY = lottoNum(null, 1, 88)[0];
      //               point.splice(j, 0, { x: randomX, y: randomY });
      //               return arrcheck(arrX, arrY, point);
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      //   break;
      // }

      return point;
    },
    [lottoNum]
  );
  const check = useCallback(
    (number = 0) => {
      const arrY = lottoNum(null, number, 88);
      const arrX = lottoNum(null, number, 95);
      const point: pointTest[] = [];
      arrY.forEach((v, i) => {
        point.push({ x: arrX[i], y: v });
      });
      // for (const pp in (arrX, arrY)) {
      //   point.push({ x: arrX[pp], y: arrY[pp] });
      // }
      const final = arrcheck(arrX, arrY, point);
      return final;
    },
    [arrcheck, lottoNum]
  );

  useEffect(() => {
    dispatch({
      // type: GET_RESTARAURANT_INFO_REQUEST,
      type: SEARCH_TARGETS_REQUEST,
      payload: query.type,
    });
    return () => setBoxtop(false);
  }, [query.type, dispatch]);
  useEffect(() => {
    timetest();
  }, []);

  const checkmemo = useMemo(
    () => check(restaurant.length),
    [check, restaurant.length]
  );
  reftest1.current = checkmemo;

  const timetest = () => {
    setTimeout(() => {
      randomBall();
      setRandomtrans(true);
      setballMoveTest(true);
    }, 3000);
  };

  const opentestcallback = () => {
    if (restaurant.length === 0) return;
    setTimeout(() => {
      setOpentest(true);
    }, 5000);
  };
  useEffect(() => {
    if (restaurant.length === 0) return;
    opentestcallback();
  }, []);

  const sticktest = useMemo(() => {
    return stick(reftest1.current);
  }, [reftest1.current]);
  let viewtest: number[] = [];
  const stickarrtest = sticktest;

  viewtest = [...stickarrtest];

  const moveballboxTest = useCallback(() => {
    if (restaurant.length === 0) return;
    const arrX: number[][] = [];

    Array.isArray(restaurant) &&
      restaurant.map((w, j) => {
        const arr: number[] = [];
        Array(3)
          .fill(0)
          .map((v, i) => {
            let a;
            if (i === 0) {
              a = j % 3;
              arr.push(a);
              return 0;
            }
            a = Math.floor(Math.random() * 3);
            if (i !== 0 && arr[i - 1] === a) {
              while (a === arr[i - 1]) {
                a = Math.floor(Math.random() * 3);
              }
              arr.push(a);
              return 0;
            }
            arr.push(a);
            return 0;
          });
        arrX.push(arr);
        return 0;
      });
    moveballboxTestref.current += 1;
    return arrX;
  }, [restaurant]);
  const moveballTest = useCallback(() => {
    const arrTest: pointTest[][] = [];
    const testx = moveballboxTest() || [];
    testx.map((w, i) => {
      const arrinTest: pointTest[] = [];
      const arrxT: number[] = [];
      const arryT: number[] = [];
      w.map((v, j) => {
        if (v === 0) {
          arrxT.push(0);
          const y = Math.floor(Math.random() * 89) + 1;
          arryT.push(y);
        }
        if (v === 1) {
          const x = Math.floor(Math.random() * 89) + 1;
          arrxT.push(x);
          let y;
          if (i % 2 === 0) y = 90;
          else y = 0;
          arryT.push(y);
        }
        if (v === 2) {
          arrxT.push(90);
          let y;
          if (i % 2 === 1) y = 90;
          else y = 0;
          arryT.push(y);
        }
        arrinTest.push({ x: arrxT[j], y: arryT[j] });
        return 0;
      });
      arrTest.push(arrinTest);
      return 0;
    });
    moveballTestref.current += 1;
    return arrTest;
  }, [moveballboxTest]);

  const bb = useMemo(() => moveballTest(), [restaurant]);

  const randomBall = () => {
    setBoxtop(true);
    setTimeout(() => setBoxopentop(true), 800);
  };

  type DynamicProp = {
    [key: string]: string;
  };
  const customtest: DynamicProp[] = [];
  bb.map((v) => {
    const test: DynamicProp = {};
    v.map((v, i) => {
      test[`--x${i}`] = v.x + "%";
      test[`--y${i}`] = v.y + "%";
    });
    customtest.push(test);
  });
  const moveballpoint: DynamicProp[] = [];
  reftest1.current.map((v) => {
    const test: DynamicProp = {};
    test[`--fx`] = v.x + "vw";
    test[`--fy`] = v.y + "vh";
    moveballpoint.push(test);
  });

  return (
    <div className="cubetopwrap">
      <div className={opentest ? "container hidden" : "container"}>
        <div className="cube">
          <div className={boxtop ? "cubebox boxopen1" : "cubebox"}></div>
          <div className={boxtop ? "cubebox boxopen2" : "cubebox"}></div>
          <div className={boxtop ? "cubebox boxopen3" : "cubebox"}></div>
          <div className={boxtop ? "testopenbox boxopen" : "testopenbox"}>
            <div className={boxtop ? "cubebox boxopen4" : "cubebox"}></div>
            <div
              className={
                boxtop
                  ? boxopentop
                    ? "cubebox boxopen5 boxopentop"
                    : "cubebox boxopen5"
                  : "cubebox"
              }
            ></div>
          </div>
        </div>
      </div>
      <div
        className={
          randomtrans
            ? ballmoveTest
              ? "randomtrue randomballwrap finalmove"
              : "randomtrue randomballwrap"
            : "randomballwrap"
        }
      >
        {Array.isArray(restaurant) &&
          restaurant.map((v, i) => (
            <div
              className={ballmoveTest ? "cubeinball final" : "cubeinball"}
              key={i}
              style={{ ...customtest[i], ...moveballpoint[i] }}
            >
              <div className="layer l-large l-center star-small">
                <img src="/images/small.png" alt="" />
              </div>
              <div className="layer l-large l-center star-middle">
                <img src="/images/middle.png" alt="" />
              </div>
              <div className="layer l-large l-center star-big">
                <img src="/images/big.png" alt="" />
              </div>
              <Link to={`/restaurant/detailinfo?name=${v.name}`}>
                <div>
                  <div className="circle l-center 0"></div>
                  <div className="center l-center">
                    <span className="orbit"></span>
                    <span className="orbit"></span>
                  </div>
                  <div
                    className={
                      viewtest[i] === 0
                        ? "cubeballname cubeview0"
                        : viewtest[i] === 1
                        ? "cubeballname cubeview1"
                        : viewtest[i] === 2
                        ? "cubeballname cubeview2"
                        : viewtest[i] === 3
                        ? "cubeballname cubeview3"
                        : "cubeballname"
                    }
                  >
                    <div className="cubeimgwrap">
                      <div className="cubeball_img">
                        <img
                          alt="example"
                          src={`http://localhost:8010/${v.Images[0].src}`}
                        />
                      </div>
                      <div className="resinfo_wrap">
                        <div className="res_name">
                          <h3>{v.name}</h3>
                        </div>
                        <div className="res_tag">{func_tag(v)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(Restaurant);
