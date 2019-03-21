export function getPred(features) {
  console.log(features)
  const url = 'http://0.0.0.0:8080'
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(features)
  }).then(res => res.json())
}
