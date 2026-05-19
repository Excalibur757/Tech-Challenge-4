import { calcularSaldo } from "@/domain/transacao/useCases/calcularSaldo";
import { adicionarTransacao } from "@/domain/transacao/useCases/adicionarTransacao";
import { editarTransacao } from "@/domain/transacao/useCases/editarTransacao";
import { removerTransacao } from "@/domain/transacao/useCases/removerTransacao";

import { TransacaoState, TransacaoAction } from "./transacao.types";

export function transacaoReducer(
  state: TransacaoState,
  action: TransacaoAction
): TransacaoState {
  switch (action.type) {
    case "ADICIONAR_TRANSACAO": {
      const novosExtratos = adicionarTransacao(
        state.extratos,
        action.payload
      );

      return {
        extratos: novosExtratos,
        saldo: calcularSaldo(novosExtratos),
      };
    }

    case "REMOVER_TRANSACAO": {
      const novosExtratos = removerTransacao(
        state.extratos,
        action.payload
      );

      return {
        extratos: novosExtratos,
        saldo: calcularSaldo(novosExtratos),
      };
    }

    case "EDITAR_TRANSACAO": {
      const novosExtratos = editarTransacao(
        state.extratos,
        action.payload
      );

      return {
        extratos: novosExtratos,
        saldo: calcularSaldo(novosExtratos),
      };
    }

    default:
      return state;
  }
}