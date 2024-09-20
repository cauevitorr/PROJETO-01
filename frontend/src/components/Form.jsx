import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FormContainer, Label, Input, Button } from "../styles/Form";
import axios from "axios";

const Form = ( {update, setUpdate, getBooks} ) => {
  const ref = useRef();

  useEffect(() => {
    if(update){
      const book = ref.current;

      book.titulo.value = update.titulo;
      book.autor.value = update.autor;
      book.editora.value = update.editora;
    }
  }, [update])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const book = ref.current;

    if (!book.titulo.value || !book.autor.value || !book.editora.value) {
      return toast.warn("Preencha todos os campos do formulário!");
    }

    if (update) {
      await axios
        .put(`http://localhost:3333/${update.id}`, {
          titulo: book.titulo.value,
          autor: book.autor.value,
          editora: book.editora.value,
        })
        .then(() => toast.success("Livro Atualizado com sucesso!"));
    } else {
      await axios
        .post("http://localhost:3333", {
          titulo: book.titulo.value,
          autor: book.autor.value,
          editora: book.editora.value,
        })
        .then(() => toast.success("Cadastrado com sucesso!"))
        .catch(() => toast.error("Não foi possível cadastrar!"));
    }

    book.titulo.value = "";
    book.autor.value = "";
    book.editora.value = "";

    setUpdate(null)
    getBooks()
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <Label>Titulo</Label>
      <Input name="titulo" />
      <Label>Autor(a)</Label>
      <Input name="autor" />
      <Label>Editora</Label>
      <Input name="editora" />
      <Button type="submit">ADICIONAR</Button>
    </FormContainer>
  );
};

export default Form;
