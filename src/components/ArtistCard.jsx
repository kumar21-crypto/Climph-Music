import React, { useEffect,useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {fetchArtistSaavanDetail} from '../components/Api';


const ArtistCard = ({ album,token }) => {

  const [color, setcolor] = useState("#000");
  const [artistResult, setartistResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtistSaavanDetail(token).then((res) => {
      setartistResult(res);
      
    })
  }, [])
  


  return (


    <div className='flex flex-col justify-center items-center m-2 p-2'>
    
    <div style={{
      
    }} 
    className='flex flex-col justify-center items-center  rounded-md'>
    <img
          className='w-32 h-32 rounded-full shadow-2xl cursor-pointer hover:-translate-y-1
          hover:scale-110 duration-500 hover:opacity-80'
          src={album?.image}
          loading="lazy"
          onClick={()=>{
            navigate('/artistdetail',{state:{data:artistResult}});
          }}
        />
        
      


      <p style={{
        fontSize: 15, maxLines: 1, maxWidth: 130,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginTop:5,
        color:'white'
      }}>
        {album?.title}
      </p>
    </div >

    </div>


  );
}

export default ArtistCard