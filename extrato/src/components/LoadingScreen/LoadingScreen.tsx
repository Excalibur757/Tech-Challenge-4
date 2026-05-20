"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  titulo?: string;
  subtitulo?: string;
  delay?: number; // opcional
}

export default function LoadingScreen({
  titulo = "Carregando...",
  subtitulo = "Aguarde um momento",
  delay = 800, // tempo mínimo de exibição
}: LoadingScreenProps) {
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrar(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!mostrar) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.spinner}></div>

        <h2 className={styles.title}>{titulo}</h2>

        <p className={styles.subtitle}>{subtitulo}</p>
      </div>
    </div>
  );
}
