import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

async function callApi() {
  let response
  let data

  response = await api.get('')
  data = response.data
  console.log(data)

  response = await api.get('alunos')
  data = response.data
  console.log(data)
}

callApi()
