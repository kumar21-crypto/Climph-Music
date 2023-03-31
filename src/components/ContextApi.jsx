import React,{createContext,useState,useEffect} from "react";
import {fetchDataFromApi} from '../components/Api'

export const Context = createContext();

const delay = (ms) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

export const AppContext = (props) =>{

    const [loading, setloading] = useState(false);
    const [searchResults, setsearchResults] = useState(false);
    const [selectCategory, setselectCategory] = useState('Home');
    const [mobileMenu, setmobileMenu] = useState(false);

    useEffect(() => {
      fetchSelectQueryData(selectCategory)
    }, [selectCategory]);

    const fetchSelectQueryData = (query) =>{
        fetchDataFromApi(`${query}`).then((res)=>{
            // console.log(res);
            setsearchResults(res);
            setloading(true);
        })
    }

    return (
        
        <Context.Provider value={{
            loading,
            setloading,
            searchResults,
            setsearchResults,
            selectCategory,
            setselectCategory,
            mobileMenu,
            setmobileMenu
        }}>
            {props.children}
        </Context.Provider>
    )
    
}
