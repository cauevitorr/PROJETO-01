import { db } from "../db.js"
import { z } from "zod"

const bookSchema = z.object({
 titulo: z.string().trim().min(1, { message: 'Escreva o título do livro.' }),
 autor: z.string().trim().min(1, { message: 'Escreva o nome do autor.' }),
 editora: z.string().trim().min(1, { message: 'Escreva o nome da editora' })
})

export const getBooks = (request, response) => {

 const query = "SELECT * FROM books"

 db.query(query, (error, data) => {
  if (error) {
   return response.json(error)
  }
  return response.status(200).json(data)
 })
}

export const addBook = (request, response) => {

 const validation = bookSchema.safeParse(request.body)

 if (!validation.success) {
  return response.status(400).json({message: 'Escreva corretamente nos respectivos campos'})
 }

 const query = "INSERT INTO books(`titulo`, `autor`, `editora`) VALUES (?)"

 const values = [
  validation.data.titulo,
  validation.data.autor,
  validation.data.editora
 ]

 db.query(query, [values], (error) => {
  if (error) {
   return response.json(error)
  }

  return response.status(200).json("Livro cadastrado com sucesso!")
 })
}

export const updateBook = (request, response) => {

 const validation = bookSchema.safeParse(request.body)
 if (!validation.success) {
  return response.status(400).json(validation.success.issues)
 }

 const query = "UPDATE books SET `titulo` = ?, `autor` = ?, `editora` = ? WHERE `id` = ?";

 const values = [
  validation.data.titulo,
  validation.data.autor,
  validation.data.editora
 ]

 db.query(query, [...values, request.params.id], (error) => {
  if (error) {
   return response.json(error)
  }

  response.status(200).json("Livro atualizado com sucesso!")
 })

}

export const deleteBook = (request, response) => {

 const query = "DELETE from books WHERE `id`= ?";

 db.query(query, [request.params.id], (error) => {
  if (error) {
   return response.status(500).json(error)
  }

  return response.status(200).json("Registro deletado com sucesso!")
 })

}
