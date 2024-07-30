<script setup lang="ts"></script>

<template>
  <el-card>
    <div class="example">
      <p>Hover me to see the effect.</p>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.example {
  p {
    color: var(--el-color-primary);
    font-size: 20px;

    &:hover {
      color: var(--el-color-danger);
    }
  }
}
</style>
