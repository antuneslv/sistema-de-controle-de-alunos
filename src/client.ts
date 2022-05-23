import * as readline from 'readline-sync'
// import axios from 'axios'

console.log('-='.repeat(30))
console.log('Sistema de Controle de Alunos'.padStart(45, ' '))
console.log('-='.repeat(30), '\n')

interface Student {
  name: string
  firstGrade: number
  secondGrade: number
  avarege: number
  aproved: boolean
}

const student: Student[] = [
  {
    name: '',
    firstGrade: -1,
    secondGrade: -1,
    avarege: 0,
    aproved: false,
  },
]

const options = [
  'Cadastrar aluno',
  'Consultar alunos',
  'Consultar aprovados/reprovados',
  'Atualizar um aluno',
  'Apagar um aluno do registro',
]

const index = readline.keyInSelect(options, 'Escolha uma opcao! ', {
  cancel: 'Finalizar programa.',
  guide: false,
})

if (options[index] === undefined) {
  console.log('Fim do programa!')
} else if (options[index] === 'Cadastrar aluno') {
  const name = readline.question('Nome do aluno: ')
  student[0].name = name
  while (
    student[0].firstGrade < 0 ||
    student[0].firstGrade > 10 ||
    isNaN(student[0].firstGrade)
  ) {
    const firstGrade = readline.question('Primeira Nota: ')
    student[0].firstGrade = Number(firstGrade)
  }
  while (
    student[0].secondGrade < 0 ||
    student[0].secondGrade > 10 ||
    isNaN(student[0].secondGrade)
  ) {
    const secondGrade = readline.question('Segunda Nota: ')
    student[0].secondGrade = Number(secondGrade)
  }

  const avarageGrade = (
    (Number(student[0].firstGrade) + Number(student[0].secondGrade)) /
    2
  ).toFixed(1)

  student[0].avarege = Number(avarageGrade)

  student[0].avarege >= 5
    ? (student[0].aproved = true)
    : (student[0].aproved = false)
  console.log(student)
}

// const api = axios.create({
//   baseURL: 'http://localhost:3333/',
// })

// async function callApi() {
//   const response = await api.get('alunos')
//   const data = response.data
//   console.log(data)
// }

// callApi()
