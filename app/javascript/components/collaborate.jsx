import * as React from "react";
import * as ReactDOM from "react-dom";
import GridItem from "./GridItem";



const Collab = ({ arg }) => {
 return (
    <div className="CollabGrid">
        <GridItem
          name={"Larry S"} 
          location={"Cleveland, OH"}
        />
        <GridItem
          name={"Chanel"}
          location={"Houston, TX"}
        />
        <GridItem
          name={"Albert"}
          location={"Dallas, TX"} 
        />
        <GridItem
          name={"Albert"}
          location={"New Orleans, LA"} 
        />
        <GridItem
          name={"Albert"} 
          location={"New York, NY"}
        />
        <GridItem
          name={"Albert"} 
          location={"Buffalo, NY"}
        />
         <GridItem
          name={"Albert"}
          location={"New Orleans, LA"} 
        />
        <GridItem
          name={"Albert"} 
          location={"New York, NY"}
        />
        <GridItem
          name={"Albert"} 
          location={"Buffalo, NY"}
        />
    </div>
 );
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading React")
  const rootEl = document.getElementById("collab-root");
 ReactDOM.render(<Collab />, rootEl);
});