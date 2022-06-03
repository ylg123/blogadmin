import React,{useState} from 'react'
import {Route} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

import '../static/css/AdminIndex.css'
import '../static/css/ArticleList.css'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

function AdminIndex(props){
  const [collapsed,setCollapsed] = useState(false)
  // 点击左侧导航栏底部展开图标按钮的回调
  const onCollapse = (collapsed)=>{
    setCollapsed(collapsed)
  }
  // 点击文章管理按钮下添加文章按钮的回调
  const handelClickArticle = (e)=>{
    if(e.key==='addArticle'){
      props.history.push('/index/addarticle')
    }else if(e.key==='articleList'){
      props.history.push('/index/list')
    }
  }
  // 点击左侧导航添加文章按钮的回调
  const handelClickAddArticle = ()=>{
    props.history.push('/index/addarticle')
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={handelClickAddArticle}>
            <Icon type="desktop" />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handelClickArticle}
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path='/index/' exact component={AddArticle}></Route>
              <Route path='/index/addarticle' exact component={AddArticle}></Route>
              <Route path='/index/list' exact component={ArticleList}></Route>
              <Route path='/index/addarticle/:id' exact component={AddArticle}></Route>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy; marscode.cloud</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex