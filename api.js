import express from "express"
import cors from "cors";
import jwt from "jsonwebtoken";

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

// Array de usuarios que podem fazer LOGIN
let usuariosCadastrados = [
    new Usuario(1, "yuriGabriel", "Yuri Gabriel", "13676767676", "yuri@email.com", "senhaDoYuri123")
]

// Array de Pacientes cadastrados
let pacientesCadastrados = [
    new Paciente(1, 1, "Tiago", "2007-08-13", "M", "67676767676", "13676767676", "yuri@email.com", new Endereco("11111111", "Rua Das Águas", "69", "Joinvile", "Pindamonhangaba", "Acre"), "O+", [], [], 80.5, 2.67)
]

const PORT = 3000
const ACCES_TOKEN_KEY = "iuhiewuohc8e3chnc2n83fncn3c"

const app = express()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE"]
}))

app.use(express.json()); // Se estiver enviando via JSON (Fetch/Axios)
app.use(express.urlencoded({ extended: true })); // Se for envio de formulário padrão HTML


// Rotas da API:

// LOGIN do Usuario
app.post("/usuario/login", (req, res) => {
    const {username, senha} = req.body

    let usuarioEncontrado = false
    for (let usuario of usuariosCadastrados){
        if (usuario._username === username && usuario._senha === senha){
            usuarioEncontrado = true
        }
    }

    if (!usuarioEncontrado){
        return res.status(403).json({error: "Usuário ou senha inválidos!"})
    }

    const token = jwt.sign({username}, ACCES_TOKEN_KEY, {
        expiresIn: "15m",
    })

    return res.json({ token })
})

app.get("/usuario/validacao", (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(403).json({error: "Não autorizado"}) 

    jwt.verify(token, ACCES_TOKEN_KEY, (err, username) => {
        if (err) return res.status(403).json({error: "Não autorizado"})
        
        return res.json({message: "Acesso autorizado!", username})
    })
})

// GET Paciente
app.get("/paciente/:id", (req, res) => {
    let id = Number(req.params.id)
    let pacienteEncontrado = pacientesCadastrados.find(
        paciente => paciente && paciente.id === id
    )
    if (!pacienteEncontrado){
        return res.status(404).json({
            erro: `Paciente com id ${id} não foi encontrado`
        })
    }
    return res.json(pacienteEncontrado)
})

// POST novo Paciente
app.post("/paciente/", (req, res) => { 
    let id = null
    let ultimo_id = null
    try {
        ultimo_id = Number(pacientesCadastrados.at(-1).id)
    }
    catch (error){
        ultimo_id = 0
    }
    if (ultimo_id && ultimo_id != undefined){
        id = ultimo_id + 1
    }
    else{
        id = 1
    }
    let token = null
    let ultimo_token = null
    try {
        ultimo_token = pacientesCadastrados.at(-1).token
    }
    catch (error) {
        ultimo_token = 0
    }
    if (ultimo_token && ultimo_token != undefined){
        token = ultimo_token + 1
    }
    else{
        token = 1
    }
    const { 
        nome, data_nascimento, genero, cpf, telefone, email, cep, rua, numero, bairro, cidade, estado, tipoSanguineo, alergias, comorbidades, peso, altura 
    } = req.body
    
    const endereco = new Endereco(cep, rua, numero, bairro, cidade, estado)

    let novoPaciente = new Paciente(id, token, nome, data_nascimento, genero, cpf, telefone, email, endereco, tipoSanguineo, alergias, comorbidades, peso, altura)

    pacientesCadastrados.push(novoPaciente)

    return res.redirect(`/paciente/${id}`)
})

// UPDATE Paciente (Caso exista)
app.post("/paciente/edit/", (req, res) => {
    let id = req.body.id
    let nome = req.body.nome 
    let data_nascimento = req.body.data_nascimento 
    let genero = req.body.genero
    let cpf = req.body.cpf
    let telefone = req.body.telefone
    let email = req.body.email
    // (cep, rua, numero, bairro, cidade, estado)
    let cep = req.body.cep
    let rua = req.body.rua
    let numero = req.body.numero
    let bairro = req.body.bairro
    let cidade = req.body.cidade
    let estado = req.body.estado
    let tipoSanguineo = req.body.tipoSanguineo
    let alergias = req.body.alergias
    let comorbidades = req.body.comorbidades
    let peso = req.body.peso
    let altura = req.body.altura

    let endereco = new Endereco(cep, rua, numero, bairro, cidade, estado)

    for (let i = 0; i < pacientesCadastrados.length; i++){
        if (pacientesCadastrados[i].id == id){
            pacientesCadastrados[i].nome = nome
            pacientesCadastrados[i].data_nascimento = data_nascimento
            pacientesCadastrados[i].genero = genero
            pacientesCadastrados[i].cpf = cpf
            pacientesCadastrados[i].telefone = telefone
            pacientesCadastrados[i].email = email
            pacientesCadastrados[i].tipoSanguineo = tipoSanguineo
            pacientesCadastrados[i].alergias = alergias
            pacientesCadastrados[i].comorbidades = comorbidades
            pacientesCadastrados[i].peso = peso
            pacientesCadastrados[i].altura = altura
            pacientesCadastrados[i].endereco = endereco
        }
    }

    return res.redirect(`/paciente/${id}`)
})

// DELETE Paciente (Caso exista)
app.post("/paciente/delete/", (req, res) =>{
    let indice = null
    let id = Number(req.body.id) 
    for (let i in pacientesCadastrados){
        if (Number(pacientesCadastrados[i].id) === id){
            indice = i
        }
    }
    
    if (indice){
        pacientesCadastrados.splice(indice, 1)
        return res.status(200).json({
            message: `Paciente com id ${id} foi deletado com sucesso.`
        })
    }
    else{
        return res.status(404).json({
            erro: `Paciente com id ${id} não foi encontrado.`
        })
    }
    
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`)
})
