import {useEffect,useState} from 'react'
import { trim } from '@/utils/format';
import { useModel, useSearchParams } from '@umijs/max';
import styles from './index.less';
import {theme,Flex,Space,Input} from 'antd'
import Popover from '@/components/Popover'
import Avatar from '@/components/Avatar'
import { AudioOutlined } from '@ant-design/icons';
import {userStore} from '@/store'

const { Search } = Input;

const Header = () => {
  const { name } = useModel('global');
  const [searchValue,setSearchValue] = useState('')
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {isLogin} = userStore()
  const [searchParams,setSearchParams]= useSearchParams()
  useEffect(()=>{
    const s = searchParams.get('s');
    if(!s) return ;
    console.log(s)
    setSearchValue(s)
  },[])
  const onSearch=(v)=>{
    if(!v) return;
    window.open(`/search?s=${v}`,'__blank')
  }
  const handleChange=(e)=>{
    setSearchValue(e.target.value)
  }
  return (
      <Flex 
        justify='flex-end' 
        align='center'
        className={styles.header} 
        style={{backgroundColor:colorBgContainer}}
      >
        <Search
          placeholder="搜索"
          onChange={handleChange}
          style={{
            width: 200,
          }}
          className={styles.search}
          // value={searchValue}
          value={searchValue}
          onSearch={onSearch}
        />
        <Space size={20} align='center'>
          <Popover hideButton text='消息' description='这是一条测试消息' buttonFuc={()=>console.log("aaa")} buttonText="立即登陆"></Popover>
          <Avatar name='登录' url="" ></Avatar>
        </Space>
      </Flex>
  );
};

export default Header;
