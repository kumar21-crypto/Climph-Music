import React, {useContext} from 'react';
import {Swiper,SwiperSlide } from 'swiper/react';
import { Context } from '../../components/ContextApi';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation,Virtual } from "swiper";
import { useNavigate } from 'react-router-dom';

const HomeCarousel = () => {

    const { searchResults } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundColor: 'black'
            }}
            className='w-full h-[30vh] lg:h-[40vh] xl:h-[50vh] overflow-hidden  '>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
               
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, Virtual]}
                className="w-full h-full "
            >
                {
                    searchResults?.top_playlists?.map((item, index) => {

                        return (

                            <SwiperSlide key={item}
                                virtualIndex={index}

                                className='w-[90%] h-full flex justify-center items-center '>
                                <div className='w-[90%]  h-full flex flex-row justify-center items-center'>

                                    <div className='w-[40vw] h-[50vw] flex justify-center items-center'>
                                        <img
                                            className='rounded-md w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px] 2xl:w-[250px] 2xl:h-[250px] object-cover'
                                            src={item?.image}
                                        />
                                    </div>

                                    <div className=' ml-10 h-[50%]  flex flex-col text-white justify-center'>
                                        <span className='mt-3 w-[150px] lg:w-[300px] lg:mt-0 text-lg font-bold lg:text-2xl'>{item?.title}</span>
                                        <span className='mt-2 text-md lg:mt-4 font-semibold'>{item?.subtitle}</span>
                                        <span className='mt-2 lg:mt-4'>{item?.type}</span>
                                        <button 
                                        onClick={()=>{
                                            navigate('/albumdetail', { state: { data: item } });
                                        }}
                                        className='mt-5 bg-[#0c3f5c] w-[100px] lg:w-[150px] lg:p-3 lg:text-lg text-sm p-2 rounded-lg font-bold'>
                                            Play Now
                                        </button>
                                    </div>


                                </div>

                            </SwiperSlide>
                        )

                    })
                }
            </Swiper>
        </div>
    )
}

export default HomeCarousel