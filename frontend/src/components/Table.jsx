import axios from 'axios'
import React, {useRef} from 'react'
import { toast } from 'react-toastify'
import { TableContainer, Th, Thead, Tr, Td, Tbody } from '../styles/Table'

const Table = ({books, setUpdate, setBooks}) => {

  const deleteRow = async (id) => {
    await axios.delete(`http://localhost:3333/${id}`)
    .then(({data}) => {
        const novoArray = books.filter((book) => book.id !== id)
        setBooks(novoArray)
        toast.success(data)
    })
    .catch(() => toast.error("Não foi possível excluir o registro!"))
  }

  const handleUpdate = (item) => {
    setUpdate(item)
  }

  return (
    <TableContainer>
        <Thead>
            <Tr>
                <Th>Título</Th>
                <Th>Autor(a)</Th>
                <Th>Editora</Th>
            </Tr>
        </Thead>
        <Tbody>
          {
            books.map((item, i) => (
              <Tr key={i}>
                <Td>{item.titulo}</Td>
                <Td>{item.autor}</Td>
                <Td>{item.editora}</Td>
                <Td><button onClick={() => deleteRow(item.id)}>Excluir</button></Td>
                <Td><button onClick={() => handleUpdate(item)}>Editar</button></Td>
              </Tr>
            ))
          }
        </Tbody>
    </TableContainer>
  )
}

export default Table