type stickProps = {
  x: number;
  y: number;
};

export const stick = (arr: stickProps[] = []): number[] => {
  if (arr.length === 0) {
    return [];
  }
  const test: number[] = [];
  arr.forEach((v) => {
    if (v.x <= 50) {
      if (v.y <= 50) {
        test.push(0);
      } else {
        test.push(1);
      }
    } else {
      if (v.y <= 50) {
        test.push(2);
      } else {
        test.push(3);
      }
    }
  });
  return test;
};
type restaurantTag = {
  tag: string;
};
export function func_tag(restaurant: restaurantTag): string {
  const tag_arr = restaurant.tag.split(",").map((v) => v.trim());

  const hash_string = tag_arr
    .filter((v) => v)
    .map((v) => "#" + v.trim())
    .join(" ");
  return hash_string;
}

type moveballProps = {
  x: number;
  y: number;
};
export const moveballbox = (): moveballProps[] => {
  const moveballtotal: moveballProps[] = [];
  const arrX: number[] = [];
  Array(6)
    .fill(0)
    .map(() => {
      const random = Math.floor(Math.random() * 90);
      arrX.push(random);
    });
  const arrY: number[] = [];
  const arrRandomY = [0, 100, 0, 100, 0, 100];
  let i = 0;
  arrX.map((v) => {
    if (v === 0 || v === 100) {
      const randomY = Math.floor(Math.random() * 90);
      arrY.push(randomY);
      return;
    }
    arrY.push(arrRandomY[i]);
    i++;
  });
  arrX.map((v, i) => {
    moveballtotal.push({ x: v, y: arrY[i] });
  });
  return moveballtotal;
};
