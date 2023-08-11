import React, { useState } from "react";
import alertContext from "./alertContext";

const AlertState = ({ children }) => {
    const [showAlert, setShowAlert] = useState("");
    const [showProgress, setShowProgress] = useState(false);
    const [showDialog, setShowDialog] = useState({
        message: "",
        id: -1
    })
    const [isOk, setIsOk] = useState(false);

    return (
        <alertContext.Provider value={{showAlert, setShowAlert, showDialog, setShowDialog, isOk, setIsOk, showProgress, setShowProgress}}>
            { children }
        </alertContext.Provider>
    );
}

export default AlertState;