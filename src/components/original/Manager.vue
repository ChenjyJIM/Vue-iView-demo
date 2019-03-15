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
              欢迎你，请您注册:{{msg}}
            </template>
            <MenuItem name="1-1"><div @click="lookBook">图书管理</div></MenuItem>
            <MenuItem name="1-2"><div @click="lookRecord">借阅记录</div></MenuItem>
          </Submenu>
        </Menu>
      </Col>
      <Col span="19">
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1" @on-select="topMenuSelect">
            <div class="layout-logo">
              <p style="color: rgba(0,0,0,1);">这里放logo</p>
            </div>
            <div class="layout-nav">
              <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </MenuItem>
              <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                Item 2
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
            <BreadcrumbItem href="#">{{one_nav}}</BreadcrumbItem>
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
        <div class="layout-copy">
          2018-2019 &copy; 工作流引擎系统
        </div>
      </Col>
      <div class="foot">
        <component :is="foot"></component>
      </div>
    </Row>

  </div>

</template>
<script>
  import bookManage from './BookManage.vue'
  import recordManage from './RecordManage.vue'
  import Button from 'iview/src/components/button/button'
  import register from '../workflow-engine/RegisterMember.vue'
  import foot from '../workflow-engine/Foot.vue'
  export default {
    name: 'Manager',
    data () {
      return {
        msg: 'haha',
        one_nav: '主页',
        two_nav: '后台页面',
        three_nav: '注册页面',
        currentView: 'register',
        foot: 'foot'
      }
    },
    mounted () {
      this.msg = window.localStorage.getItem('username')
    },
    methods: {
      lookBook () {
        this.one_nav = '主页'
        this.two_nav = '后台管理'
        this.three_nav = '注册管理'
        this.currentView = 'register'
      },
      lookRecord () {
        this.one_nav = '主页'
        this.two_nav = '后台管理'
        this.three_nav = '借阅记录'
        this.currentView = 'recordManage'
      },
      topMenuSelect (name) {
        if (name === 'personal') {
          alert('nnnnnnnn')
        } else if (name === 'logout') {
          alert('mmmmm')
        }
      }
    },
    components: {
      Button,
      bookManage: bookManage,
      recordManage: recordManage,
      register: register,
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
    overflow: hidden;
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
    width: 420px;
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
    background: #4ba9b4;
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
