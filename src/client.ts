/* eslint-disable no-constant-condition */
import * as readline from 'readline-sync'
import {
  post,
  get,
  queryParamsAproved,
  queryParamsReproved,
} from './services/api'

console.log('-='.repeat(30))
console.log('Sistema de Controle de Alunos'.padStart(45, ' '))
console.log('-='.repeat(30), '\n')

interface Student {
  aluno: string
  nota1: number | null
  nota2: number | null
  media: number
  aprovado: boolean
}

let student: Student = {
  aluno: '',
  nota1: null,
  nota2: null,
  media: 0,
  aprovado: false,
}

const options = [
  'Cadastrar aluno',
  'Consultar alunos',
  'Consultar aprovados/reprovados',
  'Atualizar um aluno',
  'Apagar um aluno do registro',
]

const optionsTwo = ['Aprovados', 'Reprovados']

async function client() {
  while (true) {
    const index = readline.keyInSelect(options, 'Escolha uma opcao: ', {
      cancel: 'Finalizar programa.',
      guide: false,
    })

    if (options[index] === undefined) {
      console.log('Fim do programa!')
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

      const avarageGrade = (
        (Number(student.nota1) + Number(student.nota2)) /
        2
      ).toFixed(1)

      student.media = Number(avarageGrade)

      student.media >= 5
        ? (student.aprovado = true)
        : (student.aprovado = false)

      await post(student)

      student = {
        aluno: '',
        nota1: null,
        nota2: null,
        media: 0,
        aprovado: false,
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
