export type lottoNumProps = {
  array: number[];
  num: number;
};
function lottoNum(array: number[] | null, num: number): number[] {
  let arr = array;
  if (arr === null) arr = [];
  // if (!array || null) {
  //   var array: number[] = [];
  // }
  const n = Math.floor(Math.random() * 25) + 1;
  if (arr.length < num && arr.indexOf(n) < 0) {
    arr.push(n);
    return lottoNum(arr, num);
  } else {
    if (arr.length < num) {
      return lottoNum(arr, num);
    }
    return arr;
  }
}
export type pointTest = {
  x: number;
  y: number;
};
export function lottoArrCheck(
  arrX: number[],
  arrY: number[],
  point: pointTest[]
): void {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < arrX.length; i++) {
      for (let j = 0; j < arrY.length; j++) {
        if (i === j) break;
        if (point[i].x + 2 >= point[j].x) {
          if (point[i].x - 2 <= point[j].x) {
            if (point[i].y + 2 >= point[j].y) {
              if (point[i].y - 2 <= point[j].y) {
                point.splice(j, 1);
                const randomX = lottoNum(null, 1)[0];
                const randomY = lottoNum(null, 1)[0];
                point.splice(j, 0, { x: randomX, y: randomY });
                return lottoArrCheck(arrX, arrY, point);
              }
            }
          }
        }
      }
    }
    break;
  }
}
export function lottoCheck(): void {
  const arrY = lottoNum(null, 5);
  const arrX = lottoNum(null, 5);
  const point: pointTest[] = [];
  arrY.forEach((v, i) => {
    point.push({ x: arrX[i], y: v });
  });
  // for (let pp in (arrX, arrY)) {
  //   point.push({ x: arrX[pp], y: arrY[pp] });
  // }
  lottoArrCheck(arrX, arrY, point);
}
lottoCheck();
