let ipUrl = 'http://121.5.27.145:7001/admin/'

let servicePath = {
  checkLogin : ipUrl+'checklogin', //登录检查用户名和密码
  getTypeInfo : ipUrl+'gettypeinfo', //获取文章类别信息
  addArticle : ipUrl+'addarticle', //添加文章
  updateArticle : ipUrl+'updatearticle', //修改文章
  getArticleList : ipUrl+'getarticlelist/', //获取文章列表
  deleteArticle : ipUrl+'deletearticle/', //删除文章
  updateArticleById : ipUrl+'updatearticlebyid/', //修改文章
}

export default servicePath