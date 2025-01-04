const Shimmer = ()=>{
    return <div className="shimmer-container">
           {Array(100).fill("").map((_, index) => (
        <div className="shimmer-card" key={index}>
          <div className="shimmer-image"></div>
          <div className="shimmer-content">
            <div className="shimmer-title"></div>
            <div className="shimmer-subtitle"></div>
          </div>
        </div>
      ))}
    </div>
}

export default Shimmer;
    
