"use client";

import styles from "./ExtratoPaginacao.module.css";

interface ExtratoPaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;

  irParaPagina: (
    pagina: number
  ) => void;

  irParaAnterior: () => void;

  irParaProxima: () => void;

  paginasParaExibir: number[]
}

export default function ExtratoPaginacao({
  paginaAtual,
  totalPaginas,

  irParaPagina,

  irParaAnterior,

  irParaProxima,

  paginasParaExibir,
}: ExtratoPaginacaoProps) {
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        onClick={irParaAnterior}
        disabled={paginaAtual === 1}
        className={styles.botao}
      >
        &laquo; Anterior
      </button>

      <div className={styles.numeros}>
        {paginasParaExibir.map(
          (pagina) => (
            <button
              key={pagina}
              onClick={() =>
                irParaPagina(
                  pagina
                )
              }
              className={`${styles.botao} ${
                pagina === paginaAtual
                  ? styles.ativo
                  : ""
              }`}
            >
              {pagina}
            </button>
          )
        )}
      </div>

      <button
        onClick={irParaProxima}
        disabled={
          paginaAtual === totalPaginas
        }
        className={styles.botao}
      >
        Próxima &raquo;
      </button>
    </div>
  );
}