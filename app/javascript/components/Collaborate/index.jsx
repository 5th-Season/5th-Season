import React from "react";
import GridItem from "../GridItem";

const Collaborate = ({ arg }) => {
 return (
    <div className="CollabGrid">
        <GridItem
          name={"Aurora James"} 
          location={"Cleveland, OH"}
          brand={"Brother Vellies"}
          avatar={"/designers/aurora.jpeg"}
          tags={["Designer", "Creative Director"]}
        />
        <GridItem
          name={"Romeo Hunte"}
          location={"Houston, TX"}
          avatar={"/designers/romeo.jpg"}
          tags={["Designer", "Streetwear Specialist"]}
        />
        <GridItem
          name={"Carly Cushnie"}
          location={"New York City, NY"} 
          avatar={"/designers/carly.jpeg"}
          tags={["Designer", "Fashion Consultant"]}
        />
        <GridItem
          name={"LaQuan Smith"}
          location={"New Orleans, LA"} 
          avatar={"/designers/laquan.jpeg"}
          tags={["Model", "Fashion Icon"]}
        />
        <GridItem
          name={"Rihanna"} 
          location={"Los Angeles, CA"}
          avatar={"/designers/rihanna.jpeg"}
          tags={["Designer", "Musician", "Fashion Entrepreneur"]}
        />
        <GridItem
          name={"Chris Rogers"} 
          location={"New York City, NY"}
          avatar={"/designers/chris.jpeg"}
          tags={["Photographer", "Fashion Stylist"]}
        />
         <GridItem
          name={"Dapper Dan"}
          location={"Harlem, NY"} 
          avatar={"/designers/dan.jpeg"}
          tags={["Designer", "Tailor", "Fashion Consultant"]}
        />
        <GridItem
          name={"Albert"} 
          location={"New York, NY"}
          tags={["Photographer"]}
        />
        <GridItem
          name={"Albert"} 
          location={"Buffalo, NY"}
          tags={["Model", "Runway Specialist"]}
        />
    </div>
 );
};

export default Collaborate;
