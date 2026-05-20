import { getTipoFinanceiro } from "./getTipoFinanceiro";

type FiltrosExtrato = {
  busca: string;
  categoria: string;
  tipo: string;
  valorMin: string;
  valorMax: string;
  dataInicio: string;
  dataFim: string;
};

export function filtrarExtratos(
  extratos: any[],
  filtros: FiltrosExtrato
) {
  const {
    busca,
    categoria,
    tipo,
    valorMin,
    valorMax,
    dataInicio,
    dataFim,
  } = filtros;

  return extratos
    .map((mesObj) => {
      const filtrados = mesObj.extratos.filter((item: any) => {
        const texto = item.descricao.toLowerCase();

        const tipoFinanceiro =
          getTipoFinanceiro(item.tipo);

        const matchBusca =
          texto.includes(busca.toLowerCase());

        const matchCategoria =
          categoria
            ? item.tipo === categoria
            : true;

        const matchTipo =
          tipo
            ? tipoFinanceiro === tipo
            : true;

        const matchValorMin =
          valorMin
            ? item.valor >= Number(valorMin)
            : true;

        const matchValorMax =
          valorMax
            ? item.valor <= Number(valorMax)
            : true;

        const matchDataInicio =
          dataInicio
            ? new Date(item.data) >=
              new Date(dataInicio)
            : true;

        const matchDataFim =
          dataFim
            ? new Date(item.data) <=
              new Date(dataFim)
            : true;

        return (
          matchBusca &&
          matchCategoria &&
          matchTipo &&
          matchValorMin &&
          matchValorMax &&
          matchDataInicio &&
          matchDataFim
        );
      });

      return {
        ...mesObj,
        extratos: filtrados,
      };
    })
    .filter(
      (mesObj) =>
        mesObj.extratos.length > 0
    );
}