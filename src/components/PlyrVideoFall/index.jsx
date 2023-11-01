import {useEffect, useRef,useState,useCallback,useLayoutEffect} from 'react';
import styles from './index.less';
import PlyrVideoFallSingle from '../PlyrVideoFallSingle';
import PropTypes from 'prop-types'

const PlyrVideoFall=(props)=>{
  const {gap,isWork,onDelete,onEdit} = props;
  const fallRef=useRef(null)
  const [videos,setVideos] = useState([])
  useLayoutEffect(() => {
    const clientWidth=fallRef.current.clientWidth;
    const columns = _perColumnNum(fallRef.current.clientWidth);
    let itemWidth = Math.floor(clientWidth/columns);
    const videos = new Array(14);
    for (let i = 0; i < videos.length; i++) {
      videos[i] = (
        <PlyrVideoFallSingle
          key={`play${i}`}
          id={`play${i}`}
          style={{ width: itemWidth }}
          isWork={isWork}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      );
    }
    setVideos(videos);
   // 在下一个事件循环中获取元素
   setTimeout(() => {
    waitFall(videos)
  }, 0);
  // window.addEventListener('resize',()=>{
  //   console.log("aaaa",fallRef.current.clientWidth)
  //   waitFall(videos)
  // })
  // return ()=>{
  //   window.removeEventListener('resize',()=>{})
  // }
  const resizeHandler = (entries) => {
    for (const entry of entries) {
      if (entry.target === fallRef.current) {
        // 处理resize事件
        // console.log('Component resized');
        waitFall(videos)
      }
    }
  };

  const observer = new ResizeObserver(resizeHandler);
  observer.observe(fallRef.current);

  return () => {
    observer.unobserve(fallRef.current);
  };
      // waitFall(videos,fallRef.current.clientWidth,num)
  }, [fallRef]);
  // useEffect(()=>{
  //   const num = _perColumnNum(fallRef.current.clientWidth);
  //   const itemWidth = Math.floor(fallRef.current.clientWidth/num);
  //   const videos=new Array(14);
  //   for(let i=0;i<videos.length;i++){
  //     videos[i]=<PlyrVideoFallSingle 
  //     key={`play${i}`} 
  //     id={`play${i}`} 
  //     style={{width:itemWidth}} />
  //   }
  //   setVideos(videos)
  //   const item = document.getElementById(`play0`)
  // },[])

    // waitFall(videos,fallRef.current.clientWidth,num)

  const _perColumnNum=(clientWidth)=>{
    if(clientWidth>=1600) return 5;
    else if(clientWidth>=1100 && clientWidth<1600) return 4;
    else if(clientWidth>=900&&clientWidth<1100) return 3;
    else if(clientWidth>=700&&clientWidth<900) return 2;
    else return 1
  }

  const waitFall=(items)=>{
    const clientWidth=fallRef.current.clientWidth;
    const columns = _perColumnNum(fallRef.current.clientWidth);
     //首先确定列数 = 页面的宽度 / 图片的宽度
     let pageWidth = clientWidth;
     let itemWidth = Math.floor(clientWidth/columns);
     let arr = [];//定义一个数组，用来存储元素的高度
     let arrW = [];//定义一个数组，用来存储元素的距离左边的宽度
     for(let i = 0;i < items.length; i++){
        const item = document.getElementById(`play${i}`)
        item.style.width=`${itemWidth}px`;
        // item.style.height=`${Math.random(0,1)* 250}px`
         if(i < columns) {
             //满足这个条件则说明在第一行，文章里面有提到
            item.style.transform=`translate(${itemWidth*i-gap}px,0)`;
            arrW.push(itemWidth*i-gap);
            arr.push(item.offsetHeight+gap);
         }else {
             //其他行，先找出最小高度列，和索引
             //假设最小高度是第一个元素
             let minHeight = arr[0];
             let index = 0;
             for(let j = 0; j < arr.length; j++){//找出最小高度
                if(minHeight > arr[j]){
                    minHeight = arr[j];
                    index = j;
                } 
             }
             //设置下一行的第一个盒子的位置
             //top值就是最小列的高度+gap
             item.style.transform=`translate(${arrW[index]}px,${arr[index]}px)`;
             //修改最小列的高度
             //最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
             arr[index] = arr[index] + item.offsetHeight + gap;
         }
     }
  }
  return  (

    <div ref={fallRef} className={styles.container}>
      {
        videos.map((item)=>{
          return item;
        })
      }
    </div>
  )
 
}

PlyrVideoFall.propTyeps = {
  videos: PropTypes.array.isRequired,
  gap:PropTypes.number.isRequired, //瀑布流上下之间的间距
  isWork:PropTypes.bool.isRequired,
  onEdit:PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired
}

PlyrVideoFall.defaultProps = {
  videos:[],
  gap:12,
  isWork:false,
  onEdit:()=>{},
  onDelete:()=>{}
}


export default PlyrVideoFall