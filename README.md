<div align="center">
  <img alt="Arco Design Logo" width="200" src="./src/assets/login-background.jpg"/>

<br />

  <h1>mango-robot-admin</h1>

<br />

基于Vue3 Element-plus vit 构建的后台管理模板

<br />
</div>

## 环境
- node >= 18.0.0
- [在线预览](https://mango-robot-admin.vercel.app/)(需要翻墙)

## 命令

### 安装依赖

```sh
pnpm install
```

### 开发启动

```sh
pnpm run dev
```

### 生产构建

```sh
pnpm run build
```

### 单元测试 [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

### 代码规范 [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

## 界面

### 登陆界面

```text
/login
```

### 首页

```text
/
```

### 模板界面

```text
/template/api 接口  axios发起http mock.js模拟后端返回
/template/draggable vue-draggable-plus实现双表格拖拉拽
/template/queryTable 简单查询表格
/template/dynamicForm 动态添加表单项
/template/codeMirror codeMirror代码编辑器
/template/antvG6 AntvG6 关系图
```