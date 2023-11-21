<template>
    <div class="container">
      <div class="domdom_p">
        2023 年全国普通高等学校美术教育专业教师基本功展示系统
      </div>
        <div class="login">
<!--          <h3 class="domdom">2023 年全国普通高等学校美术教育专业教师基本功展示系统</h3>-->
          <div class="domdom">
            2023 年全国普通高等学校美术教育专业教师基本功展示系统
          </div>
            <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            size="large"
            label-width="75px"
            >
            <el-form-item label="账 号" prop="account" class="loginA" style="height: 40px;">
                <el-input v-model="ruleForm.account" autocomplete="off" style="radio:0px"/>
            </el-form-item>
            <el-form-item label="密 码" prop="password" class='loginB' style="height: 40px;">
                <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
                show-password
                >
            </el-input>
            </el-form-item>
                <el-button  @click="submitForm(ruleFormRef)" plain class="send">登录</el-button >
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userLoginApi } from '../../api/loginApi'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
const router = useRouter()
interface RuleForm {
account: string,
password: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  account: '',
  password: '',
})
const rules = ref<FormRules<RuleForm>>({
    account: [
        { required: true, message: '账户不能为空', trigger: 'blur' },
        // { min: 6, max: 10, message: '用户名长度为6 - 10位' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6 - 14位' }
    ]
})
const submitForm = async (formE1:FormInstance | undefined) => {
  if (!formE1) return  ElMessage({ type:'error', message: '请重新输入'})
  await formE1.validate((valid) => {
    if (valid) {
            userLoginApi(
              {account: ruleForm.value.account, password:ruleForm.value.password})
              .then((res) => res.data).then((res) => {
            if( res.code !== 200) return  ElMessage({ type:'error', message: '登录失败'})
            sessionStorage.setItem('token', res.data)
            ElMessage({ type:'success', message: '登录成功'})
            router.push('/enter')
            })
            }
      })
    }
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-image: linear-gradient( rgb(148, 35, 35), rgb(95, 81, 81));
    background-size: cover;
    position:absolute;
}
  @media screen and (min-width: 1024px) and (max-width: 1440px) {
    .login{
      display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 600px;
    height: 390px;
    position:relative;
    background-color: rgb(80, 5, 5);
    border-radius: 20px;
    box-shadow: 0 0 30px 3px;
  }
    .domdom_p{
      display: none;
    }
  .el-form{
      width: 420px;
      height: 150px;
      margin-top: 30px;
    }
    :deep .el-form-item--large .el-form-item__label{
      color: white;
      font-size:17px;
    }
    .send{
      width: 350px;
      margin-left: 73px;
    }
    .domdom{
      color: white;
      font-size: 16px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1920px) {
    .login{
      display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 740px;
    height: 390px;
    position:relative;
    left: 0;
    top: 0;
    right: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(80, 5, 5);
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 0 30px 3px;
  }
    .domdom_p{
      display: none;
    }
  .el-form{
      width: 420px;
      height: 150px;
      margin-top: 30px;
    }
    :deep .el-form-item--large .el-form-item__label{
      color: white;
      font-size:17px;
    }
    .send{
      width: 350px;
      margin-left: 73px;
    }
    .domdom{
      position: absolute;
      font-weight: bold;
      top:20px;
      font-family:'Times New Roman', Times, serif;
      height: 50px;
      width: 90%;
      color: white;
      border-radius: 10px;
      font-size: 24px;
      margin: 20px;
      text-align: center;
    }
  }
  @media screen and (max-width: 768px) {
    .login{
      display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 350px;
    height: 350px;
    position:relative;
    left: 0;
    top: 0;
    right: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(80, 5, 5);
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 0 30px 3px;
  }
  .el-form{
      width: 320px;
      height: 450px;
      margin-top: 130px;
    }
    :deep .el-form-item--large .el-form-item__label{
      color: white;
      font-size:17px;
    }
    .send{
      width: 250px;
      margin-left: 73px;
    }
    .domdom_p{
      display: none;
    }
    .domdom{
      position: absolute;
      font-weight: bold;
      top:20px;
      font-family:'Times New Roman', Times, serif;
      height: 50px;
      width: 90%;
      color: white;
      border-radius: 10px;
      font-size: 20px;
      margin: 20px;
      text-align: center;
    }
  }
@media screen and (min-width: 350px) and (max-width: 450px) {
  .login{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 320px;
    height: 390px;
    position:relative;
    left: 0;
    top: 0;
    right: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(80, 5, 5);
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 0 30px 3px;
  }
  .el-form{
    width: 280px;
    height: 150px;
    margin-top: 30px;
  }
  :deep .el-form-item--large .el-form-item__label{
    color: white;
    font-size:17px;
  }
  .send{
    width: 205px;
    margin-left: 73px;
  }
  .domdom{
    color: white;
    width: 90%;
    height: 50px;
    font-size: 18px;
    text-align: center;
  }
}
</style>
