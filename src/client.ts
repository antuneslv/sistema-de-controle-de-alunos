/* eslint-disable no-constant-condition */
import * as readline from 'readline-sync'
import setIntervalPromise from './libs/set-interval-promise'
import {
  testConnection,
  post,
  get,
  queryParamsAproved,
  queryParamsReproved,
} from './services/api'

console.log('-='.repeat(30))
console.log('Sistema de Controle de Alunos - SCA'.padStart(51, ' '))
console.log('-='.repeat(30), '\n')

interface Student {
  aluno: string
  nota1: number | null
  nota2: number | null
}

let student: Student = {
  aluno: '',
  nota1: null,
  nota2: null,
}

const options = [
  'Cadastrar aluno.',
  'Consultar alunos.',
  'Consultar aprovados/reprovados.',
  'Atualizar um aluno.',
  'Apagar um aluno do registro.',
]

const optionsTwo = ['Aprovados', 'Reprovados']

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
    const index = readline.keyInSelect(options, 'Opcao: ', {
      cancel: 'Finalizar programa.',
      guide: false,
    })

    if (options[index] === undefined) {
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
    } else if (options[index] === 'Cadastrar aluno') {
      const name = readline.question('Nome do aluno: ')
      student.aluno = name
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

      await post(student)

      student = {
        aluno: '',
        nota1: null,
        nota2: null,
      }
    } else if (options[index] === 'Consultar alunos') {
      await get()
    } else if (options[index] === 'Consultar aprovados/reprovados') {
      while (true) {
        const index = readline.keyInSelect(optionsTwo, 'Escolha uma opcao: ', {
          cancel: 'Voltar.',
          guide: false,
        })

        if (optionsTwo[index] === undefined) {
          break
        } else if (optionsTwo[index] === 'Aprovados') {
          await queryParamsAproved()
        } else if (optionsTwo[index] === 'Reprovados') {
          await queryParamsReproved()
        }
      }
    }
  }
}

client()
