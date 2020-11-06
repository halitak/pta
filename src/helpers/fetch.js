export const get = (url) => {
  return fetch(url).then((response) => response.json())
}
export const post = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => response.json())
}
export const remove = (url) => {
  return fetch(url, { method: 'DELETE' }).then((response) => response.json())
}
export const put = (url, body) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => response.json())
}
