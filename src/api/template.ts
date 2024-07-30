import ApiServer from '@/utils/axios'
import type {
  QueryTableEntity,
  QueryTableParam,
  TablePageRes
} from '@/views/template/QueryTable.vue'

const baseUrl = '/template'

function getTest() {
  return ApiServer.get<string>(`${baseUrl}/get`)
}

function postTest() {
  return ApiServer.post<string>(`${baseUrl}/post`)
}

function putTest() {
  return ApiServer.put<string>(`${baseUrl}/put`)
}

function deleteTest() {
  return ApiServer.delete<string>(`${baseUrl}/delete`)
}

function postFormTest() {
  return ApiServer.postForm<string>(`${baseUrl}/postForm`)
}

function queryTable(query: QueryTableParam) {
  return ApiServer.post<TablePageRes<QueryTableEntity>>(`${baseUrl}/queryTable`, query)
}

export default { getTest, postTest, putTest, deleteTest, postFormTest, queryTable }