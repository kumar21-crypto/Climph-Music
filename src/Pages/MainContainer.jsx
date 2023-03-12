import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../components/Constants';
import { NavLink, useNavigate } from 'react-router-dom';
import { Colors } from '../components/Constants';

const MainContainer = ({children}) => {
    // const {loading, searchResults } = useContext(Context);
    // const { selectCategory, setselectCategory, mobileMenu } = useContext(Context);

    return (
        <div  className='flex h-screen w-full'>
            <motion.div
            style={{
                /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
             zIndex:1
            }}
             animate={{ width: '200px' }} className='text-white h-screen overflow-x-hidden mt-[60px] fixed left-0 top-0 bg-[#18181d]'>
            
                <section className='h-screen text-white w-full'>
                    {categories.map((category) => {

                        return(
                          
                        <NavLink  to={category.path} key={category.id} onClick={()=>{
                          
                        }}>
                          <div className=' flex flex-row mt-6 hover:bg-[#5b7afa] hover:text-white rounded-lg 
                           items-center p-2 m-1 '>
                            <div className='ml-2 text-white'>{category.icon}</div>
                            <div className='ml-2 text-white'>{category.name}</div>
                            </div>
                        </NavLink>
                        
                        )

                    })}
                </section>
            </motion.div>
            <main>{children}</main>
        </div>
    );
}

export default MainContainer