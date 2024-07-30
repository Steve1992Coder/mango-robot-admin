<template>
  <el-card>
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="auto"
      class="demo-dynamic w-full"
    >
      <el-form-item
        prop="routeName"
        label="路由名称"
        :rules="[{ required: true, message: '请输入用户名称', trigger: 'blur' }]"
      >
        <el-input v-model="dynamicValidateForm.routeName" />
      </el-form-item>
      <el-card
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        class="mb-6"
        shadow="never"
      >
        <template #header>
          <div class="card-header">
            <span>域 {{ index + 1 }}</span>
            <el-icon @click="removeDomain(domain)" class="float-right" size="28">
              <Close />
            </el-icon>
          </div>
        </template>

        <el-form-item
          label="域名"
          :prop="'domains.' + index + '.domain'"
          :rules="{ required: true, message: '域名不能为空', trigger: 'blur' }"
        >
          <el-input v-model="domain.domain" />
        </el-form-item>

        <el-form-item label="url映射" require>
          <el-row
            v-for="(urlMap, urlindex) in domain.urlMaps"
            :key="urlMap.key"
            :gutter="20"
            class="mb-6 w-full"
          >
            <el-col :span="10">
              <el-form-item
                :prop="'domains.' + index + '.urlMaps' + '.' + urlindex + '.url'"
                :rules="{ required: true, message: '不能为空', trigger: 'blur' }"
              >
                <el-input v-model="urlMap.url" :placeholder="'url映射' + urlindex" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                :prop="'domains.' + index + '.urlMaps' + '.' + urlindex + '.urlMapName'"
                :rules="{ required: true, message: '不能为空', trigger: 'blur' }"
              >
                <el-input v-model="urlMap.urlMapName" :placeholder="'服务请求名称' + urlindex" />
              </el-form-item>
            </el-col>
            <el-icon @click="removeUrl(index, urlindex)" class="float-right h-full" size="28">
              <Close />
            </el-icon>
          </el-row>
          <el-form-item class="w-full">
            <el-button @click="addUrlMap(index)" class="w-full dashedButton" plain
              >+新增映射</el-button
            >
          </el-form-item>
        </el-form-item>
      </el-card>
      <el-form-item>
        <el-button @click="addDomain()" class="w-full dashedButton" plain>+新增域</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElCard, ElMessage, type FormInstance } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  routeName: string
}>({
  domains: [],
  routeName: ''
})

interface DomainItem {
  key: number
  domain: string
  urlMaps: UrlMap[]
}

interface UrlMap {
  key: number
  url: string
  urlMapName: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    domain: '',
    urlMaps: []
  })
}

const addUrlMap = (index: number) => {
  dynamicValidateForm.domains[index].urlMaps.push({
    key: Date.now(),
    url: '',
    urlMapName: ''
  })
}

const removeUrl = (domainIndex: number, urlIndex: number) => {
  console.log('domainIndex', domainIndex)
  console.log('urlIndex', urlIndex)
  dynamicValidateForm.domains[domainIndex].urlMaps.splice(urlIndex, 1)
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('表单验证通过！')
      console.log(dynamicValidateForm)
    } else {
      ElMessage.error('表单验证失败！')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style>
.dashedButton {
  border: 2px dashed var(--el-border-color);
}
</style>
