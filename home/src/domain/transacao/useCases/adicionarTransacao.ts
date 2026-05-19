import { ExtratoMensalType } from "@/types/!Extrato";
import { ExtratoItemType, FormularioType } from "@/types/iFormulario";
import dayjs from "dayjs";


export const adicionarTransacao = (
  extratos: ExtratoMensalType,
  novaTransacao: FormularioType
): ExtratoMensalType => {
  const mesAtual = dayjs().format("MMMM").toLowerCase();

  const mesEncontrado = extratos.find(
    (e) => e.mes.toLowerCase() === mesAtual
  );

  const novoId = Date.now();

  const transacaoCompleta: ExtratoItemType = {
    ...novaTransacao,
    id: novoId,
    data: dayjs().format("YYYY-MM-DD"),
    valor: novaTransacao.valor,
  };

  if (mesEncontrado) {
    return extratos.map((e) =>
      e.mes.toLowerCase() === mesAtual
        ? {
            ...e,
            extratos: [transacaoCompleta, ...e.extratos],
          }
        : e
    );
  }

  const novoGrupoMes = {
    mes: mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1),
    extratos: [transacaoCompleta],
  };

  return [novoGrupoMes, ...extratos];
};

