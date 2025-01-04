import { useState } from "react";
const Aichartbot=()=>{
    const [inputText,setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    const API_KEY = "AIzaSyBFLw6kLl13WrYAWEjFG9gm5sWpT5YyrYo";
    
    const sendMessage =async()=>{
             if(!inputText)
                return;

       const userMessage ={sender:"User",text:inputText};
       sendMessage([...messages,userMessage]);
       try{
          const response = await fetch(`${API_URL}?key=${API_KEY}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                contents: [{ parts: [{ text: inputText }] }],
            }),
          });
           const  data= await response.json();
           const bot = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
           setMessages([...messages, userMessage, { sender: "AI", text: botReply }]);
       }
       catch(error){
        console.error("Error fetching response:", error);
        setMessages([...messages, { sender: "AI", text: "Error: Unable to fetch response." }]);
       }
       setInputText("");
    };

    
    return(
    <div>
        <h3>ChatBot</h3>
        <input
        type="text"
         value={inputText}
         onChange={(e)=> setInputText(e.target.value)}
         placeholder="Type your message..."
        style={{ width: "80%", padding: "10px" }}
        />
        <button onClick={sendMessage}>send</button>
        
    </div>
    )
}

export default Aichartbot;