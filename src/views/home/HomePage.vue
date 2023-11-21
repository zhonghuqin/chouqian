<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx'

const router = useRouter()

//加载页面效果
const loading1 = ref(false)

//定义表格数据的类型
interface tableData {
  name: string;
  school:string;
  topic: string;
  data: string;
}

//表格内容
// eslint-disable-next-line no-redeclare
const tableData = ref<tableData[]>([])

//获取日期
const currentDate = new Date();
const year = currentDate.getFullYear(); // 获取年份
const month = currentDate.getMonth() + 1; // 获取月份
const day = currentDate.getDate(); //获取日
//给表格添加新内容
const drawLot = () => {
    loading1.value = true
  // 点击抽签按钮时生成一条随机数据
  const randomData = {
    data: `${year}-${month}-${day}`,
    name: `Student ${tableData.value.length}`,
    school:`School ${tableData.value.length}`,
    topic: `Topic ${Math.floor(Math.random() * 100)}`
  }
  // 将新数据添加到表格数据中
  tableData.value.push(randomData)
  // 等待 Vue 的重新渲染完成
  setTimeout(() => {
    // 设置加载状态为 false
    loading1.value = false
  }, 0)
}

// 清除内容
const rigist = () => {
  tableData.value = []
}
//导出内容
const derive = () => {
// 创建一个空的工作簿
const workbook = XLSX.utils.book_new()

// 创建一个工作表
const worksheet = XLSX.utils.json_to_sheet(tableData.value)

// 将工作表添加到工作簿中
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

// 将工作簿保存为Excel文件
const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

// 将Excel文件保存到本地
saveExcelFile(excelBuffer, '抽签表.xlsx')
}

// 保存Excel文件到本地
const saveExcelFile = (buffer: any, fileName: string) => {
const data = new Blob([buffer], { type: 'application/octet-stream' })
const url = window.URL.createObjectURL(data)
const link = document.createElement('a')
link.href = url
link.setAttribute('download', fileName)
document.body.appendChild(link)
link.click()
document.body.removeChild(link)
}

// 跳转到登录页面
const back = () => {
  router.push('/')
}
</script>

<template>
    <div class="bg">
        <div class="tiao"><button class="back" @click="back" type="submit">退出登录</button></div>
        <el-tabs  class="demo-tabs" tab-position="left">
                <div class="lucency">
                    <div class="left">
                        <!-- 如果点击抽签按钮就显示页面加载效果 -->
                        <el-table v-loading="loading1" :data="tableData" style="width: 100%" class="load">
                            <el-table-column type="index" width="60" />
                            <el-table-column prop="data" label="时间" width="120" />
                            <el-table-column prop="name" label="姓名" width="100" />
                            <el-table-column prop="school" label="学校" width="100" />
                            <el-table-column prop="topic" label="题目内容" />

                        </el-table>
                    </div>
                    <div class="right">
                        <button class="drawlot" type="submit" @click="drawLot">抽签</button>
                        <button class="rigist" type="submit" @click="rigist">重置</button>
                        <button class="derive" type="submit" @click="derive" :disabled="tableData.length === 0">导出</button>
                    </div>
                </div>
          </el-tabs>
    </div>

</template>

<style  scoped>
@import url('../../assets/HomePage.css');
</style>
