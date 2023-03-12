import React, { useContext } from 'react'
import { Context } from './ContextApi';



const Sidebar = ({ childern}) => {

    
 
    return (
        // <Stack direction="row" sx={{
        //     overflowY: "auto",
        //     height: { sx: 'auto', md: '95%' },
        //     flexDirection: { md: 'column' },

        // }}>


        //     {categories.map((category) => {

        //         return (
        //             <div className='flex'>
        //             <button
        //                 className="category-btn"
        //                 onClick={() => {
        //                     setselectCategory(category.name);
        //                     navigate("/"+category.name);
        //                 }}
        //                 style={{
        //                     backgroundColor: category.name === selectCategory && Colors.sidebarSelect,
        //                     color: "white",
        //                 }}
        //                 key={category.name}
        //             >
        //                 <span style={{ color: category.name === selectCategory ? 'white' : 'black', marginRight: "15px" }}>
        //                     {category.icon}
        //                 </span>
        //                 <span style={{ color: category.name === selectCategory ? 'white' : 'black' }}>
        //                     {category.name}
        //                 </span>
        //             </button>

        //             <main>{childern}</main>
        //             </div>
        //         )

        //     })}





        // </Stack>

        <div className='flex'>
        
        </div>

    )

}



export default Sidebar