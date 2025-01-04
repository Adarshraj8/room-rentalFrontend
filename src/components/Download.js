import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RoomOrders = ()=>{

  const [roomId,setRoomId] = useState("");
  const [orders, setOrders] = useState([]);
  const fetchOrders =async ()=>{
    if(!roomId){
        alert("Please enter a Room ID.");
        return;
    }
    try{
        const response =  await fetch(`http://localhost:1000/user/room/${roomId}`);
        if (!response.ok) {
            throw new Error("Error fetching orders.");
          }
          const data = await response.json();
          setOrders(data); 
    }
    catch (error) {
        console.error("Error fetching orders:", error);
      }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Room Orders Report - Room ID: ${roomId}`, 20, 10);

    const tableColumn = ["Order ID", "Amount", "Status", "Payment ID", "Date"];
    const tableRows = orders.map((order) => [
      order.orderId,
      order.amount,
      order.status,
      order.paymentId || "N/A",
      new Date(order.orderDate).toLocaleString(),
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`Room_${roomId}_Orders.pdf`);
  };

    return(
     <div className="download_pdf">
      <h2 className="head_pdf">Search Orders by Room ID</h2>
      <input
       type="text"
       placeholder="Enter Room ID"
       value={roomId}
       onChange={(e)=> setRoomId(e.target.value)}
      />
      <button className="btn" onClick={fetchOrders}>Fetch Orders</button>
      {orders.length>0?(
        <>
        <h3 className="order_room">Orders for Room {roomId}</h3>
        <table className="table_main" border="1">
        <thead className="table_head">
            <tr>
            <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody className="table_body">
            {orders.map((order)=>(
               <tr key={order.orderId}>
               <td>{order.orderId}</td>
               <td>{order.amount}</td>
               <td>{order.status}</td>
               <td>{order.paymentId || "N/A"}</td>
               <td>{new Date(order.orderDate).toLocaleString()}</td>
             </tr>
            )) }
        </tbody>
        </table>
        <button className="btn" onClick={generatePDF}>Download PDF</button>
        </>
      ):(
        <p>No orders found.</p>
      )}
     </div>
    );
};

export default RoomOrders;