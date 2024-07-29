import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

// 导出Request，可以用来自定义传递配置来创建实例
class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_VUE_APP_BASE_API, timeout: 5000
  }
  loadingInstance: any

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    // 添加请求拦截器
    this.instance.interceptors.request.use((config) => {
      // 一般会请求拦截里面加token，用于后端的验证
      this.loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        fullscreen: true,
        background: 'rgba(0, 0, 0, 0)'
      })
      return config
    }, (err: any) => {
      // 请求错误，这里可以用全局提示框进行提示
      return Promise.reject(err)
    })
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        this.loadingInstance.close()
        const data = res.data
        if (data.code !== 200) {
          // 提示错误信息
          ElMessage({
            showClose: true,
            message: data.message,
            type: 'error'
          })
          return Promise.reject(new Error(data.message || 'Error'))
        } else {
          return data
        }
      },
      (err: AxiosError) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        this.loadingInstance.close()
        ElMessage({
          showClose: true,
          message: err.message,
          type: 'error'
        })
        return Promise.reject(err.response)
      }
    )
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.get(url, config)
  }

  public post<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.delete(url, config)
  }

  public postForm<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.postForm(url, data, config)
  }
}

export interface Result<T> {
  code: number,
  message: string,
  result: T
}

// 默认导出Request实例
export default new Request({})