export function postMessage() {
  var url = 'http://127.0.0.1:8080/cakechat_api/v1/actions/get_response'
  var message = {
    context: ['Hello', 'Hi!', 'How are you?'],
    emotion: 'joy'
  }

  return fetch(url, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(message)
  }).then(res => res.json())
}