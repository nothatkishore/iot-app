import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => 
{
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => 
    {
        getCurrentUser()
            .then((response) => 
            {
                if (response) 
                {
                    setIsLogin(true);
                    setUser(response);
                } 
                
                else 
                {
                    setIsLogin(false);
                    setUser(null);
                }
            })

            .catch((error) => 
            {
                console.log(error);
            })

            .finally(() => 
            {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLogin,
                setIsLogin,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
