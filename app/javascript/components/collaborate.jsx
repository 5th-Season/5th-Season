import * as React from "react";
import * as ReactDOM from "react-dom";
import GridItem from "./GridItem";



const Collab = ({ arg }) => {
 return (
    <div className="CollabGrid">
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
    </div>
 );
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading React")
  const rootEl = document.getElementById("collab-root");
 ReactDOM.render(<Collab />, rootEl);
});