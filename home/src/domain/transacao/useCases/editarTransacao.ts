import { ExtratoItemType } from "@/types/iFormulario";
import { ExtratoMensalType } from "@/types/!Extrato";

export const editarTransacao = (
  extratos: ExtratoMensalType,
  itemEditado: ExtratoItemType
): ExtratoMensalType => {
  return extratos.map((extratoMes) => ({
    ...extratoMes,
    extratos: extratoMes.extratos.map((item) =>
      item.id === itemEditado.id ? itemEditado : item
    ),
  }));
};