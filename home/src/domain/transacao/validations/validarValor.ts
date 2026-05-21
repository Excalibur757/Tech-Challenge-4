export function validarValor(valor: number) {
  if (valor <= 0) {
    return "O valor deve ser maior que zero";
  }

  if (valor > 100000) {
    return "Valor muito alto";
  }

  return null;
}