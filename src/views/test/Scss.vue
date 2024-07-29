<script setup lang="ts"></script>

<template>
  <div class="example">
    <p>Hello, SCSS!</p>
  </div>
</template>

<style scoped lang="scss">
.example {
  p {
    color: blue;
    font-size: 20px;

    &:hover {
      color: red;
    }
  }
}
</style>
