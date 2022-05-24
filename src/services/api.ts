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
  media: number
  aprovado: boolean
}

export async function callApiPost(student: Student) {
  try {
    await api.post('alunos', student)
    await setIntervalPromise(
      () => {},
      1000,
      'Cadastrando',
      '. ',
      `Aluno ${student.aluno} cadastrado com sucesso!`,
    )
  } catch (error) {
    console.log(
      '\nRequisição negada.\nFalha na conexão com o servidor.\nTente novamente mais tarde.\n',
    )
  }
}
