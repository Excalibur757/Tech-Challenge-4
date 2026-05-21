"use client";

import styles from "./LoadingCard.module.css";

interface LoadingCardProps {
  texto?: string;
}

export default function LoadingCard({
  texto = "Carregando...",
}: LoadingCardProps) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>

      <p className={styles.loadingText}>
        {texto}
      </p>
    </div>
  );
}