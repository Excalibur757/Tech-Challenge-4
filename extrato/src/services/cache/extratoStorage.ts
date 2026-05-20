const STORAGE_KEY = "extratos";

export function salvarExtratos(
  extratos: any
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(extratos)
  );
}

export function obterExtratos() {
  const extratosSalvos =
    localStorage.getItem(
      STORAGE_KEY
    );

  return extratosSalvos
    ? JSON.parse(extratosSalvos)
    : null;
}

export function removerExtratos() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}