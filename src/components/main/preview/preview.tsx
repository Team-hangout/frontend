import React, { useEffect, useState } from 'react';
import './preview.scss';
import { useQuery } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import HeartOn from '@/assets/image/HeartOn.png'
import View from '@/assets/image/detailView.png'
import Heart from '@/assets/image/detailHeart.png'
import Comment from '@/assets/image/detailcomment.png'

import { useNavigate } from 'react-router-dom';
import { PostType } from '@/types/post';
import axios from 'axios';


const Preview = (data:any) => {//url을 받는 코드로 변경
  const navigate = useNavigate();
  const [listData, setListData] = useState<PostType[]|undefined>()

  useEffect(()=>{
    const PostListData =async () => {
      try{
        const response = await axios.get('http://localhost:8080/api/v1/post/all/0',{headers:{Authorization: `Bearer ${localStorage.getItem('accessToken')}`,'Access-Control-Allow-Origin': '*'}})
        const responseData:PostType[] = response.data.data
        console.log(responseData)
        setListData(responseData);
      }catch(error){
        console.log(error)
      }
    }
    /// 여기서 처리 추가적으로 처리 가능///
    PostListData();
  },[])

  const goto = (num:number):void =>{
    const postnum = String(num)
    const queryParems = new URLSearchParams();
    queryParems.set('q',postnum);
    const queryString = queryParems.toString();
    navigate(`/detail?${queryString}`)
  }
  return (

    <div className='contentlayout'>
        <div className='gridlayout'>
          {listData?.map((datas: PostType, index:any) =>(
            <div className='content' key={index} >
              <button className='img'  onClick={() => goto(datas.id)} >
                <div className='imginfo'>
                  <div className='destination'>
                    <div className='destionationtext'>
                      {datas.travelAt}
                    </div>
                  </div>
                  <div className='heartlayout'>
                    <img src={HeartOn}></img>
                  </div>
                </div>
              </button>
              <div className='detail'>
                  78
                  <img src={View}></img>
                  7
                  <img src={Comment}></img>
                  14
                  <img src={Heart}></img>
              </div>
              <div className='postinfo'>
                 <button className='title'onClick={() => goto(datas.id)}>
                  {datas.title}
                </button>
                <div className='date'>
                  날짜
                </div>
                <div className='date'>
                  {datas.travelAge}{datas.travelGender}
                </div>
                <div className='date'>
                  {datas.travelMember}인 모집중
                </div>
              </div>
        </div>
        ))}
      </div>
    </div> 
  );
};

export default Preview;