<template>
  <div class="left-menu">
    <div class="logo-container w-full flex justify-center items-center">
      <img :src="logoImg.logo" class="logo" alt="logo" />
    </div>
  </div>
  <div class="right-menu">
    <el-dropdown trigger="click">
      <el-avatar>
        <template #default>
          <img :src="assetsImg.avatar" class="user-avatar" alt="avatar" />
        </template>
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout()">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import avatar from '@/assets/avatar.jpg'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'

const logoImg = reactive({ logo })

const assetsImg = reactive({ avatar })
const route = useRouter()

function handleLogout() {
  route.push('/login')
}
</script>

<style scoped>
.logo-container {
  height: 50px;
  width: 50px;
  padding: 8px;
}

.left-menu {
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  float: left;
}

.right-menu {
  margin-right: 8px;
  float: right;
  height: 100%;
  line-height: 50px;
  display: flex;
  align-items: center;
}

.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
