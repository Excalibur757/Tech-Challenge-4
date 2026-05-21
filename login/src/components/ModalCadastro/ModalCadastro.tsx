"use client";

import { useState } from "react";

import { cadastroService } from "@/services/auth";

import styles from "./ModalCadastro.module.css";

interface ModalCadastroProps {
  aberto: boolean;
  onClose: () => void;
}

export default function ModalCadastro({
  aberto,
  onClose,
}: ModalCadastroProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  if (!aberto) return null;

  async function handleCadastro() {
    try {
      setLoading(true);

      const data = await cadastroService(
        nome,
        email,
        senha
      );

      if (data.cadastro.success) {
        setMensagem(
          "✅ Conta criada com sucesso!"
        );

        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error: any) {
      setMensagem(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Criar conta
          </h2>

          <p className={styles.subtitle}>
            Cadastre uma nova conta para acessar
            a plataforma.
          </p>
        </div>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder="Nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />
        </div>

        {mensagem && (
          <div className={styles.message}>
            {mensagem}
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className={styles.submitButton}
            onClick={handleCadastro}
            disabled={loading}
          >
            {loading
              ? "Criando..."
              : "Criar conta"}
          </button>
        </div>
      </div>
    </div>
  );
}