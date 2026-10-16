import express from "express"
import cors from "cors";

class Endereco{
    constructor(cep, rua, numero, bairro, cidade, estado){
        this.cep = cep
        this.rua = rua
        this.numero = numero
        this.bairro = bairro
        this.cidade = cidade
        this.estado = estado
    }
}

class Paciente{
    constructor(
        id, 
        token,
        nome, 
        data_nascimento, 
        genero, 
        cpf, 
        telefone, 
        email, 
        endereco, 
        tipoSanguineo,
        alergias,
        comorbidades,
        peso,
        altura
    ){
        this.id = id
        this.token = token
        this.nome = nome
        this.data_nascimento = data_nascimento
        this.genero = genero
        this.cpf = cpf
        this.telefone = telefone
        this.email = email
        this.endereco = endereco
        this.tipoSanguineo = tipoSanguineo
        this.alergias = alergias
        this.comorbidades = comorbidades
        this.peso = peso
        this.altura = altura
    }
}

class Usuario{
    constructor(id, username, nome, telefone, email, senha){
        this._id = id
        this._username = username
        this.nome = nome
        this.telefone = telefone
        this.email = email
        this._senha = senha
    }
}

// Lista de usuarios que podem fazer LOGIN
let usuariosCadastrados = [
    new Usuario("yuriGabrielGostoso", "Yuri Gabriel", "13676767676", "yuri@email.com", "senhaDoYuri123")
]

// Lista de Pacientes cadastrados
let pacientesCadastrados = [
    new Paciente(1, "123456", "Tiago", "2007-08-13", "M", "67676767676", "13676767676", "yuri@email.com", new Endereco("11111111", "Rua Das Águas", "69", "Joinvile", "Pindamonhangaba", "Acre"), "O+", [], [], 80.5, 2.67)
]

const PORT = 3000

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE"]
}))

app.use(express.json()); // Se estiver enviando via JSON (Fetch/Axios)
app.use(express.urlencoded({ extended: true })); // Se for envio de formulário padrão HTML


// Rotas da API:

// LOGIN do Usuario

// GET Paciente
app.get("/paciente/:id", (req, res) => {
    let id = req.params.id
    let pacienteEncontrado = pacientesCadastrados.find(paciente => {
        return paciente.id == id
    })
    return res.json([pacienteEncontrado || `Paciente com id:${id} não foi encontrado`])
})

// POST novo Paciente


// UPDATE Paciente (Caso exista)

// DELETE Paciente (Caso exista)

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`)
})
