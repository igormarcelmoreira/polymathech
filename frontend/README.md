# Polymathech

## Requisitos

- [Node.js](https://nodejs.org) (LTS)
- [Docker](https://www.docker.com/) (opcional)
- Caso utilize o [VSCode](https://code.visualstudio.com/) como IDE, adicionar as seguintes [extensões](#vscode)
    - ESLint
    - vscode-icons (opcional)
    - Docker (opcional)

## Configuração Inicial

### Delimitadores de linha do Git

```
git config --local core.autocrlf false
git config --local core.safecrlf false
```

### VSCode

Na raiz do projeto, crie um diretório `.vscode` e dentro deste diretório crie dois arquivos, `settings.json` e `extensions.json`, com os seguintes conteúdos respectivamente:

```
// Arquivo settings.json

{
  "eslint.validate": [
    "javascript",
    "typescript",
  ],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
}
```

```
// Arquivo extensions.json

/*
* Na aba Extensions do seu VSCode, digite @recommended
* para instalar as extensões indicadas neste arquivo. 
*/

{
  "recommendations": [
    "ms-azuretools.vscode-docker",
    "dbaeumer.vscode-eslint",
    "vscode-icons-team.vscode-icons",
  ]
}
```

### Dependências do projeto

Após clonar o repositório ou criar uma nova branch, instale/atualize as dependências do projeto utilizando o comando `npm install` ou `npm i`

### Variáveis do projeto

Copie o arquivo `.env.example` para o mesmo diretório e altere o nome da cópia para `.env`. Abra o arquivo `.env` e atualize as variáveis contidas dentro deste arquivo.

Obs.: Para configurar na AWS, utilize o 'Public IPv4 address' da sua EC2 no atributo 'VITE_APP_API_URL' no arquivo `.env`

## Executando o projeto

Abra um terminal na raiz do projeto e execute o comando `npm run dev`