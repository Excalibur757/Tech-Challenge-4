import { ExtratoItemType, FormularioType } from "@/types/iFormulario";
import dayjs from "dayjs";
import { listaExtratos } from "../../public/assets/mock";

export type ExtratoMensalType = {
  mes: string;
  extratos: ExtratoItemType[];
}[];

export const adicionarTransacao = (
  extratos: ExtratoMensalType,
  novaTransacao: FormularioType
): ExtratoMensalType => {
  const mesAtual = dayjs().format("MMMM").toLowerCase();
  const mesEncontrado = extratos.find((e) => e.mes.toLowerCase() === mesAtual);

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
        ? { ...e, extratos: [transacaoCompleta, ...e.extratos] }
        : e
    );
  } else {
    const novoGrupoMes = {
      mes: mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1),
      extratos: [transacaoCompleta],
    };
    return [novoGrupoMes, ...extratos];
  }
};

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

export const removerTransacao = (
  extratos: ExtratoMensalType,
  itemId: number
): ExtratoMensalType => {
  return extratos
    .map((extratoMes) => ({
      ...extratoMes,
      extratos: extratoMes.extratos.filter((item) => item.id !== itemId),
    }))
    .filter((extratoMes) => extratoMes.extratos.length > 0);
};

export function calcularSaldo(extratos: typeof listaExtratos) {
    let saldo = 0;

    extratos.forEach((mes) => {
      mes.extratos.forEach((item) => {
        if (item.tipo === "deposito" || item.tipo === "estorno") {
          saldo += item.valor;
        } else {
          saldo -= item.valor;
        }
      });
    });

    return saldo;
  }

export function validarValor(valor: number) {
  if (valor <= 0) return "O valor deve ser maior que zero";
  if (valor > 100000) return "Valor muito alto";
  return null;
}

export function validarDescricao(texto: string) {
  if (texto.trim().length < 3)
    return "A descrição deve ter pelo menos 3 caracteres";
  return null;
}

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