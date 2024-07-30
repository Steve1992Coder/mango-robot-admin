<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import templateApi from '@/api/template'

const tableForm = ref<FormInstance>()
const tableParams = reactive<QueryTableParam>({
  date: '',
  pageIndex: 1,
  pageSize: 50,
  region: '',
  user: ''
})
let tableData = ref<QueryTableEntity[]>([])
let totalRow = ref(0)

onMounted(() => queryTableData())

function queryTableData(reset = false) {
  if (reset) {
    tableParams.pageIndex = 1
  }
  templateApi.queryTable(tableParams).then((res) => {
    tableData.value = res.result.list
    totalRow.value = res.result.totalRaw
  })
}

const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

export interface QueryTableParam extends TablePageParam {
  user: string
  region: string
  date: string
}

export interface QueryTableEntity {
  date: string
  name: string
  address: string
}

export interface TablePageRes<T> {
  list: T[]
  totalRaw: number
}

export interface TablePageParam {
  pageIndex: number
  pageSize: number
}
</script>

<template>
  <el-card>
    <el-form ref="tableForm" :inline="true" :model="tableParams" class="form-inline">
      <el-form-item label="Approve by" prop="user">
        <el-input v-model="tableParams.user" placeholder="Approve by" clearable></el-input>
      </el-form-item>
      <el-form-item label="Activity zone" prop="region">
        <el-select v-model="tableParams.region" placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time" prop="date">
        <el-date-picker
          v-model="tableParams.date"
          type="date"
          placeholder="Pick a date"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryTableData()">查询</el-button>
        <el-button @click="reset(tableForm)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" max-height="450" stripe>
      <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template>
          <el-button icon="Edit" circle></el-button>
          <el-button type="danger" icon="Delete" circle></el-button>
          <el-button type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="tableParams.pageIndex"
      v-model:page-size="tableParams.pageSize"
      :page-sizes="[50, 100, 200, 300, 400]"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRow"
      @size-change="queryTableData(true)"
      @current-change="queryTableData()"
      style="float: right; margin: 8px"
    />
  </el-card>
</template>

<style scoped>
.form-inline .el-input {
  --el-input-width: 220px;
}

.form-inline .el-select {
  --el-select-width: 220px;
}
</style>
