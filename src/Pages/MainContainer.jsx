import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../components/Constants';
import { NavLink, useNavigate } from 'react-router-dom';
import { Colors } from '../components/Constants';
import { styled, useTheme } from '@mui/material/styles';





const MainContainer = ({ children }) => {

    const [selectcategory, setselectcategory] = useState('Home');

    return (
        <div className='flex w-full h-auto'>
            <div className='hidden fixed  md:h-[84vh] md:left-0 md:top-0 mt-[60px] text-white md:flex md:flex-col md:w-[15vw]'>

                {
                    categories.map((item) => {

                        return (
                            <NavLink to={item.path} key={item.id}>
                                <div className={`flex flex-row hover:bg-[#5b7afa] text-white
                                p-2 m-1 rounded-lg items-center mt-8
                                `+ (
                                        item.name === selectcategory ? 'bg-[#5b7afa]' : ' '
                                    )}
                                    onClick={() => {
                                        setselectcategory(item.name);
                                    }}
                                >
                                    <div>{item.icon}</div>
                                    <div className='ml-2'>{item.name}</div>
                                </div>
                            </NavLink>
                        )
                    })
                }

            </div>
            <main className='overflow-hidden h-full w-full md:flex md:justify-end'>
                {children}
            </main>
        </div>
    );


    // const [selectcategory, setselectcategory] = useState('Home');
    // return (
    //     <div className='flex h-auto w-full overflow-hidden flex-wrap'>
    //         <motion.div

    //             className='text-white h-[84vh]  lg:w-[15vw] hidden oveflow-hidden w-[10vw] mt-[60px]  fixed left-0 top-0 bg-[#181811d]
    //              md:flex'>

    //             <section className='h-screen text-white flex md:flex md:flex-col'>
    //                 {categories.map((category) => {

    //                     return (

    //                         <NavLink to={category.path} key={category.id} onClick={() => {

    //                         }}>
    //                             <div className={` flex flex-row mt-6 hover:bg-[#5b7afa] hover:text-white rounded-lg 
    //                        items-center p-2 m-1 w-fill ` + (
    //                                     category.name === selectcategory ? 'bg-[#5b7afa]' : ' '
    //                                 )}

    //                                 onClick={() => {
    //                                     setselectcategory(category.name);
    //                                 }}
    //                             >
    //                                 <div className='ml-2 text-white'>{category.icon}</div>
    //                                 <div className='ml-2 text-white md:hidden lg:flex'>{category.name}</div>
    //                             </div>
    //                         </NavLink>

    //                     )

    //                 })}
    //             </section>
    //         </motion.div>
    //         <main className='flex'>{children}</main>
    //     </div>
    // );
}

export default MainContainer