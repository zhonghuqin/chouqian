<template>
    <div class="container">
        <div class="login">
            <el-form :model="ruleForm" :rules="rules" label-width="95px" ref="ruleFormRef" size="large">
                <el-form-item label="账  号" style="height: 40px;" prop="account" class="registerA">
                    <el-input v-model="ruleForm.account" placeholder="请输入"  autocomplete="off"/>
                </el-form-item>
                <el-form-item label="密  码" style="height: 40px;" prop="password" class="registerB">
                    <el-input v-model="ruleForm.password" type='password' placeholder="请输入"  autocomplete="off" show-password/>
                  </el-form-item>
                  <el-form-item label="确认密码" style="height: 40px;" prop="repassword" class="registerC" >
                    <el-input v-model="ruleForm.repassword" type='password' placeholder="请输入"  autocomplete="off" show-password/>
                  </el-form-item>
                  <el-form-item label="邮 箱"  style="height: 40px; width: 340px" prop="email" class="registerD">
                    <el-input v-model="ruleForm.email"  placeholder="请输入"  autocomplete="off"/>
                    <el-button v-show='show' @click='onetime()' class="send" type="success" plain>{{ sendText }}</el-button>
                    <el-button disabled v-show='!show' class="send" id="sendd" type="info" plain>{{ countDown }}s后重试</el-button>
                  </el-form-item>
                  <el-form-item label="验证码" style="height: 40px;" prop="code" class="registerE">
                    <el-input v-model="ruleForm.code" placeholder="请输入"  autocomplete="off"/>
                  </el-form-item>
                    <el-button @click="click" type="info" class="button" plain>返回</el-button>
                    <el-button @click="submitForm(ruleFormRef)" type="primary" class="button" plain>注 册</el-button>
                    <el-button @click="resetForm(ruleFormRef)" type="danger" class="button" plain>重置</el-button>
        </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userregisterApi, sendemailApi, testemailApi } from '../api/registerApi'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus';
const router = useRouter()
const sendText = ref('获取验证码')
const countDown = ref('')
const show = ref(true)
const codeword = ref('')
// 返回
function click() {
    router.push('/')
    }
// 注册成功
const submitForm = async (formE1: FormInstance | undefined) => {
  if (!formE1) return
  await formE1.validate((valid) => {
   if (valid) {
    const handleget =(value: any) => {
      // 验证验证码
       testemailApi(value).then((res) => res.data).then((res) =>{
        if (res.code !== 200) return ElMessage({message: '验证失败',type: 'error'})
        // 进入验证注册
        const handle =async (value: any) => {
        userregisterApi(value).then((res) => res.data).then((res) =>{
          console.log(res);
          if(res.code !== 200) return ElMessage({ message: `${res.msg}`, type: 'error'})
          ElMessage({
      message: '注册成功',
      type: 'success',
  })
          router.push('/')
        })
      }
      handle(ruleForm.value)
       })    
    }
    const code = {
      code: ruleForm.value.code,
      hascode: codeword.value
    }
    handleget(code)
  
   }
  })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 发送验证码
const onetime = () => {
  if(ruleForm.value.email === '') return ElMessage({ type:'error', message: '邮箱不能为空'})
  // 数数
  const count = () => {
    show.value= false
    let timer = 10
    countDown.value = `${timer}`
    const timeFun = setInterval(() => {
      --timer
      countDown.value = `${timer}`
      if (timer === 0) {
        show.value = true
        sendText.value = '重新发送'
        clearInterval(timeFun)
      }
    }, 1000)
  }
  count()
  const handlehandle =(value: any) => {
    sendemailApi(value).then((res) => res.data).then((res) => {
      if(res.code !== 200) return ElMessage({ type:'error', message: '邮箱发送失败'})
      codeword.value = res.data
      ElMessage({
      message: '邮箱发送成功',
      type: 'success',
  })
    })
      }
      const getemail = {
        email: ruleForm.value.email
      }
      handlehandle(getemail)
}
interface RuleForm {
account:string
password: string
repassword:string
email: string
code: string
}
const ruleForm = ref({
  account: '',
  password: '',
  repassword: '',
  email: '',
  code: ''
})
const value1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value !== ruleForm.value.password) {
    callback(new Error('密码前后不一致'))
  }else {
    callback()
  }
}
const ruleFormRef = ref<RuleForm>()
const typr = /^\d+$/;
const rules = ref<FormRules<RuleForm>>({
    account: [
        { required: true, message: '账户不能为空', trigger: 'blur' },
        { min: 6, max: 10, message: '用户名长度为6 - 10位' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6 - 14位' }
    ],
    repassword: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6 - 14位' },
        { validator: value1, trigger: 'blur' }
    ],
    email: [
            {
              required: true,
              message: '邮箱不能为空',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请填写正确的邮箱',
              trigger: ['blur', 'change'],
            },
    ],
    code: [
      { required: true, message: '验证码不能为空' },
      { pattern: typr, message: '验证码应该为数字'},
    ]
})
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: url("../assets/1.jpg") center center no-repeat;
    background-size: 100% 100%;
    position:absolute;
    text-align:center;
}
.login{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  height: 500px;
  position:absolute;
  left: 0;
  top: 0;
  right: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 20px;
  background-image: linear-gradient(rgba(223, 208, 203, 0), rgb(137, 135, 10));
  box-shadow: 0 0 30px 3px;
}
:deep .el-form-item--large .el-form-item__label{
  color: white;
  font-size:17px;
}
.el-form{
  width: 520px;
  height: 350px;
}
.send{
  position: relative;
  left: 273px;
  top: -40px;
  width: 150px;
}
#sendd{
  position: relative;
  left: 260px;
  top: -40px;
  width: 150px;
}
</style>
