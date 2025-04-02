import React from "react";

const Food = ({ dot }) => {
    const style = {
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
        width: "2%",
        height: "2%",
        position: "absolute",
        backgroundColor: "#FF5722",
        border: "1px solid #E64A19",
        borderRadius: "50%",
        boxShadow: "0 0 15px rgba(255, 87, 34, 0.7)",
        zIndex: 2,
    };

    return <div className="food" style={style} />;
};

export default Food; 