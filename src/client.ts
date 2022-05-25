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
import colors from 'colors'

console.log(colors.bgBlue.black('\n=' + '-='.repeat(30)))
console.log(
  colors.bgBlue.black(
    '|' +
      colors.bold('Sistema de Controle de Alunos - SCA'.padStart(47, ' ')) +
      '|'.padStart(13, ' '),
  ),
)
console.log(colors.bgBlue.black('=' + '-='.repeat(30) + '\n'))

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

interface fullStudentData {
  id: string
  aluno: string
  nota1: number
  nota2: number
  media: number
  aprovado: boolean
}

let student: Student = {
  aluno: '',
  nota1: null,
  nota2: null,
}

function validateInputName() {
  const regexName = /^[A-Za-z ãáâéêèëíõóôúüçñø-]+$/
  do {
    if (student.aluno === '') {
      const name = readline.question('\nNome do aluno: ')
      student.aluno = name
    } else {
      console.log('Entre com um nome válido.')
      const name = readline.question('\nNome do aluno: ')
      student.aluno = name
    }
  } while (!regexName.test(student.aluno))
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
      `Bem vindo ao ${colors.bold(
        'Sistem de Constrole de Alunos!',
      )}\nFaça a sua escolha:`,
    )
  }
  while (true) {
    const index = readline.keyInSelect(mainMenu, colors.bold('Opcao: '), {
      cancel: 'Finalizar programa',
      guide: false,
    })

    if (mainMenu[index] === undefined) {
      console.log('\nObrigado por usar o SCA!')
      console.log(`Desenvolvido por ${colors.blue.bold('Leandro V. Antunes')}`)
      console.log(colors.blue.italic('https://github.com/antuneslv'))
      await setIntervalPromise(
        750,
        2250,
        colors.italic('\nFechando o programa'),
        colors.italic('.'),
        'Fim do programa!',
      )
      break
    } else if (mainMenu[index] === 'Cadastrar aluno') {
      validateInputName()
      validateInputFirstGrade()
      validateInputSecondGrade()

      await postApi(student)

      student = {
        aluno: '',
        nota1: null,
        nota2: null,
      }
    } else if (mainMenu[index] === 'Consultar alunos') {
      const students = await getApi()
      if (students === 404) {
        continue
      } else {
        students.forEach((student: fullStudentData) => {
          const firstGrade = `${student.nota1}`
          const secondGrade = `${student.nota2}`
          const avarage = `${student.media}`
          let status
          student.aprovado === true
            ? (status = colors.green('Aprovado'))
            : (status = colors.red('Reprovado'))

          console.log(
            `${colors.bold('Id do aluno:')} ${colors.cyan(student.id)}`,
          )
          console.log(
            `${colors.bold('Aluno(a):')} ${colors.cyan(student.aluno)}`,
          )
          console.log(
            `${colors.bold('Primeira Nota:')} ${colors.cyan(
              firstGrade,
            )} | ${colors.bold('Segunda Nota:')} ${colors.cyan(
              secondGrade,
            )} | ${colors.bold('Média:')} ${colors.cyan(avarage)}`,
          )
          console.log(`${colors.bold('Situação:')} ${status}\n`)
          console.log('-'.repeat(60) + '\n')
        })
      }
    } else if (mainMenu[index] === 'Consultar aprovados/reprovados') {
      while (true) {
        const index = readline.keyInSelect(statusMenu, colors.bold('Opcao: '), {
          cancel: 'Voltar',
          guide: false,
        })

        if (statusMenu[index] === undefined) {
          break
        } else if (statusMenu[index] === 'Aprovados') {
          const students = await queryParamsAprovedApi()
          if (students === 404) {
            break
          } else {
            students.forEach((student: fullStudentData) => {
              const avarage = `${student.media}`

              console.log(
                `${colors.bold('Aluno(a):')} ${colors.cyan(
                  student.aluno,
                )} | ${colors.bold('Média:')} ${colors.cyan(avarage)}\n`,
              )
              console.log('-'.repeat(60) + '\n')
            })
          }
        } else if (statusMenu[index] === 'Reprovados') {
          const students = await queryParamsReprovedApi()
          if (students === 404) {
            break
          } else {
            students.forEach((student: fullStudentData) => {
              const avarage = `${student.media}`

              console.log(
                `${colors.bold('Aluno(a):')} ${colors.cyan(
                  student.aluno,
                )} | ${colors.bold('Média:')} ${colors.cyan(avarage)}\n`,
              )
              console.log('-'.repeat(60) + '\n')
            })
          }
        }
      }
    } else if (mainMenu[index] === 'Atualizar um aluno') {
      const idStudent = readline.question(
        '\nEntre com o id do aluno que voce deseja atualizar. [Opcao "Consultar alunos" para obter o id]:\n',
      )

      while (true) {
        const allStudents = await simpleGetApi()
        if (allStudents === 404) {
          break
        }
        const studentIndex = allStudents.findIndex(
          (student: StudentWithId) => student.id === idStudent,
        )

        if (studentIndex < 0) {
          console.log(colors.yellow('Aluno não encontrado.'))
          break
        }

        const selectedStudent = allStudents[studentIndex]
        const index = readline.keyInSelect(updateMenu, colors.bold('Opcao: '), {
          cancel: 'Voltar',
          guide: false,
        })

        if (updateMenu[index] === undefined) {
          break
        } else if (updateMenu[index] === 'Nome') {
          student.nota1 = selectedStudent.nota1
          student.nota2 = selectedStudent.nota2
          validateInputName()

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
        '\nEntre com o id do aluno que voce deseja apagar do registro. [Opcao "Consultar alunos" para obter o id]:\n',
      )
      const allStudents = await simpleGetApi()
      if (allStudents === 404) {
        continue
      } else {
        const studentIndex = allStudents.findIndex(
          (student: StudentWithId) => student.id === idStudent,
        )

        if (studentIndex < 0) {
          console.log(colors.yellow('Aluno não encontrado.'))
        } else {
          const selectedStudent = allStudents[studentIndex]
          console.log(
            colors.yellow(
              '\nAtenção, esse procedimento excluirá pemanentemente os dados do registro.',
            ),
          )
          console.log(
            `Você tem certeza que deseja excluir o aluno(a) ${colors.blue.bold(
              selectedStudent.aluno,
            )}?`,
          )
          const deletStudent = readline
            .question(
              `Digite ${colors.red.bold('Sim')} para validar sua escolha: `,
            )
            .toUpperCase()
          if (deletStudent === 'Sim'.toUpperCase()) {
            await deleteApi(idStudent)
          } else {
            continue
          }
        }
      }
    }
  }
}

client()
