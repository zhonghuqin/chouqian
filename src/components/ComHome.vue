<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter()
const terlogin = () => {
        ElMessage({message: '跳转成功', type: 'success'})
        router.push('/reg')
}
</script>

<template>
    <div>
    <el-button type="warning" size="large" round @click="terlogin">跳转</el-button>
    </div>
</template>

<style scoped>
.el-button{
    width: 100px;
    margin: 10px;
}
</style>