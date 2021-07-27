import React from "react";
import { RouteComponentProps } from "react-router-dom";
import "../css/restaurantpage.css";
import Restaurant from "../pages/Restaurant";
export const func_tag = (tag: string): string => {
  const tag_arr = tag.split(",").map((v) => v.trim());

  const hash_string = tag_arr
    .filter((v) => v)
    .map((v) => "#" + v.trim())
    .join(" ");
  return hash_string;
};
function ShowingRestaurant(prop: RouteComponentProps): JSX.Element {
  return (
    <Restaurant
      history={prop.history}
      location={prop.location}
      match={prop.match}
    />
  );
}

export default ShowingRestaurant;
