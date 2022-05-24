/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios'
import setIntervalPromise from '../libs/set-interval-promise'

const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

interface Student {
  aluno: string
  nota1: number | null
  nota2: number | null
}

export async function testConnection() {
  let connection: number
  await setIntervalPromise(1000, 6000, 'Estabelecendo conexão', '.')
  try {
    const tryConnection = await api.get('alunos')
    connection = tryConnection.status
    return connection
  } catch (error) {
    console.log('Falha na conexão com o servidor.')
    await setIntervalPromise(
      500,
      1500,
      'Fechando o programa',
      '.',
      'Fim do programa!',
    )
    connection = 404
    return connection
  }
}

export async function post(student: Student) {
  try {
    await api.post('alunos', student)
    await setIntervalPromise(
      1000,
      3000,
      'Cadastrando',
      '.',
      `Aluno ${student.aluno} cadastrado com sucesso!`,
    )
  } catch (error) {
    await setIntervalPromise(1000, 3000, 'Cadastrando', '.')
    console.log(
      '\nRequisição negada.\nFalha na conexão com o servidor.\nTente novamente mais tarde.\n',
    )
  }
}

export async function get() {
  try {
    const students = await api.get('alunos')
    await setIntervalPromise(1000, 3000, 'Buscando alunos', '.')
    console.log(students.data)
  } catch (error) {
    await setIntervalPromise(1000, 3000, 'Buscando alunos', '.')
    console.log(
      '\nRequisição negada.\nFalha na conexão com o servidor.\nTente novamente mais tarde.\n',
    )
  }
}

export async function queryParamsAproved() {
  try {
    const students = await api.get('alunos', {
      params: { aprovados: true },
    })
    await setIntervalPromise(1000, 3000, 'Buscando alunos aprovados', '.')
    console.log(students.data)
  } catch (error) {
    await setIntervalPromise(1000, 3000, 'Buscando alunos aprovados', '.')
    console.log(
      '\nRequisição negada.\nFalha na conexão com o servidor.\nTente novamente mais tarde.\n',
    )
  }
}

export async function queryParamsReproved() {
  try {
    const students = await api.get('alunos', {
      params: { reprovados: false },
    })
    await setIntervalPromise(1000, 3000, 'Buscando alunos reprovados', '.')
    console.log(students.data)
  } catch (error) {
    await setIntervalPromise(1000, 3000, 'Buscando alunos reprovados', '.')
    console.log(
      '\nRequisição negada.\nFalha na conexão com o servidor.\nTente novamente mais tarde.\n',
    )
  }
}
