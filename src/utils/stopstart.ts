import { refreshApi } from '../api/loginApi'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const refresh_token = ref('')
export function myVar() {
    refreshApi().then((res) => res.data).then((res) => {
        console.log(res);
        if (res.code !== 200) return  ElMessage({message: '邮箱发送成功', type: 'success'})
        refresh_token.value = res.data
        return refresh_token
    })
}
