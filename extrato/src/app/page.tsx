"use client";

import { useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import { useExtratoFiltros } from "@/hooks/useExtratoFiltros";

import Sidebar from "@/components/Sidebar/Sidebar";

import ExtratoFiltros from "@/components/ExtratoFiltros/ExtratoFiltros";
import ExtratoLista from "@/components/ExtratoLista/ExtratoLista";
import ExtratoPaginacao from "@/components/ExtratoPaginacao/ExtratoPaginacao";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

import styles from "./page.module.css";
import { opcoesTransacao } from "../../public/assets/mock";

export default function ExtratoPage() {
  const { token, loading } = useAuth();

  const {
    // filtros
    busca,
    setBusca,

    categoria,
    setCategoria,

    tipo,
    setTipo,

    valorMin,
    setValorMin,

    valorMax,
    setValorMax,

    dataInicio,
    setDataInicio,

    dataFim,
    setDataFim,

    // paginação
    paginaAtual,

    totalMeses,
    totalPaginas,
    indiceFim,
    mesesPaginados,

    irParaPagina,
    irParaAnterior,
    irParaProxima,
    paginasParaExibir,
  } = useExtratoFiltros();

  // autenticação
  useEffect(() => {
    if (!loading && !token) {
      window.location.href =
        "http://localhost:3001/";
    }
  }, [token, loading]);

  // loading
  if (loading) {
    return (
      <LoadingScreen
        titulo="Carregando extrato..."
        subtitulo="Preparando suas transações financeiras"
        delay={1000}
      />
    );
  }

  return (
    <div className={styles.containerTudo}>
      <Sidebar
        width={"100%"}
        height=""
      />

      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>
          Extrato
        </h1>

        <ExtratoFiltros
          busca={busca}
          setBusca={setBusca}
          categoria={categoria}
          setCategoria={setCategoria}
          tipo={tipo}
          setTipo={setTipo}
          valorMin={valorMin}
          setValorMin={setValorMin}
          valorMax={valorMax}
          setValorMax={setValorMax}
          dataInicio={dataInicio}
          setDataInicio={setDataInicio}
          dataFim={dataFim}
          setDataFim={setDataFim}
          opcoesTransacao={opcoesTransacao}
        />

        <div
          className={
            styles.contadorResultados
          }
        >
          <p>
            Mostrando{" "}
            {Math.min(
              indiceFim,
              totalMeses
            )}{" "}
            de {totalMeses} meses
            {totalMeses === 0
              ? ""
              : ` - Página ${paginaAtual} de ${totalPaginas}`}
          </p>
        </div>

        <ExtratoLista
          mesesPaginados={
            mesesPaginados
          }
        />

        {totalPaginas > 1 && (
          <ExtratoPaginacao
            paginaAtual={
              paginaAtual
            }
            totalPaginas={
              totalPaginas
            }
            irParaPagina={
              irParaPagina
            }
            irParaAnterior={
              irParaAnterior
            }
            irParaProxima={
              irParaProxima
            }
            paginasParaExibir={paginasParaExibir()}
          />
        )}
      </div>
    </div>
  );
}