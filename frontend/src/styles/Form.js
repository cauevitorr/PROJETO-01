import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

export const Label = styled.label`
    font-size: 36px;
`;

export const Input = styled.input`
    max-width: 120px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
    padding: 0 10px;
`;

export const Button = styled.button`
    padding: 15px;
    background-color: purple;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;
