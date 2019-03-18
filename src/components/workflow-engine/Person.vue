<template>
  <div class="layout">
    <Row type="flex">
      <Col span="5" class="layout-menu-left">
        <Menu active-name="personInfo" theme="dark" width="auto" :open-names="['1']" @on-select="leftMenuSelect">
          <div class="layout-logo-left">
            <h2 style="color:white;">杭州市科学协会管理系统</h2>
          </div>
          <MenuGroup title="账户与安全">
          </MenuGroup>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-person-outline" />
              账户
            </template>
            <MenuItem name="personInfo">个人信息</MenuItem>
            <MenuItem name="passwordModified">修改密码</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-cog" />
              安全
            </template>
            <MenuItem name="2-1">找回密码</MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="19">
        <Header>
          <Menu mode="horizontal" theme="light" active-name="personal" @on-select="topMenuSelect">
            <!--<div class="layout-logo">-->
            <!--<p style="color: rgba(0,0,0,1);">这里放logo</p>-->
            <!--</div>-->
            <div class="layout-nav">
              <MenuItem name="default">
                <Icon type="ios-navigate"></Icon>
                首页
              </MenuItem>
              <MenuItem name="navigate2">
                <Icon type="ios-keypad"></Icon>
                通知
              </MenuItem>
              <MenuItem name="personal">
                <Icon type="ios-person-outline" />
                个人
              </MenuItem>
              <MenuItem name="logout" >
                <Icon type="ios-redo" />
                退出登录
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem href="/default">{{one_nav}}</BreadcrumbItem>
            <BreadcrumbItem href="#">{{two_nav}}</BreadcrumbItem>
            <BreadcrumbItem>{{three_nav}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <template id="personInfo"></template>
            <template id="passwordChange"></template>
            <component :is="currentView"></component>
          </div>
        </div>
      </Col>
      <div class="foot">
        <component :is="foot"></component>
      </div>
    </Row>

  </div>

</template>
<script>
  import Button from 'iview/src/components/button/button'
  import foot from './Foot.vue'
  import personInfo from './PersonInfo'
  import passwordChange from './PasswordChange'


  export default {
    name: 'DefaultView',
    data () {
      return {
        one_nav: '主页',
        two_nav: '>',
        three_nav: '个人信息',
        currentView: 'personInfo',
        foot: 'foot'
      }
    },
    methods: {
      infoModified () {
        this.one_nav = '主页'
        this.two_nav = '>'
        this.three_nav = '个人信息'
        this.currentView = 'personInfo'
      },
      passwordModified () {
        this.one_nav = '主页'
        this.two_nav = '>'
        this.three_nav = '密码修改'
        this.currentView = 'passwordChange'
      },
      topMenuSelect (name) {
        let that = this
        if (name === 'personal') {
          that.$router.replace({path: '/person'})
        } else if (name === 'logout') {
          alert('退出登录成功')
          window.localStorage.setItem('username', null)
          window.localStorage.setItem('token', null)
          that.$router.replace({path: '/login'})
        }else if (name === 'default') {
          that.$router.replace({path: '/default'})
        }
      },
      leftMenuSelect (name) {
        let that = this
        if (name === 'personInfo') {
          that.infoModified()
        } else if (name === 'passwordModified') {
         that.passwordModified()
        }
      }
    },
    components: {
      Button,
      personInfo: personInfo,
      passwordChange: passwordChange,
      foot: foot
    }
  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    margin-top:-60px;
    /*border: 1px solid #d7dde4;*/
    /*background: #f5f7f9;*/
    /*position: relative;*/
    /*margin-top:-60px;*/
  }
  .layout-logo{
    width: 100px;
    height: 40px;
    background: #5b6270;
    border-radius: 10px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 400px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
    text-align:left;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .foot{
    width: 100%;
  }
  Button{
    color:white;
  }
</style>
