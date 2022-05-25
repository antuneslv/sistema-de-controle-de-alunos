import express from 'express'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const dirPath = path.join(__dirname, '../', 'data-base')
const filePath = path.join(__dirname, '../', 'data-base', 'students.json')

async function createDataBaseDir(dirPath: string) {
  await fs.promises.mkdir(dirPath)
}

async function createDataBaseFile(dirPath: string) {
  await fs.promises.writeFile(dirPath, JSON.stringify([]))
}

fs.stat(filePath, error => {
  if (error) {
    createDataBaseDir(dirPath)
    createDataBaseFile(filePath)
  }
})

const app = express()

app.use(express.json())

interface Students {
  id: string
  name: string
  firstGrade: number
  secondGrade: number
  average: number
  isApproved: boolean
}

let students: Students[]

fs.stat(filePath, error => {
  if (error) {
    setTimeout(() => {
      const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
      fileReadStream.on('data', chunk => {
        students = JSON.parse(chunk.toString())
      })
    }, 2000)
  } else {
    const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
    fileReadStream.on('data', chunk => {
      students = JSON.parse(chunk.toString())
    })
  }
})

app.get('/alunos', (request, response) => {
  const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  fileReadStream.on('data', chunk => {
    students = JSON.parse(chunk.toString())
  })

  const { aprovados, reprovados } = request.query

  let results

  if (aprovados) {
    results = students.filter(student => student.isApproved === true)
  } else if (reprovados) {
    results = students.filter(student => student.isApproved === false)
  } else {
    results = students
  }

  return response.json(results)
})

app.post('/alunos', (request, response) => {
  const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  fileReadStream.on('data', chunk => {
    students = JSON.parse(chunk.toString())
  })

  const { name, firstGrade, secondGrade } = request.body

  const averageGrade = ((Number(firstGrade) + Number(secondGrade)) / 2).toFixed(
    1,
  )
  const average = Number(averageGrade)
  let isApproved: boolean

  average >= 5 ? (isApproved = true) : (isApproved = false)

  const student = {
    id: uuidv4(),
    name,
    firstGrade,
    secondGrade,
    average,
    isApproved,
  }

  students.push(student)

  const writer = fs.createWriteStream(filePath)
  writer.write(JSON.stringify(students))

  return response.json(student)
})

app.put('/alunos/:id', (request, response) => {
  const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  fileReadStream.on('data', chunk => {
    students = JSON.parse(chunk.toString())
  })

  const { id } = request.params
  const { name, firstGrade, secondGrade } = request.body

  const averageGrade = ((Number(firstGrade) + Number(secondGrade)) / 2).toFixed(
    1,
  )
  const average = Number(averageGrade)
  let isApproved: boolean

  average >= 5 ? (isApproved = true) : (isApproved = false)

  const studentIndex = students.findIndex(student => student.id === id)

  if (studentIndex < 0) {
    return response.status(400).json({ error: 'Aluno não encontrado.' })
  }

  const student = {
    id,
    name,
    firstGrade,
    secondGrade,
    average,
    isApproved,
  }

  students[studentIndex] = student

  const writer = fs.createWriteStream(filePath)
  writer.write(JSON.stringify(students))

  return response.json(student)
})

app.delete('/alunos/:id', (request, response) => {
  const fileReadStream = fs.createReadStream(filePath, { encoding: 'utf8' })
  fileReadStream.on('data', chunk => {
    students = JSON.parse(chunk.toString())
  })

  const { id } = request.params

  const studentIndex = students.findIndex(student => student.id === id)

  if (studentIndex < 0) {
    return response.status(400).json({ error: 'Aluno não encontrado.' })
  }

  students.splice(studentIndex, 1)

  const writer = fs.createWriteStream(filePath)
  writer.write(JSON.stringify(students))

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('\nServer started on port 3333!')
})
