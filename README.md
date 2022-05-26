# Sistema de Controle de Alunos - SPA

Desafio final do módulo **Técnicas de Programação I | Node.js** do curso de Web Full Stack da Let's Code que consiste em criar um sistema de tema livre usando os conceitos aprendidos no módulo.

Neste programa você consegue:
- Cadastrar um aluno com duas notas, o sistema salva os dados e calcula a média do aluno e também se ele foi aprovado (média maior que 5) ou não.
- Consultar todos os alunos registrados.
- Consultar só os alunos aprovados ou reprovados.
- Alterar algum dado de um aluno.
- Apagar um aluno do registro.

Neste projeto foi criado uma API para fazer requisições servidor/cliente, um servidor back-end e uma interface na parte do cliente para utilização do programa.

A aplicação foi feita em **NodeJs** e programada em **TypeScript** e utiliza as seguintes bibliotecas:

- Axios
- Express
- Readline-sync
- Uuid
- Colors

# Quick Start

## Instalando as dependências

```
npm i
```

## Iniciando o Projeto

Após instalar as dependências utilize os comandos abaixo para iniciar a aplicação.

Em um terminal inicie o servidor:

```
npm run server
```

Em um segundo terminal inicie o programa:

```
npm run client
```

O sistema utiliza o localhost na porta 3333 na rota "alunos" (http://localhost:3333/alunos) para fazer as requisições.

Os dados são persistidos em um arquivo JSON localizado na pasta data-base. Esta pasta é criada uma primeira vez quando o servidor é inicializado.
