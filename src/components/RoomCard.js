
import { useNavigate } from "react-router-dom";
const RoomCard=(props)=>{
     const {roomdata}  = props;
      const {title,description,price,location,available,imageUrl,id}  = roomdata||{};
     const navigate=useNavigate();
     const handleClick= ()=>{
       navigate(`/room/${id}`);
     }
      return(
      <div className="room-card" onClick={handleClick}>
     <img className="room-logo" alt={`${title} logo`} src={imageUrl} />
     <div>
       <h3>{title || "room Name"}</h3>
       <h4>{description}</h4>
       <h4>{price ? `₹${price}` : "No price available"}</h4>
       <h4>{location}</h4>
       <h4>{available}</h4>
       
     </div>
     </div>
    );
};
export default RoomCard;