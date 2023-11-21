# loginlogin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const router = useRouter()
function enter() {
    router.push('/enter')
    ElMessage({
    message: '登陆成功',
    type: 'success',
  })
}
// do not use same name with ref
const form = reactive({
  name: '',
  password: ''
})

function register() {
    router.push('/register')
}
</script>

<template>
    <div class="maintain">
        <el-form :model="form" label-width="65px">
                    <el-form-item label="用户名" style="background-color: hsl(18, 33%, 38%); height: 50px; border-radius: 27px;">
                        <el-input v-model="form.name" placeholder="请输入"   />
                    </el-form-item>
                    <el-form-item label="密 码"  style="background-color: hsl(18, 33%, 38%); height: 50px; border-radius: 27px;">
                        <el-input v-model="form.password" type="password" placeholder="请输入" />
                      </el-form-item>
              <el-button :plain="true" @click="enter">登录</el-button>
              <div class="last">没有账号
                <a href="#" @click="register">点击注册</a>
              </div>
        </el-form>
    </div>
</template>

<style scoped lang="scss">
.maintain{
    height: 90%;
    width:80%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .el-form-item{
        margin-top: 80px;
    }
    .el-button{
        margin-top: 50px;
        margin-left: 50px;
        background-color: hsl(18, 33%, 38%);
        letter-spacing: 5px;
        color: white;
    }
    .last{
        height: 20px;
        background-color: antiquewhite;
    }
}
</style>







<script setup lang="ts">
import LoginComponent from '../components/LoginComponents.vue'
</script>

<template>
  <div class="container">
    <div class="login">
      <LoginComponent></LoginComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  height: 100%;
  position: relative;
    .login{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      margin:0 auto;
      height: 60%;
      width: 40%;
      border-radius: 27px;
      opacity: 0.9;
      box-shadow:  3px 3px 12px #d9d9d9,
             -4px -4px 12px #d9bdb4;
      background: linear-gradient(to bottom, #e8cac1, #7b5143);
    }
}
</style>
