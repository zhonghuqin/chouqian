<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { outLoginApi, testTokenApi, refreshApi } from '../api/loginApi'
const router = useRouter()
const outlogin = () => {
    outLoginApi().then((res)=> res.data).then(res=>{
        if (res.code !== 200) return ElMessage({message: '退出失败', type: 'error'})
        ElMessage({message: '退出成功', type: 'success'})
        sessionStorage.removeItem('token')
        router.push('/')
    })
}
const open = setInterval(() => {
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) {
      console.log('停止');
        clearInterval(open)
      }else{   
    refreshApi().then((res) => res.data).then((res) =>{
      sessionStorage.setItem('token', res.data)
      console.log(res.data);
    })
  }
  }
  , 10000)
  open
testTokenApi().then((res) => res.data).then(res => {
    if (res.code !== 200) return 
        console.log('测试成功');
})
</script>

<template>
    <div>
        <el-button type="danger"  size="large" round @click="outlogin">登出</el-button>
    </div>
</template>

<style scoped>
.el-button{
    width: 100px;
    margin: 10px;
}
</style>