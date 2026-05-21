export function validarAnexo(file: File) {
  const tiposPermitidos = [
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  if (!tiposPermitidos.includes(file.type)) {
    return "Formato inválido. Envie PDF, PNG ou JPG.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "O arquivo deve ter no máximo 5MB.";
  }

  return null;
}