import axios from 'axios'
import setIntervalPromise from '../libs/set-interval-promise'
import colors from 'colors'

const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

interface Student {
  name: string
  firstGrade: number | null
  secondGrade: number | null
}

export async function testConnection() {
  let connection: number
  await setIntervalPromise(
    1000,
    6000,
    colors.italic('Estabelecendo conexão'),
    colors.italic('.'),
  )
  try {
    const tryConnection = await api.get('alunos')
    connection = tryConnection.status
    return connection
  } catch (error) {
    console.log(colors.red('Falha na conexão com o servidor.'))
    await setIntervalPromise(
      750,
      2250,
      colors.italic('Fechando o programa'),
      colors.italic('.'),
      'Fim do programa!',
    )
    connection = 404
    return connection
  }
}

export async function postApi(student: Student) {
  try {
    await api.post('alunos', student)
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nCadastrando'),
      '.',
      colors.green(
        `Aluno(a) ${colors.white(student.name)} cadastrado(a) com sucesso!`,
      ),
    )
  } catch (error) {
    await setIntervalPromise(1000, 3000, colors.italic('\nCadastrando'), '.')
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
  }
}

export async function getApi() {
  try {
    const students = await api.get('alunos')
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nBuscando alunos'),
      colors.italic('.'),
    )
    return students.data
  } catch (error) {
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nBuscando alunos'),
      colors.italic('.'),
    )
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
    const connection = 404
    return connection
  }
}

export async function queryParamsAprovedApi() {
  try {
    const students = await api.get('alunos', {
      params: { aprovados: true },
    })
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nBuscando alunos aprovados'),
      colors.italic('.'),
    )
    return students.data
  } catch (error) {
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nBuscando alunos aprovados'),
      colors.italic('.'),
    )
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
    const connection = 404
    return connection
  }
}

export async function queryParamsReprovedApi() {
  try {
    const students = await api.get('alunos', {
      params: { reprovados: false },
    })
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nBuscando alunos reprovados'),
      colors.italic('.'),
    )
    return students.data
  } catch (error) {
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nBuscando alunos reprovados'),
      colors.italic('.'),
    )
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
    const connection = 404
    return connection
  }
}

export async function simpleGetApi() {
  try {
    const students = await api.get('alunos')
    return students.data
  } catch (error) {
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
    const connection = 404
    return connection
  }
}

export async function putApi(id: string, student: Student) {
  try {
    await api.put(`alunos/${id}`, student)
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nAtualizando'),
      colors.italic('.'),
      colors.green('Dado atualizado com sucesso!'),
    )
  } catch (error) {
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nAtualizando'),
      colors.italic('.'),
    )
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
  }
}

export async function deleteApi(id: string) {
  try {
    await api.delete(`alunos/${id}`)
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nApagando do registro'),
      colors.italic('.'),
      colors.green('Aluno apagado com sucesso!'),
    )
  } catch (error) {
    await setIntervalPromise(
      1000,
      3000,
      colors.italic('\nApagando do registro'),
      colors.italic('.'),
    )
    console.log(
      colors.red('Requisição negada.\nFalha na conexão com o servidor.'),
    )
    console.log('Tente novamente mais tarde.')
  }
}
