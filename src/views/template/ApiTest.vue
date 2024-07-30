<template>
  <el-button type="primary" @click="handleGetTest()">get测试</el-button>
  <el-button type="primary" @click="handlePostTest()">post测试</el-button>
  <el-button type="primary" @click="handlePutTest()">put测试</el-button>
  <el-button type="primary" @click="handleDeleteTest()">delete测试</el-button>
  <el-button type="primary" @click="handlePostFormTest()">postForm测试</el-button>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import templateApi from '@/api/template'

function handleGetTest() {
  templateApi
    .getTest()
    .then((data) => {
      ElMessage.success(data.result)
      console.log('get data', data)
    })
    .catch((reason) => {
      console.log('reason', reason)
    })
}

function handlePostTest() {
  templateApi
    .postTest()
    .then((data) => {
      ElMessage.success(data.result)
      console.log('post data', data)
    })
    .catch((reason) => {
      console.log('reason', reason)
    })
}

function handlePutTest() {
  templateApi
    .putTest()
    .then((data) => {
      ElMessage.success(data.result)
      console.log('put data', data)
    })
    .catch((reason) => {
      console.log('reason', reason)
    })
}

function handleDeleteTest() {
  templateApi
    .deleteTest()
    .then((data) => {
      ElMessage.success(data.result)
      console.log('delete data', data)
    })
    .catch((reason) => {
      console.log('reason', reason)
    })
}

function handlePostFormTest() {
  templateApi
    .postFormTest()
    .then((data) => {
      ElMessage.success(data.result)
      console.log('postFormTest data', data)
    })
    .catch((reason) => {
      console.log('reason', reason)
    })
}
</script>