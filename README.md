# API Gestão de Pacientes

API REST simples para cadastro e gerenciamento de pacientes, desenvolvida com **Node.js** e **Express** como parte da disciplina de **Desenvolvimento Web Avançado**.

> 🚧 **Projeto em desenvolvimento.** Várias funcionalidades ainda serão implementadas (veja o [Roadmap](#roadmap)).

## Sobre o projeto

O objetivo é simular o back-end de um sistema de gestão de pacientes, permitindo criar, consultar, atualizar e remover registros com dados pessoais, endereço e informações de saúde.

Embora minha stack de foco seja Python/Django, este projeto usa Node.js e Express de propósito: construir uma API "na mão" ajuda a consolidar as bases do desenvolvimento back-end, como HTTP, rotas, middlewares e o ciclo de requisição e resposta.

## Tecnologias

- [Node.js](https://nodejs.org/) (com ES Modules)
- [Express](https://expressjs.com/) 5
- [CORS](https://github.com/expressjs/cors)
- HTML puro para a interface de teste (`index.html`)

## Estrutura do projeto

```
.
├── api.js          # Servidor Express, modelos e rotas
├── index.html      # Formulários para testar a API
├── package.json
└── README.md
```

## Modelos

- **Paciente**: `id`, `token`, `nome`, `data_nascimento`, `genero`, `cpf`, `telefone`, `email`, `endereco`, `tipoSanguineo`, `alergias`, `comorbidades`, `peso`, `altura`
- **Endereco**: `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`
- **Usuario**: `id`, `username`, `nome`, `telefone`, `email`, `senha` (reservado para o futuro login)

## Como executar

**Pré-requisitos:** Node.js instalado.

```bash
# 1. Clone o repositório
git clone https://github.com/tiagoCabralS/apiGestaoPacientes.git
cd apiGestaoPacientes

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
node api.js
```

O servidor sobe em `http://localhost:3000`.

Para usar a interface de teste, abra o `index.html` com uma extensão como o **Live Server** do VS Code, que serve a página em `http://127.0.0.1:5500`. Essa é a origem liberada no CORS.

## Endpoints

| Método | Rota                | Descrição                          | Corpo da requisição        |
|--------|---------------------|------------------------------------|----------------------------|
| GET    | `/paciente/:id`     | Busca um paciente pelo id          | -                          |
| POST   | `/paciente/`        | Cadastra um novo paciente          | Dados do paciente          |
| POST   | `/paciente/edit/`   | Atualiza um paciente existente     | `id` + dados do paciente   |
| POST   | `/paciente/delete/` | Remove um paciente                 | `id`                       |

Os corpos podem ser enviados como **JSON** ou como **formulário HTML** (`application/x-www-form-urlencoded`).

### Campos do paciente

`nome`, `data_nascimento`, `genero`, `cpf`, `telefone`, `email`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`, `tipoSanguineo`, `alergias`, `comorbidades`, `peso`, `altura`

### Exemplos

**Buscar paciente**

```bash
curl http://localhost:3000/paciente/1
```

**Cadastrar paciente**

```bash
curl -L -X POST http://localhost:3000/paciente/ \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "data_nascimento": "1990-05-20",
    "genero": "F",
    "cpf": "12345678900",
    "telefone": "11999999999",
    "email": "maria@email.com",
    "cep": "01001000",
    "rua": "Rua Exemplo",
    "numero": "100",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "tipoSanguineo": "A+",
    "alergias": [],
    "comorbidades": [],
    "peso": 65,
    "altura": 1.65
  }'
```

Após o cadastro ou a atualização, a API redireciona para `GET /paciente/:id`, devolvendo o registro salvo. A opção `-L` do `curl` segue esse redirecionamento.

**Remover paciente**

```bash
curl -X POST http://localhost:3000/paciente/delete/ \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

### Respostas

- `200`: sucesso (retorna o paciente ou uma mensagem de confirmação)
- `404`: paciente não encontrado

```json
{ "erro": "Paciente com id 5 não foi encontrado" }
```

## Observações

- Os dados ficam **em memória**: ao reiniciar o servidor, tudo volta ao estado inicial (um paciente de exemplo).
- O CORS está configurado apenas para `http://127.0.0.1:5500`. Altere em `api.js` se usar outra origem.

## Roadmap

- [ ] Login e autenticação de usuários
- [ ] Persistência em banco de dados
- [ ] Validação dos dados de entrada (CPF, e-mail, datas, etc.)
- [ ] Rota para listar todos os pacientes
- [ ] Testes automatizados

## Autor

**Tiago Cabral** · [GitHub](https://github.com/tiagoCabralS)

Projeto acadêmico, desenvolvido para a disciplina de Desenvolvimento Web Avançado, do IFSP.
