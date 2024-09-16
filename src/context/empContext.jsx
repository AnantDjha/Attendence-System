import { createContext, useState } from "react";

export const empContext = createContext();

export default function EmpProvider({children})
{
    const [employee,setEmployee] = useState(null)
    return (
        <empContext.Provider value = {{employee,setEmployee}}>
            {children}
        </empContext.Provider>

    )
}