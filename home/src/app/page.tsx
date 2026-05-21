"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTransacao } from "@/context/transacao/TransacaoContext";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import SaldoContainer from "@/components/SaldoContainer/SaldoContainer";
import Alerta from "@/components/Alerta/Alerta";
import dynamic from "next/dynamic";
import LoadingCard from "@/components/LoadingCard/LoadingCard";
import { delayImport } from "@/utils/delayImport";

const FinancialCharts = dynamic(
  () =>
    delayImport(
      () =>
        import(
          "@/components/FinancialCharts/FinancialCharts"
        ),
      600
    ),
  {
    loading: () => (
      <LoadingCard texto="Carregando gráficos financeiros..." />
    ),
  }
);

const NovaTransacao = dynamic(
  () =>
    delayImport(
      () =>
        import(
          "@/components/NovaTransacao/NovaTransacao"
        ),
      800
    ),
  {
    loading: () => (
      <LoadingCard texto="Preparando formulário..." />
    ),
  }
);

const ExtratoContainer = dynamic(
  () =>
    delayImport(
      () =>
        import(
          "@/components/ExtratoContainer/ExtratoContainer"
        ),
      500
    ),
  {
    loading: () => (
      <LoadingCard texto="Carregando extratos..." />
    ),
  }
);

export default function Home() {
  const { token, loading, userName } = useAuth();

  const {
  extratos,
  saldo,
  adicionarNovaTransacao,
  setExtratos,
} = useTransacao();

  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);

  const firstName = userName
    ? userName.split("@")[0]
    : "Usuário";

  useEffect(() => {
    if (!loading && !token) {
      window.location.href = "http://localhost:3001/";
    }
  }, [token, loading]);

  const handleTransactionSubmit = (novaTransacao: any) => {
    adicionarNovaTransacao(novaTransacao);

    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <LoadingCard texto="Verificando autenticação..." />
      </div>
    );
  }

  return (
    <div className={styles.containerTudo}>
      <Sidebar width={"100%"} height="" />

      <div className={styles.conteudoContainer}>
        {mostrarAlerta && (
          <Alerta
            tipo="sucesso"
            mensagem="🎉 Sucesso! Transação adicionada com êxito."
          />
        )}

        <SaldoContainer
          height="40%"
          key={firstName}
          firstName={firstName}
          valor={saldo}
        />

        <div className={styles.financialSection}>
          <FinancialCharts extratos={extratos} />
        </div>

        <NovaTransacao
          onTransacaoAdicionada={handleTransactionSubmit}
          loading={loading}
        />
      </div>

      <ExtratoContainer
        extratos={extratos}
        setExtratos={setExtratos}
      />
    </div>
  );
}