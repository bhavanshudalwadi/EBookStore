import React, { useState } from "react";
import headerContext from "./headerContext";

const HeaderState = ({ children }) => {
    const [page, setPage] = useState("");

    return (
        <headerContext.Provider value={{page, setPage}}>
            { children }
        </headerContext.Provider>
    );
}

export default HeaderState;