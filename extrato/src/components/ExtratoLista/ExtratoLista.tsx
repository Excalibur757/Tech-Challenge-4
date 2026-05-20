"use client";

import styles from "./ExtratoLista.module.css";

interface ExtratoListaProps {
  mesesPaginados: any[];
}

export default function ExtratoLista({
  mesesPaginados,
}: ExtratoListaProps) {
  return (
    <div className={styles.lista}>
      {mesesPaginados.map(
        (mesObj) => (
          <div
            key={mesObj.mes}
            className={styles.bloco}
          >
            <h2 className={styles.titulo}>
              {mesObj.mes}
            </h2>

            {mesObj.extratos.map(
              (item: any) => (
                <div
                  key={item.id}
                  className={styles.item}
                >
                  <div>
                    <p
                      className={
                        styles.descricao
                      }
                    >
                      {
                        item.descricao
                      }
                    </p>

                    <span
                      className={
                        styles.data
                      }
                    >
                      {new Date(
                        item.data
                      ).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>

                  <span
                    className={`${
                      styles.valor
                    } ${
                      item.tipo ===
                      "deposito"
                        ? styles.positivo
                        : styles.negativo
                    }`}
                  >
                    {item.tipo ===
                    "deposito"
                      ? "+"
                      : "-"}{" "}
                    R$ {item.valor}
                  </span>
                </div>
              )
            )}
          </div>
        )
      )}

      {mesesPaginados.length ===
        0 && (
        <div className={styles.empty}>
          <p>
            Nenhuma transação
            encontrada.
          </p>
        </div>
      )}
    </div>
  );
}