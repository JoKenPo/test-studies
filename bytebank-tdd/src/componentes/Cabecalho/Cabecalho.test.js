import { render, screen } from '@testing-library/react';
import Cabecalho from './index';

// test('Primeiro teste', () => {
//   const numero = 10;
//   expect(numero).toBe(10);
// });

test('Deve renderizar o nome do usuário logado', () => {
  render(<Cabecalho />);
  const nomeUsuario = screen.getByText('Joana Fonseca Gomes'); // Procura pelo texto na tela
  expect(nomeUsuario).toBeInTheDocument(); // Espera que esteja no documento
});
