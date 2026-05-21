type PaginarExtratosProps = {
  extratos: any[];
  paginaAtual: number;
  itensPorPagina: number;
};

export function paginarExtratos({
  extratos,
  paginaAtual,
  itensPorPagina,
}: PaginarExtratosProps) {
  const totalMeses = extratos.length;

  const totalPaginas = Math.ceil(
    totalMeses / itensPorPagina
  );

  const indiceInicio =
    (paginaAtual - 1) * itensPorPagina;

  const indiceFim =
    indiceInicio + itensPorPagina;

  const mesesPaginados =
    extratos.slice(indiceInicio, indiceFim);

  return {
    totalMeses,
    totalPaginas,
    indiceInicio,
    indiceFim,
    mesesPaginados,
  };
}