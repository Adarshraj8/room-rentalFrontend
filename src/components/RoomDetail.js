
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const RoomDetail = () => {
    const navigate=useNavigate();
    const { roomId } = useParams(); // Get the room ID from the URL
    const [room, setRoom] = useState(null);

    console.log(roomId);
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const data = await fetch(`http://localhost:1000/api/room/${roomId}`);
                const json = await data.json();
                setRoom(json);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    if (!room) {
        return <div>Loading...</div>;
    }
    
     const passClickId= ()=>{
       navigate(`/pay/${roomId}`);
     }
    return (
        <div className="room-card-single">
         <img className="room-logo-single" alt={`${room.title} logo`} src={room.imageUrl} /> 
        <div className="room-detail">
            <h1>{room.title}</h1>
            <p>{room.description}</p>
            <p>RoomId : {room.id}</p>
            <p>Price: ₹{room.price}</p>
            <p>Location: {room.location}</p>
            <p>Available: {room.available===true?"Yes":"No"}</p>
            <p>
                Phone: 
                <a href={`tel:${room.phone}`}>{room.phone}</a>
            </p>
            
            <button className="btn" onClick={passClickId}>pay</button>
        </div>
        
        </div>
    );
};

export default RoomDetail;
