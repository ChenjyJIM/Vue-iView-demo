<template>
  <Form ref="formdata" :model="formdata" :rules="ruleValidate" :label-width="80">
    <h1>填写注册信息</h1>
    <FormItem label="姓名：" prop="name">
      <Input v-model="formdata.name" placeholder="填入您的姓名"></Input>
    </FormItem>
    <FormItem label="账号：" prop="loginName">
      <Input v-model="formdata.loginName" placeholder="填入账号，用于登录使用，请牢记"></Input>
    </FormItem>
    <FormItem label="密码" prop="passwd">
      <Input type="password" v-model="formdata.passwd"></Input>
    </FormItem>
    <FormItem label="确认密码" prop="passwdCheck">
      <Input type="password" v-model="formdata.passwdCheck"></Input>
    </FormItem>
    <FormItem label="邮箱：" prop="mail">
      <Input v-model="formdata.mail" placeholder="填入您的邮箱"></Input>
    </FormItem>
    <FormItem label="电话：" prop="phone">
      <Input v-model="formdata.phone" placeholder="填入您的电话"></Input>
    </FormItem>
    <FormItem label="备用电话：">
      <Input v-model="formdata.backphone" placeholder="填入您的备用电话（可选）"></Input>
    </FormItem>
    <FormItem label="学会：" prop="instId">
      <Select v-model="formdata.instId" placeholder="填入您加入的学会，无选择'无'">
        <Option value="0">无</Option>
        <Option value="1">计算机学会</Option>
        <Option value="2">吹牛逼学会</Option>
      </Select>
    </FormItem>
    <FormItem label="qq：">
      <Input v-model="formdata.qq" placeholder="填入您的qq（可选）"></Input>
    </FormItem>
    <FormItem label="微信：">
      <Input v-model="formdata.wechat" placeholder="填入您的微信（可选）"></Input>
    </FormItem>
    <FormItem label="其他联系方式：">
      <Input v-model="formdata.others" placeholder="其他联系方式（可选）"></Input>
    </FormItem>
    <FormItem label="生日：">
      <Row>
        <Col span="2">
          <FormItem prop="date">
            <DatePicker type="date" confirm format="yyyy年M月d日" value="yyyy-MM-dd" placeholder="选择您的生日" v-model="formdata.date"></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="性别：" prop="sex">
      <Row>
        <Col span="2">
          <RadioGroup v-model="formdata.sex">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="名族：">
      <Input v-model="formdata.ethnic" placeholder="填入您的名族（可选）"></Input>
    </FormItem>
    <FormItem label="党派：">
      <Input v-model="formdata.partisan" placeholder="填入您的党派（可选）"></Input>
    </FormItem>
    <FormItem label="社会任职情况：">
    <Input v-model="formdata.personPublicDuty" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="社会任职情况（可选）"></Input>
  </FormItem>
    <FormItem label="获奖情况：">
      <Input v-model="formdata.personAwards" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="获奖情况（可选）"></Input>
    </FormItem>
    <FormItem label="学历：">
      <Select v-model="formdata.education" placeholder="请选择学历">
        <Option value="0">初中</Option>
        <Option value="1">高中</Option>
        <Option value="2">大专</Option>
        <Option value="3">本科</Option>
        <Option value="4">硕士</Option>
        <Option value="5">博士</Option>
        <Option value="6">博士后</Option>
      </Select>
    </FormItem>

    <FormItem label="备注" prop="memo">
      <Input v-model="formdata.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="随便说点什么呗"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formdata')">注册</Button>
      <Button @click="handleReset('formdata')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formdata.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formdata.validateField('passwdCheck')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formdata.passwd) {
          callback(new Error('两次密码不匹配!'))
        } else {
          callback()
        }
      }
      return {
        formdata: {
          msg: '',
          name: '',
          loginName: '',
          mail: '',
          passwd: '',
          passwdCheck: '',
          phone: '',
          backphone: '',
          qq: '',
          wechat: '',
          others: '',
          instId: '',
          education: '',
          personPublicDuty: '',
          personAwards: '',
          sex: '',
          ethnic: '',
          partisan: '',
          interest: [],
          date: '',
          time: '',
          memo: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '名字不能为空！', trigger: 'blur' }
          ],
          loginName: [
            {
              required: true, message: '账号不能为空！', trigger: 'blur'
            }
          ],
          mail: [
            { required: true, message: '邮箱不能为空！', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确！请检查！', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '电话不能为空！', trigger: 'blur' },
            { type: 'string', min: 11, max: 11, message: '电话号码为11位！请校验', trigger: 'blur' }
          ],
          instId: [
            { required: true, message: '请选择您参加的学会！', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择你的性别！', trigger: 'change' }
          ],
          date: [
            { required: true, type: 'date', message: '请选择生日！', trigger: 'change' }
          ],
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 该方法用来等待操作
      sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time))
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          let that = this
          if (valid) {
            this.$ajax.post(that.GLOBAL.serverPath + '/authentication/register', {
              loginName: that.formdata.loginName,
              loginPassword: that.formdata.passwd,
              instId: that.formdata.instId,
              name: that.formdata.name,
              sex: that.formdata.sex,
              birthday: that.formdata.date,
              ethnic: that.formdata.ethnic,
              partisan: that.formdata.partisan,
              mail: that.formdata.mail,
              phone1: that.formdata.phone,
              phone2: that.formdata.backphone,
              qq: that.formdata.qq,
              wechat: that.formdata.wechat,
              others: that.formdata.others,
              personPublicDuty: that.formdata.personPublicDuty,
              personAwards: that.formdata.personAwards,
              educationId: that.formdata.education,
              memo: that.formdata.memo,
              // '1' 表示注册类型为会员注册
              type: 1
            })
              .then(function (response) {
                if (response.data.success) {
                  that.$Message.success('注册成功!请记住您的账号：' + that.formdata.loginName + '\n即将跳转登录页面～')
                  that.sleep(2000).then(() => {
                    // 这里写sleep之后需要去做的事情
                    that.$router.replace({path: '/'})
                  })
                } else {
                  that.loading = false
                  alert(response.data.errMsg)
                }
              })
              .catch(function (error) {
                that.$Message.error(error.code)
              })
          } else {
            that.$Message.error('注册失败，请检查!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>

