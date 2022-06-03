import React, { useState,useEffect } from 'react'
import {List,Row,Col,Modal,message,Button,Pagination} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const {confirm} = Modal

function ArticleList(props) {
  const [list,setList] = useState([])
  const [count,setCount] = useState(0)
  useEffect(()=>{
    getList()
  },[])
  
  // 获取文章列表的回调
  const getList = (page=1,pageSize=10)=>{
    axios({
      methods:'get',
      url:servicePath.getArticleList+page+'/'+pageSize,
      withDirectives:true
    }).then(res=>{
      setList(res.data.list)
      setCount(res.data.total)
    })
  }
  // 删除文章的回调
  const deleteArticleById = (id,title)=>{
    confirm({
      title:`确定要删除标题为${title}的文章么`,
      content:'如果点击ok键，文章将被永久删除',
      onOk(){
        axios({
          method:'get',
          url:servicePath.deleteArticle+id,
          withCredentials:true
        }).then(res=>{
          if(res.data.isSuccess){
            message.success('文章删除成功')
            getList()
          }
        })
      },
      onCancel(){
        message.success('文章没有变化')
      }
    })
  }
  // 修改文章的回调
  const updateArticleById = (id)=>{
    props.history.push('/index/addarticle/'+id)
  }
  // 分页器页码改变的回调
  const onChange = (page,pageSize)=>{
    getList(page,pageSize)
  }

  return ( 
    <div>
      <List header={
        <Row className='list-div'>
          <Col span={8}>
            <b>标题</b>
          </Col>
          <Col span={4}>
            <b>类别</b>
          </Col>
          <Col span={4}>
            <b>发布时间</b>
          </Col>
          <Col span={4}>
            <b>浏览量</b>
          </Col>
          <Col span={4}>
            <b>操作</b>
          </Col>
        </Row>
      }
      bordered
      dataSource={list}
      renderItem={item=>(
        <List.Item>
          <Row className='list-div'>
            <Col span={8}>
              {item.title}
            </Col>
            <Col span={4}>
              {item.typeName}
            </Col>
            <Col span={4}>
              {item.addTime}
            </Col>
            <Col span={4}>
              {item.view_count}
            </Col>
            <Col span={4}>
              <Button type='primary' size='large' onClick={()=>{updateArticleById(item.id)}}>修改</Button>&nbsp;
              <Button type='danger' size='large' onClick={()=>{deleteArticleById(item.id,item.title)}}>删除</Button>
            </Col>
          </Row>
        </List.Item>
      )}
      />
      <div className='list-pagination'>
        <Pagination size="large" total={count} showSizeChanger showQuickJumper onChange={onChange}/>
      </div>
    </div>
  )
}

export default ArticleList