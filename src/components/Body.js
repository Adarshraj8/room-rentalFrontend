import { useState,useEffect } from "react";
import RoomCard from "./RoomCard";
import Header from "./Header";
import Shimmer from "./Shimmer";

const Body = ()=>{
    
 const [listofRooms,setlistofRooms]=useState([]);
   
   useEffect(()=>{
     fetchData();
   },[]);
   
   const fetchData = async ()=>{
    try {
       const data =   await fetch("http://localhost:1000/api/room"
       );
       const json  = await data.json();
       console.log(json);
       setlistofRooms(json);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
    }
   }
   
    return listofRooms.length==0?(
    <Shimmer/>):(
        <div className="room-container">
        {
            listofRooms.map((room)=>
                <RoomCard  key ={room.id}roomdata={room}/>
            
        )  }

        </div>
    );
};

export default Body;