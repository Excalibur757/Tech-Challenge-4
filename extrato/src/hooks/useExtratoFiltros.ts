"use client";

import {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  obterExtratos,
} from "@/services/cache/extratoStorage";

import {
  listaExtratos,
} from "@/../public/assets/mock";

import { filtrarExtratos } from "@/domain/extrato/useCases/filtrarExtratos";

import { paginarExtratos } from "@/domain/extrato/useCases/paginarExtratos";

export function useExtratoFiltros() {
  // extratos
  const [extratos, setExtratos] =
    useState(listaExtratos);

  // filtros
  const [busca, setBusca] =
    useState("");

  const [categoria, setCategoria] =
    useState("");

  const [tipo, setTipo] =
    useState("");

  const [valorMin, setValorMin] =
    useState("");

  const [valorMax, setValorMax] =
    useState("");

  const [dataInicio, setDataInicio] =
    useState("");

  const [dataFim, setDataFim] =
    useState("");

  // paginação
  const [paginaAtual, setPaginaAtual] =
    useState(1);

  const itensPorPagina = 3;

  // carregar extratos do cache
  useEffect(() => {
    const extratosSalvos =
      obterExtratos();

    if (extratosSalvos) {
      setExtratos(extratosSalvos);
    }
  }, []);

  // resetar página quando filtros mudarem
  useEffect(() => {
    setPaginaAtual(1);
  }, [
    busca,
    categoria,
    tipo,
    valorMin,
    valorMax,
    dataInicio,
    dataFim,
  ]);

  // filtrar extratos
  const extratosFiltrados =
    useMemo(() => {
      return filtrarExtratos(
        extratos,
        {
          busca,
          categoria,
          tipo,
          valorMin,
          valorMax,
          dataInicio,
          dataFim,
        }
      );
    }, [
      extratos,
      busca,
      categoria,
      tipo,
      valorMin,
      valorMax,
      dataInicio,
      dataFim,
    ]);

  // paginação
  const {
    totalMeses,
    totalPaginas,
    indiceFim,
    mesesPaginados,
  } = paginarExtratos({
    extratos: extratosFiltrados,
    paginaAtual,
    itensPorPagina,
  });

  // navegação
  const irParaPagina = (
    pagina: number
  ) => {
    if (
      pagina >= 1 &&
      pagina <= totalPaginas
    ) {
      setPaginaAtual(pagina);
    }
  };

  const irParaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(
        paginaAtual - 1
      );
    }
  };

  const irParaProxima = () => {
    if (
      paginaAtual < totalPaginas
    ) {
      setPaginaAtual(
        paginaAtual + 1
      );
    }
  };

  // páginas visíveis
  const paginasParaExibir = () => {
    const paginas = [];

    const maxPaginasVisiveis = 5;

    let inicio = Math.max(
      1,
      paginaAtual -
        Math.floor(
          maxPaginasVisiveis / 2
        )
    );

    let fim = Math.min(
      totalPaginas,
      inicio +
        maxPaginasVisiveis -
        1
    );

    inicio = Math.max(
      1,
      fim -
        maxPaginasVisiveis +
        1
    );

    for (
      let i = inicio;
      i <= fim;
      i++
    ) {
      paginas.push(i);
    }

    return paginas;
  };

  return {
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
  };
}