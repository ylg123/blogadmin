import React, { useState,useEffect } from 'react'
import marked from 'marked'
import axios from 'axios'
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker,message} from 'antd'
import servicePath from '../config/apiUrl'
const {Option} = Select
const {TextArea} = Input

function AddArticle(props) {
  const [articleId,setArticleId] = useState(0) //文章的ID，如果是0，说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('') //文章标题
  const [articleContent,setArticleContent] = useState('') //文章内容处的markdown内容
  const [markdownContent,setMarkdownContent] = useState('预览内容') //文章预览的html内容
  const [introducemd,setIntroducemd] = useState('') //文章简介处的markdown内容
  const [introducehtml,setIntroducehtml] = useState('预览简介') //简介预览的html内容
  const [showDate,setShowDate] = useState() //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日期
  const [typeInfo,setTypeInfo] = useState([]) //文章类别
  const [selectedType,setSelectedType] = useState('文章类型') //选择的文章类别

  useEffect(()=>{
    getTypeInfo()
    // 获取参数id
    let tmpId = props.match.params.id
    if(tmpId){
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  },[])

  // marked文档配置
  marked.setOptions({
    render:marked.Renderer(),
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smartLists:true,
    smartypants:false
  })

  // 文章内容回调
  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  // 文章简介回调
  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }
  // 获取文章类型的回调
  const getTypeInfo = ()=>{
    axios({
      method:'post',
      url:servicePath.getTypeInfo,
      withCredentials:true
    }).then(res=>{
      if(res.data.data==='没有登录'){
        localStorage.removeItem('openID')
        props.history.push('/')
      }else{
        setTypeInfo(res.data.data)
      }
    })
  }
  // 选择文章类型的回调
  const seleteTypehandler = (value)=>{
    setSelectedType(value)
  }
  // 新增和修改保存文章的回调
  const saveArticle = ()=>{
    if(selectedType==='文章类型'){
      message.error('必须选择文章类型')
      return false
    }else if(!articleTitle){
      message.error('文章标题不能为空')
      return false
    }else if(!articleContent){
      message.error('文章内容不能为空')
      return false
    }else if(!introducemd){
      message.error('文章简介不能为空')
      return false
    }
    if(articleId===0&&!showDate){
      message.error('发布日期不能为空')
      return false
    }
    if(articleId!==0&&!updateDate){
      message.error('修改日期不能为空')
      return false
    }

    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace(/-/g,'/')
    dataProps.addTime = (new Date(dateText).getTime())/1000
    // 保存文章
    if(articleId===0){
      dataProps.view_count=0
      axios({
        method:'post',
        url:servicePath.addArticle,
        data:dataProps,
        withCredentials:true
      }).then(res=>{
        setArticleId(res.data.insertId)
        if(res.data.isSuccess){
          message.success('文章保存成功')
        }else{
          message.error('文章保存失败')
        }
      })
    }else{
      // 修改文章
      dataProps.id = articleId
      axios({
        method:'post',
        url:servicePath.updateArticle,
        data:dataProps,
        withCredentials:true
      }).then(res=>{
        if(res.data.isSuccess){
          message.success('文章修改成功')
        }else{
          message.error('文章修改失败')
        }
      })
    }
  }
  // 根据id得到文章信息的回调
  const getArticleById = (id)=>{
    axios({
      method:'get',
      url:servicePath.updateArticleById+id,
      withCredentials:true
    }).then(res=>{
      let articleInfo = res.data.data[0]
      setArticleTitle(articleInfo.title)
      setArticleContent(articleInfo.article_content)
      let html = marked(articleInfo.article_content)
      setMarkdownContent(html)
      setIntroducemd(articleInfo.introduce)
      let ihtml = marked(articleInfo.introduce)
      setIntroducehtml(ihtml)
      setShowDate(articleInfo.addTime)
      setSelectedType(articleInfo.typeId)
    })
  }

  return ( 
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input value={articleTitle} placeholder='博客标题' size='large' onChange={e=>{setArticleTitle(e.target.value)}}/>
            </Col>
            <Col span={4}>
              &nbsp;&nbsp;
              <Select value={selectedType} size='large' onChange={seleteTypehandler}>
                {
                  typeInfo.map((item,index)=>{
                    return (<Option value={item.Id} key={index}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea value={articleContent} className='markdown-content' rows={35} placeholder='文章内容' onChange={changeContent}></TextArea>
            </Col>
            <Col span={12}>
              <div className='show-html' dangerouslySetInnerHTML={{__html:markdownContent}}></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size='large'>暂存文章</Button>&nbsp;&nbsp;
              <Button type='primary' size='large' onClick={saveArticle}>发布文章</Button>
              <br/>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea value={introducemd} rows={4} placeholder='文章简介' onChange={changeIntroduce}></TextArea>
              <br/><br/>
              <div className='introduce-html' dangerouslySetInnerHTML={{__html:introducehtml}}></div>
            </Col>
            <Col span={12}>
              <br/>
              <div className='data-select'>
                <DatePicker placeholder='发布日期' size='middle' onChange={(_,dateString)=>{setShowDate(dateString)}}/>
              </div>
            </Col>
            <Col span={12}>
              <br/>
              <div className='data-select'>
                <DatePicker placeholder='修改日期' size='middle' onChange={(_,dateString)=>{setUpdateDate(dateString)}}/>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div> 
  )
}

export default AddArticle;