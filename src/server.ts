import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(express.json())

interface Students {
  id: string
  aluno: string
  nota1: number
  nota2: number
  media: number
  aprovado: boolean
}

const students: Students[] = []

app.get('/alunos', (request, response) => {
  const { aprovados, reprovados } = request.query

  let results: Students[]

  if (aprovados) {
    results = students.filter(student => student.aprovado === true)
  } else if (reprovados) {
    results = students.filter(student => student.aprovado === false)
  } else {
    results = students
  }

  return response.json(results)
})

app.post('/alunos', (request, response) => {
  const { aluno, nota1, nota2, media, aprovado } = request.body

  const student = { id: uuidv4(), aluno, nota1, nota2, media, aprovado }

  students.push(student)

  return response.json(student)
})

app.put('/alunos/:id', (request, response) => {
  const { id } = request.params
  const { aluno, nota1, nota2, media, aprovado } = request.body

  const studentIndex = students.findIndex(student => student.id === id)

  if (studentIndex < 0) {
    return response.status(400).json({ error: 'Aluno não encontrado.' })
  }

  const student = {
    id,
    aluno,
    nota1,
    nota2,
    media,
    aprovado,
  }

  students[studentIndex] = student

  return response.json(student)
})

app.delete('/alunos/:id', (request, response) => {
  const { id } = request.params

  const studentIndex = students.findIndex(student => student.id === id)

  if (studentIndex < 0) {
    return response.status(400).json({ error: 'Aluno não encontrado.' })
  }

  students.splice(studentIndex, 1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
