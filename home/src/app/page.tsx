"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import SaldoContainer from "@/components/SaldoContainer/SaldoContainer";
import ExtratoContainer from "@/components/ExtratoContainer/ExtratoContainer";
import { listaExtratos } from "../../public/assets/mock";
import { adicionarTransacao } from "@/utils/transacao";
import Alerta from "@/components/Alerta/Alerta";
import FinancialCharts from "@/components/FinancialCharts/FinancialCharts";
import { calcularSaldo } from "@/utils/transacao";
import NovaTransacao from "@/components/NovaTransacao/NovaTransacao";

export default function Home() {
  const { token, loading, userName } = useAuth();
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
  const firstName = userName ? userName.split("@")[0] : "Usuário";
  const [saldo, setSaldo] = useState<number>(() => calcularSaldo(listaExtratos));
  const [extratos, setExtratos] = useState(listaExtratos);

  useEffect(() => {
    if (!loading && !token) {
      window.location.href = "http://localhost:3001/";
    }
  }, [token, loading]);

  useEffect(() => {
    setSaldo(calcularSaldo(extratos));
  }, [extratos]);

  const handleTransactionSubmit = (novaTransacao: any) => {
    const novosExtratos = adicionarTransacao(extratos, novaTransacao);
    setExtratos(novosExtratos);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  if (loading) {
    return <p>Carregando autenticação...</p>;
  }

  return (
    <>
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

        <ExtratoContainer extratos={extratos} setExtratos={setExtratos} />
      </div>
    </>
  );
}