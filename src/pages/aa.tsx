import React from "react";
import ShowingRestaurant from "../components/ShowingRestaurant";
import { RouteComponentProps } from "react-router-dom";

function aa({ history, location, match }: RouteComponentProps): JSX.Element {
  return (
    <ShowingRestaurant history={history} location={location} match={match} />
  );
}

export default aa;
