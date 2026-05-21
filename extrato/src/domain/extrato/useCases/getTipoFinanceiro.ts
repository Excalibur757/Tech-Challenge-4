export function getTipoFinanceiro(tipo: string) {
  return tipo === "deposito"
    ? "receita"
    : "despesa";
}