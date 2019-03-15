<template>
  <div class="layout">
    <Row type="flex">
      <Col span="5" class="layout-menu-left">
        <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
          <div class="layout-logo-left">
            <h2 style="color:white;">杭州市科学协会管理系统</h2>
          </div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              欢迎你，{{msg}}
            </template>
            <MenuItem name="1-1"><div @click="memberRegister">学会项目申报</div></MenuItem>
            <MenuItem name="1-2"><div @click="guestRegister">学会入会申请</div></MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="19">
        <Header>
          <Menu mode="horizontal" theme="light" active-name="1" @on-select="topMenuSelect">
            <!--<div class="layout-logo">-->
              <!--<p style="color: rgba(0,0,0,1);">这里放logo</p>-->
            <!--</div>-->
            <div class="layout-nav">
              <MenuItem name="navigate2">
                <Icon type="ios-navigate"></Icon>
                首页
              </MenuItem>
              <MenuItem name="navigate2">
                <Icon type="ios-keypad"></Icon>
                导航2
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
            <BreadcrumbItem href="/manager">{{one_nav}}</BreadcrumbItem>
            <BreadcrumbItem href="#">{{two_nav}}</BreadcrumbItem>
            <BreadcrumbItem>{{three_nav}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <template id="activityDisplay"></template>
            <template id="registerGuest"></template>
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
  import activityDisplay from './ActivityDisplay'
  import foot from './Foot.vue'
  import registerGuest from './RegisterGuest'
  export default {
    name: 'DefaultView',
    data () {
      return {
        msg: 'haha',
        one_nav: '主页',
        two_nav: '>',
        three_nav: '项目申报',
        currentView: 'activityDisplay',
        foot: 'foot'
      }
    },
    mounted () {
      this.msg = window.localStorage.getItem('username')
    },
    // 可以通过此方法获取到当前的登录的账号名字
    // mounted () {
    //   this.msg = window.localStorage.getItem('username')
    // },
    methods: {
      memberRegister () {
        this.one_nav = '主页'
        this.two_nav = '>'
        this.three_nav = '项目申报'
        this.currentView = 'activityDisplay'
      },
      guestRegister () {
        this.one_nav = '主页'
        this.two_nav = '>'
        this.three_nav = '会员申请'
        this.currentView = 'registerGuest'
      },
      topMenuSelect (name) {
        let that = this
        if (name === 'personal') {
          alert('nnnnnnnn')
        } else if (name === 'logout') {
          alert('退出登录成功')
          window.localStorage.setItem('username', null)
          window.localStorage.setItem('token', null)
          that.$router.replace({path: '/'})
        }
      }
    },
    components: {
      Button,
      activityDisplay: activityDisplay,
      registerGuest: registerGuest,
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
