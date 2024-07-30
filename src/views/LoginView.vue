<template>
  <div class="login-container">
    <img src="@/assets/login-background.jpg" alt="" class="login-image" />
    <div class="login-form">
      <el-form ref="loginFormRef" :model="form" :rules="rules">
        <el-form-item>
          <h2>Mango Robot Admin</h2>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(loginFormRef)"
            class="login-button"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const loginFormRef = ref<FormInstance>()
const form = reactive({ userName: '', password: '' })

const rules = reactive<FormRules>({
  userName: [{ required: true, message: '随便输入', trigger: 'blur' }],
  password: [{ required: true, message: '随便输入', trigger: 'blur' }]
})

const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: any) => {
    if (valid) {
      router.push('/index')
    }
  })
}
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
}

.login-image {
  width: 35%;
  height: 80%;
  float: left;
}

.login-form {
  width: 35%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.login-button {
  width: 100%;
}

.el-form {
  width: 300px;
}
</style>