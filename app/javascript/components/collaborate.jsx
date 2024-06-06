import * as React from "react";
import * as ReactDOM from "react-dom";
import GridItem from "./GridItem";



const Collab = ({ arg }) => {
 return (
    <div className="CollabGrid">
        <GridItem
          name={"Aurora James"} 
          location={"Cleveland, OH"}
          brand={"Brother Vellies"}
          avatar={"/designers/aurora.jpeg"}
        />
        <GridItem
          name={"Romeo Hunte"}
          location={"Houston, TX"}
          avatar={"/designers/romeo.jpg"}
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