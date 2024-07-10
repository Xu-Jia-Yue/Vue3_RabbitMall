/// <reference types="vite/client" />
// 解决 无法找到模块xxx的声明文件。xxx隐式拥有 "any" 类型
declare module '*.ts'
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
