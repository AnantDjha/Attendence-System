import { createContext, useState } from "react";

export const adminContext = createContext();

export default function AdminProvider({children})
{
    const [admin,setAdmin] = useState(null)
    return (
        <adminContext.Provider value = {{admin,setAdmin}}>
            {children}
        </adminContext.Provider>

    )
}