"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";

import { listaExtratos } from "../../../public/assets/mock";

import { adicionarTransacao } from "@/domain/transacao/useCases/adicionarTransacao";
import { calcularSaldo } from "@/domain/transacao/useCases/calcularSaldo";

type TransacaoContextType = {
  extratos: any;
  saldo: number;
  adicionarNovaTransacao: (novaTransacao: any) => void;
  setExtratos: React.Dispatch<React.SetStateAction<any>>;
};

const TransacaoContext =
  createContext<TransacaoContextType | null>(null);

export function TransacaoProvider({
  children,
}: {
  children: ReactNode;
}) {

  // Cache + persistência
  const [extratos, setExtratos] = useState(() => {
    if (typeof window !== "undefined") {
      const extratosSalvos =
        localStorage.getItem("extratos");

      if (extratosSalvos) {
        return JSON.parse(extratosSalvos);
      }
    }

    return listaExtratos;
  });

  // Salva automaticamente no cache
  useEffect(() => {
    localStorage.setItem(
      "extratos",
      JSON.stringify(extratos)
    );
  }, [extratos]);

  // Memoização para performance
  const saldo = useMemo(() => {
    return calcularSaldo(extratos);
  }, [extratos]);

  const adicionarNovaTransacao = (
    novaTransacao: any
  ) => {
    const novosExtratos = adicionarTransacao(
      extratos,
      novaTransacao
    );

    setExtratos(novosExtratos);
  };

  return (
    <TransacaoContext.Provider
      value={{
        extratos,
        saldo,
        adicionarNovaTransacao,
        setExtratos,
      }}
    >
      {children}
    </TransacaoContext.Provider>
  );
}

export function useTransacao() {
  const context = useContext(TransacaoContext);

  if (!context) {
    throw new Error(
      "useTransacao deve ser usado dentro do TransacaoProvider"
    );
  }

  return context;
}