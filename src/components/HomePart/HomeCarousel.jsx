import React, {useContext} from 'react';
import {Swiper,SwiperSlide } from 'swiper/react';
import { Context } from '../../components/ContextApi';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation,Virtual } from "swiper";

const HomeCarousel = () => {
    const { searchResults } = useContext(Context);

    return (
        <div
            style={{
                backgroundColor: 'black'
            }}
            className='w-[100vw] h-[30vh] mt-24 overflow-hidden '>
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

                                className='w-full h-full flex justify-center items-center '>
                                <div className='w-[90%]  h-full flex flex-row justify-center items-center'>

                                    <div className='w-[40vw] h-[50vw] flex justify-center items-center'>
                                        <img
                                            className='w-[150px] h-[150px] object-cover'
                                            src={item?.image}
                                        />
                                    </div>

                                    <div className=' ml-10 h-[50%]  flex flex-col text-white justify-center'>
                                        <span className='mt-3 w-[150px]  text-lg font-bold'>{item?.title}</span>
                                        <span className='mt-2 text-md font-semibold'>{item?.subtitle}</span>
                                        <span className='mt-2'>{item?.type}</span>
                                        <button className='mt-5 bg-[#0c3f5c] w-[100px] text-sm p-2 rounded-lg font-bold'>
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