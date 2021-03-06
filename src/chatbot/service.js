export function postMessage(context) {
  var url = 'https://cakechat.replika.ai/cakechat_api/v1/actions/get_response'
  var local = 'http://127.0.0.1:8080/cakechat_api/v1/actions/get_response'
  var message = {
    context: context,
    emotion: 'joy'
  }

  return fetch(local, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(message)
  }).then(res => res.json())
}
