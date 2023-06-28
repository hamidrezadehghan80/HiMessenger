import React from "react";

const Col = ({children, className, style={}, flex, center}) => {
    return(
        <div className={className} style={
            {
                display : "flex",
                flexDirection : "column",
                flex : flex && 1,
                justifyContent : center && "center",
                ...style
            }
        }>
            {children}
        </div>
    )
}

export default Col