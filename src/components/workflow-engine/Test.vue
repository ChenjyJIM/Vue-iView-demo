
<template>
  <div class="container">
    <RadioGroup v-model="button1" type="button" @on-change="radioSelected">
      <Radio name="1" label="日视图"></Radio>
      <Radio name="2" label="周视图"></Radio>
      <Radio name="3" label="月视图"></Radio>
      <Radio name="4" label="年视图"></Radio>
    </RadioGroup>
    <div class="right-container">
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{selectedTask.text}}</h2>
          <span><b>ID: </b>{{selectedTask.id}}</span><br/>
          <span><b>完成度: </b>{{selectedTask.progress|toPercent}}%</span><br/>
          <span><b>开始时间: </b>{{selectedTask.start_date|niceDate}}</span><br/>
          <span><b>结束时间: </b>{{selectedTask.end_date|niceDate}}</span><br/>
          <span><b>负责人: </b>{{selectedTask.users}}</span><br/>
        </div>
        <div v-else class="select-task-prompt">
          <h2>任务信息</h2>
        </div>
      </div>
      <ul class="gantt-messages">
        <li class="gantt-message" v-for="message in messages">{{message}}</li>
      </ul>
    </div>
    <gantt ref="gantt" class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt>
  </div>
</template>

<script>
  import Gantt from '../Gantt.vue'

  export default {
    name: 'test',
    components: {Gantt},
    data () {
      return {
        button1:'月视图',
        tasks: {
          data: [
            {id: 2, text: 'Task #1', users: '陈进颖', start_date: '15-04-2017', duration: 3, progress: 0.6},
            {id: 3, text: 'Task #2', users: 'cjy', start_date: '18-04-2017', duration: 3, progress: 0.4}
          ],
          links: [
            {id: 1, source: 1, target: 2, type: '0'}
          ]
        },
        selectedTask: null,
        messages: []
      }
    },
    // mounted: {
    //  // setScaleConfig('5')
    // },
    filters: {
      toPercent (val) {
        if(!val) return '0'
        return Math.round((+val) * 100)
      },
      niceDate (obj){
        return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
      }
    },
    methods: {
      radioSelected: function(name){
        this.$refs.gantt.viewChanged(name);
      },

      selectTask (task) {
        this.selectedTask = task
      },

      addMessage (message) {
        this.messages.unshift(message)
        if(this.messages.length > 40) {
          this.messages.pop()
        }
      },

      // 记录对任务的修改记录
      logTaskUpdate (id, mode, task) {
        let operate = ''
        switch (mode) {
          case 'updated':
            operate = '更新';
            break;
          case 'deleted':
            operate = '删除';
            break
          case 'inserted':
            operate = '新增';
            break;
          default :
            operate = '更新'
        }
        let text = (task && task.text ? ` (${task.text})`: '')
        let message = `${operate}活动 :  ${text}`
        this.addMessage(message)
      },

      // 记录对连接箭头的修改记录
      logLinkUpdate (id, mode, link) {
        let message = `Link ${mode}: ${id}`
        if(link){
          message += ` ( source: ${link.source}, target: ${link.target} )`
        }
        this.addMessage(message)
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
  }

  .container {
    height: 500px;
    width: 100%;
  }

  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    height: 100%;
    width: 340px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index:2;
  }

  .gantt-messages {
    list-style-type: none;
    height: 50%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 5px;
  }

  .gantt-messages > .gantt-message {
    background-color: #f4f4f4;
    box-shadow:inset 5px 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 5px 0;
    padding: 8px 0 8px 10px;
  }

  .gantt-selected-info {
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    height: 100%;
    line-height: 28px;
    padding: 10px;
  }

  .gantt-selected-info h2 {
    border-bottom: 1px solid #cecece;
  }

  .select-task-prompt h2{
    color: #d9d9d9;
  }

</style>
