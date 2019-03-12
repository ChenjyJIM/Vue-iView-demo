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
              欢迎你，请您注册
            </template>
            <MenuItem name="1-1"><div @click="memberRegister">会员注册</div></MenuItem>
            <MenuItem name="1-2"><div @click="lookRecord">访客注册</div></MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="19">
        <div class="layout-header">
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem href="/manager">{{one_nav}}</BreadcrumbItem>
            <BreadcrumbItem href="#">{{two_nav}}</BreadcrumbItem>
            <BreadcrumbItem>{{three_nav}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <template id="bookManage"></template>
            <template id="recordManage"></template>
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
  import register from './RegisterMember.vue'
  import foot from './Foot.vue'
  import registerGuest from './RegisterGuest'
  export default {
    name: 'Manager',
    data () {
      return {
        one_nav: '主页',
        two_nav: '后台页面',
        three_nav: '注册页面',
        currentView: 'register',
        foot: 'foot'
      }
    },
    // 可以通过此方法获取到当前的登录的账号名字
    // mounted () {
    //   this.msg = window.localStorage.getItem('username')
    // },
    methods: {
      memberRegister () {
        this.one_nav = '主页'
        this.two_nav = '后台页面'
        this.three_nav = '会员注册'
        this.currentView = 'register'
      },
      lookRecord () {
        this.one_nav = '主页'
        this.two_nav = '后台页面'
        this.three_nav = '访客注册'
        this.currentView = 'registerGuest'
      }
    },
    components: {
      Button,
      register: register,
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
    margin-top:-60px;
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
