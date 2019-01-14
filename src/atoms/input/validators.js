
import CPF from 'gerador-validador-cpf';

export const validateCPF = cpf => ({
  error: !(CPF.validate(cpf)),
  data: cpf,
});

export const validateName = (name) => {
  const regex = /^[a-zA-Z ]{2,30}$/;
  return { data: name, error: regex.test(name) };
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return { data: email, error: regex.test(email) };
};

export default {
  default: data => ({ data, error: false }),
  email: data => validateEmail(data),
  name: data => validateName(data),
  cpf: data => validateCPF(data),
};
