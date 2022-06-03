import React,{useState} from "react"
import 'antd/dist/antd.css'
import {Card,Input,Icon,Button,Spin,message} from 'antd'

import '../static/css/Login.css'

import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props){
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  // 登录按钮检查用户名密码的回调
  const checkLoading = ()=>{
    setIsLoading(true)
    if(!userName){
      message.error('用户名不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }else if(!password){
      message.error('密码不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false
    }
    let dataProps = {
      userName,
      password
    }
    axios({
      method:'post',
      url:servicePath.checkLogin,
      data:dataProps,
      withCredentials:true
    }).then(res=>{
      setIsLoading(false)
      console.log(res.data)
      if(res.data.data==='登录成功'){
        localStorage.setItem('openId',res.data.openID)
        props.history.push('/index')
      }else{
        message.error('用户名密码错误')
      }
    })
  }

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="个人技术博客系统" bordered style={{width:400}}>
          <Input 
            id="userName" 
            placeholder="enter you username" 
            size="large" 
            prefix={<Icon type="user" style={{color:"red"}}/>}
            onChange={(e)=>{setUserName(e.target.value)}}
            value={userName}
          />
          <br/><br/>
          <Input.Password 
            id="password" 
            placeholder="enter you password" 
            size="large" 
            prefix={<Icon type="key" style={{color:"green"}}/>}
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
          />
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLoading}>登录</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login