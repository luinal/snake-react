import React from "react";

const Snake = ({ snakeDots }) => {
    return (
        <>
            {snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                    width: "2%",
                    height: "2%",
                    position: "absolute",
                    backgroundColor: i === snakeDots.length - 1 ? "#4CAF50" : "#81C784",
                    border: "1px solid #388E3C",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px rgba(76, 175, 80, 0.5)",
                    transition: "all 0.1s ease",
                    zIndex: 1,
                };
                return <div className="snake-dot" key={i} style={style} />;
            })}
        </>
    );
};

export default Snake; 