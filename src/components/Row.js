import React from "react";

const Row = ({children, className, style={}, flex, center}) => {
    return(
        <div className={className} style={
            {
                display : "flex",
                flexDirection : "row",
                flex : flex && 1,
                justifyContent : center && "center",
                ...style
            }
        }>
            {children}
        </div>
    )
}

export default Row