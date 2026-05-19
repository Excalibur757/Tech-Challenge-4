export function validarDescricao(texto: string) {
  if (texto.trim().length < 3) {
    return "A descrição deve ter pelo menos 3 caracteres";
  }

  return null;
}