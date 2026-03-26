import { useState, useEffect } from "react"

function App() {

  const [alunos, setAlunos] = useState([])
  const [rm, setRm] = useState("")
  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [nomeresp, setNomeresp] = useState("")
  const [cpfresp, setCpfresp] = useState("")
  const [horariosaida, setHorariosaida] = useState("")

  function carregarAlunos() {
    fetch("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(data => setAlunos(data))
  }

  useEffect(() => {
    carregarAlunos()
  }, [])

  function cadastrarAluno() {

    fetch("http://localhost:3000/alunos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rm,
        nome,
        endereco,
        nomeresp,
        cpfresp,
        horariosaida
      })
    })
      .then(() => {
        carregarAlunos()
        setRm("")
        setNome("")
        setEndereco("")
        setNomeresp("")
        setCpfresp("")
        setHorariosaida("")
      })

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Cadastro de Alunos</h1>

      <input
        placeholder="RM"
        value={rm}
        onChange={(e) => setRm(e.target.value)}
      />

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
      />

      <input
        placeholder="Nome do Responsável"
        value={nomeresp}
        onChange={(e) => setNomeresp(e.target.value)}
      />

      <input
        placeholder="CPF do Responsável"
        value={cpfresp}
        onChange={(e) => setCpfresp(e.target.value)}
      />

      <input
        placeholder="Horario de saida"
        value={horariosaida}
        onChange={(e) => setHorariosaida(e.target.value)}
      />


      <button onClick={cadastrarAluno}>
        Cadastrar
      </button>

      <h2>Lista de Alunos</h2>

      <table border="1">

        <thead>
          <tr>
            <th>RM</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Nome do Responsável</th>
            <th>CPF do Responsável</th>
            <th>Horario de saída</th>
          </tr>
        </thead>

        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.rm}>
              <td>{aluno.rm}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.endereco}</td>
              <td>{aluno.nomeresp}</td>
              <td>{aluno.cpfresp}</td>
              <td>{aluno.horariosaida}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>

  )
}

export default App