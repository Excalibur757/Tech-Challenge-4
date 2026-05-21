"use client";

import styles from "./ExtratoFiltros.module.css";

interface ExtratoFiltrosProps {
  busca: string;
  setBusca: (value: string) => void;

  categoria: string;
  setCategoria: (value: string) => void;

  tipo: string;
  setTipo: (value: string) => void;

  valorMin: string;
  setValorMin: (value: string) => void;

  valorMax: string;
  setValorMax: (value: string) => void;

  dataInicio: string;
  setDataInicio: (value: string) => void;

  dataFim: string;
  setDataFim: (value: string) => void;

  opcoesTransacao: any[];
}

export default function ExtratoFiltros({
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

  opcoesTransacao,
}: ExtratoFiltrosProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar por texto..."
        className={styles.input}
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
      />

      <select
        className={styles.select}
        value={categoria}
        onChange={(e) =>
          setCategoria(e.target.value)
        }
      >
        <option value="">
          Selecione um tipo de
          transação
        </option>

        {opcoesTransacao.map((op) => (
          <option
            key={op.value}
            value={op.value}
          >
            {op.label}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={tipo}
        onChange={(e) =>
          setTipo(e.target.value)
        }
      >
        <option value="">
          Selecione um tipo
        </option>

        <option value="receita">
          Receita
        </option>

        <option value="despesa">
          Despesa
        </option>
      </select>

      <div className={styles.row}>
        <input
          type="number"
          placeholder="Valor mínimo"
          className={styles.input}
          value={valorMin}
          onChange={(e) =>
            setValorMin(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Valor máximo"
          className={styles.input}
          value={valorMax}
          onChange={(e) =>
            setValorMax(e.target.value)
          }
        />
      </div>

      <div className={styles.row}>
        <input
          type="date"
          className={styles.input}
          value={dataInicio}
          onChange={(e) =>
            setDataInicio(
              e.target.value
            )
          }
        />

        <input
          type="date"
          className={styles.input}
          value={dataFim}
          onChange={(e) =>
            setDataFim(e.target.value)
          }
        />
      </div>
    </>
  );
}