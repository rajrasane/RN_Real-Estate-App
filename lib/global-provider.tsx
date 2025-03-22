import { createContext , ReactNode , useContext } from "react";
import { useAppwrite } from "@/lib/useAppWrite";        
import {getCurrentUser} from "@/lib/appwrite";

interface User{
    $id : string;
    name : string;
    email : string;
    avatar : string;
}

interface GlobalContextType{
    isLoggedIn : boolean;    
    user : User | null;
    loading : boolean;
    refetch : (newParams ? : Record<string, string | number>) => 
        Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children} : {children : ReactNode}) => {

    const {
        data : user,
        loading,
        refetch
    } = useAppwrite({
        fn : getCurrentUser,
    })

    const isLoggedIn = !!user;

    console.log(JSON.stringify(user,null,2));

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user: user as User | null,
            loading,
            refetch: (newParams?: Record<string, string | number>) => refetch(newParams || {})
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if(!context) throw new Error('useGlobalContext must be used within a GlobalProvider');
    return context;
}

export default GlobalProvider;