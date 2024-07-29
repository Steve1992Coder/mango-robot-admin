<template>
  <ElButton type="primary" @click="handleGetTest()">get测试</ElButton>
  <ElButton type="primary" @click="handlePostTest()">post测试</ElButton>
  <ElButton type="primary" @click="handlePutTest()">put测试</ElButton>
  <ElButton type="primary" @click="handleDeleteTest()">delete测试</ElButton>
  <ElButton type="primary" @click="handlePostFormTest()">postForm测试</ElButton>
</template>
<script setup lang="ts">
import { type ElButton, ElMessage } from 'element-plus'
import { deleteTest, getTest, postFormTest, postTest, putTest } from '@/api/test'

function handleGetTest() {
  getTest().then((data) => {
    ElMessage.success(data.result)
    console.log('get data', data)
  }).catch((reason) => {
    console.log('reason', reason)
  })
}

function handlePostTest() {
  postTest().then((data) => {
    ElMessage.success(data.result)
    console.log('post data', data)
  }).catch((reason) => {
    console.log('reason', reason)
  })
}

function handlePutTest() {
  putTest().then((data) => {
    ElMessage.success(data.result)
    console.log('put data', data)
  }).catch((reason) => {
    console.log('reason', reason)
  })
}

function handleDeleteTest() {
  deleteTest().then((data) => {
    ElMessage.success(data.result)
    console.log('delete data', data)
  }).catch((reason) => {
    console.log('reason', reason)
  })
}

function handlePostFormTest() {
  postFormTest().then((data) => {
    ElMessage.success(data.result)
    console.log('postFormTest data', data)
  }).catch((reason) => {
    console.log('reason', reason)
  })
}
</script>