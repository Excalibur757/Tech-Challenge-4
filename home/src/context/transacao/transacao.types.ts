import { ExtratoItemType } from "@/types/iFormulario";
import { ExtratoMensalType } from "@/types/!Extrato";

export interface TransacaoState {
  extratos: ExtratoMensalType;
  saldo: number;
}

export type TransacaoAction =
  | {
      type: "ADICIONAR_TRANSACAO";
      payload: any;
    }
  | {
      type: "REMOVER_TRANSACAO";
      payload: number;
    }
  | {
      type: "EDITAR_TRANSACAO";
      payload: ExtratoItemType;
    };