import ApiServer from '@/utils/axios'

const baseUrl = '/test'

export function getTest() {
  return ApiServer.get<string>(`${baseUrl}/get`)
}

export function postTest() {
  return ApiServer.post<string>(`${baseUrl}/post`)
}

export function putTest() {
  return ApiServer.put<string>(`${baseUrl}/put`)
}

export function deleteTest() {
  return ApiServer.delete<string>(`${baseUrl}/delete`)
}

export function postFormTest() {
  return ApiServer.postForm<string>(`${baseUrl}/postForm`)
}