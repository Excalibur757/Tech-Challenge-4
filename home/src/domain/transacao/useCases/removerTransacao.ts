import { ExtratoMensalType } from "@/types/!Extrato";

export const removerTransacao = (
  extratos: ExtratoMensalType,
  itemId: number
): ExtratoMensalType => {
  return extratos
    .map((extratoMes) => ({
      ...extratoMes,
      extratos: extratoMes.extratos.filter(
        (item) => item.id !== itemId
      ),
    }))
    .filter((extratoMes) => extratoMes.extratos.length > 0);
};