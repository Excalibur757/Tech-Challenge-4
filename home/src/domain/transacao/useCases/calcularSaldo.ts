import { ExtratoMensalType } from "@/types/!Extrato";

export const calcularSaldo = (
  extratos: ExtratoMensalType
): number => {
  let saldo = 0;

  extratos.forEach((mes) => {
    mes.extratos.forEach((item) => {
      if (
        item.tipo === "deposito" ||
        item.tipo === "estorno"
      ) {
        saldo += item.valor;
      } else {
        saldo -= item.valor;
      }
    });
  });

  return saldo;
};