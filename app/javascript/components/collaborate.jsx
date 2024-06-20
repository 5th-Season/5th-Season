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
          name={"Carly Cushnie"}
          location={"New York City, NY"} 
          avatar={"/designers/carly.jpeg"}
        />
        <GridItem
          name={"LaQuan Smith"}
          location={"New Orleans, LA"} 
          avatar={"/designers/laquan.jpeg"}
        />
        <GridItem
          name={"Rihanna"} 
          location={"Los Angeles, CA"}
          avatar={"/designers/rihanna.jpeg"}
        />
        <GridItem
          name={"Chris Rogers"} 
          location={"New York City, NY"}
          avatar={"/designers/chris.jpeg"}
        />
         <GridItem
          name={"Dapper Dan"}
          location={"Harlem, NY"} 
          avatar={"/designers/dan.jpeg"}
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