import Mock from 'mockjs'

const basePath = '/dev-api'


export default function test() {
  Mock.mock(basePath + '/test/get', {
    code: 200,
    message: 'get测试成功',
    result: 'get测试成功'
  })

  Mock.mock(basePath + '/test/post', {
    code: 200,
    message: 'post测试成功',
    result: 'post测试成功'
  })

  Mock.mock(basePath + '/test/put', {
    code: 200,
    message: 'put测试成功',
    result: 'put测试成功'
  })

  Mock.mock(basePath + '/test/delete', {
    code: 200,
    message: 'delete测试成功',
    result: 'delete测试成功'
  })

  Mock.mock(basePath + '/test/postForm', {
    code: 200,
    message: 'postForm测试成功',
    result: 'postForm测试成功'
  })
}