/* eslint-disable no-constant-condition */
import * as readline from 'readline-sync'
import setIntervalPromise from './libs/set-interval-promise'
import {
  testConnection,
  postApi,
  getApi,
  queryParamsAprovedApi,
  queryParamsReprovedApi,
  simpleGetApi,
  putApi,
  deleteApi,
} from './services/api'

console.log('-='.repeat(30))
console.log('Sistema de Controle de Alunos - SCA'.padStart(51, ' '))
console.log('-='.repeat(30), '\n')

interface Student {
  aluno: string
  nota1: number | null
  nota2: number | null
}

interface StudentWithId {
  id: string
  aluno: string
  nota1: number
  nota2: number
}

let student: Student = {
  aluno: '',
  nota1: null,
  nota2: null,
}

function validateInputFirstGrade() {
  do {
    if (student.nota1 === null) {
      const firstGrade = readline.question('\nPrimeira Nota: ')
      student.nota1 = Number(firstGrade)
    } else {
      console.log('Valor inválido. Insira uma nota entre 0 e 10.')
      const firstGrade = readline.question('\nPrimeira Nota: ')
      student.nota1 = Number(firstGrade)
    }
  } while (student.nota1 < 0 || student.nota1 > 10 || isNaN(student.nota1))
}

function validateInputSecondGrade() {
  do {
    if (student.nota2 === null) {
      const secondGrade = readline.question('\nSegunda Nota: ')
      student.nota2 = Number(secondGrade)
    } else {
      console.log('Valor inválido. Insira uma nota entre 0 e 10.')
      const secondGrade = readline.question('\nSegunda Nota: ')
      student.nota2 = Number(secondGrade)
    }
  } while (student.nota2 < 0 || student.nota2 > 10 || isNaN(student.nota2))
}

const mainMenu = [
  'Cadastrar aluno',
  'Consultar alunos',
  'Consultar aprovados/reprovados',
  'Atualizar um aluno',
  'Apagar um aluno do registro',
]

const statusMenu = ['Aprovados', 'Reprovados']

const updateMenu = ['Nome', 'Primeira Nota', 'Segunda Nota']

async function client() {
  const status = await testConnection()
  if (status === 404) {
    return
  } else {
    console.log(
      'Bem vindo ao Sistem de Constrole de Alunos!\nFaça a sua escolha:',
    )
  }
  while (true) {
    const index = readline.keyInSelect(mainMenu, 'Opcao: ', {
      cancel: 'Finalizar programa',
      guide: false,
    })

    if (mainMenu[index] === undefined) {
      console.log('\nObrigado por usar o SCA!')
      console.log('Desenvolvido por Leandro Antunes')
      console.log('https://github.com/antuneslv')
      await setIntervalPromise(
        500,
        1500,
        '\nFechando o programa',
        '.',
        'Fim do programa!',
      )
      break
    } else if (mainMenu[index] === 'Cadastrar aluno') {
      const name = readline.question('\nNome do aluno: ')
      student.aluno = name
      validateInputFirstGrade()
      validateInputSecondGrade()

      await postApi(student)

      student = {
        aluno: '',
        nota1: null,
        nota2: null,
      }
    } else if (mainMenu[index] === 'Consultar alunos') {
      await getApi()
    } else if (mainMenu[index] === 'Consultar aprovados/reprovados') {
      while (true) {
        const index = readline.keyInSelect(statusMenu, 'Escolha uma opcao: ', {
          cancel: 'Voltar.',
          guide: false,
        })

        if (statusMenu[index] === undefined) {
          break
        } else if (statusMenu[index] === 'Aprovados') {
          await queryParamsAprovedApi()
        } else if (statusMenu[index] === 'Reprovados') {
          await queryParamsReprovedApi()
        }
      }
    } else if (mainMenu[index] === 'Atualizar um aluno') {
      const idStudent = readline.question(
        '\nEntre com o id do aluno que voce deseja atualizar. [Opcao "Consultar alunos" para obter o id]:\n',
      )

      while (true) {
        const allStudents = await simpleGetApi()
        const studentIndex = allStudents.findIndex(
          (student: StudentWithId) => student.id === idStudent,
        )

        if (studentIndex < 0) {
          console.log('\nAluno não encontrado')
          break
        }

        const selectedStudent = allStudents[studentIndex]
        const index = readline.keyInSelect(updateMenu, 'Escolha uma opcao: ', {
          cancel: 'Voltar',
          guide: false,
        })

        if (updateMenu[index] === undefined) {
          break
        } else if (updateMenu[index] === 'Nome') {
          const name = readline.question('Atualizar nome: ')
          student.nota1 = selectedStudent.nota1
          student.nota2 = selectedStudent.nota2
          student.aluno = name

          await putApi(idStudent, student)

          student = {
            aluno: '',
            nota1: null,
            nota2: null,
          }
        } else if (updateMenu[index] === 'Primeira Nota') {
          student.aluno = selectedStudent.aluno
          student.nota2 = selectedStudent.nota2
          validateInputFirstGrade()

          await putApi(idStudent, student)

          student = {
            aluno: '',
            nota1: null,
            nota2: null,
          }
        } else if (updateMenu[index] === 'Segunda Nota') {
          student.aluno = selectedStudent.aluno
          student.nota1 = selectedStudent.nota1
          validateInputSecondGrade()

          await putApi(idStudent, student)

          student = {
            aluno: '',
            nota1: null,
            nota2: null,
          }
        }
      }
    } else {
      const idStudent = readline.question(
        '\nEntre com o id do aluno que voce deseja atualizar. [Opcao "Consultar alunos" para obter o id]:\n',
      )
      const allStudents = await simpleGetApi()
      const studentIndex = allStudents.findIndex(
        (student: StudentWithId) => student.id === idStudent,
      )

      if (studentIndex < 0) {
        console.log('\nAluno não encontrado.')
      } else {
        await deleteApi(idStudent)
      }
    }
  }
}

client()
