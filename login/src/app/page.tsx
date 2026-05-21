"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { login as loginService, getLoginStatus } from "@/services/auth";
import ModalCadastro from "@/components/ModalCadastro/ModalCadastro";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);

  // Ref para armazenar o intervalo
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  // Função para buscar o status atual do login
  const fetchLoginStatus = async (emailToCheck: string) => {
    if (!emailToCheck || !emailToCheck.includes('@')) return;
    
    try {
      const status = await getLoginStatus(emailToCheck);
      setRemainingAttempts(status.remainingAttempts);
      setIsLocked(status.isLocked);
      
      if (status.isLocked && status.lockoutTimeRemaining > 0) {
        setLockoutTimeRemaining(status.lockoutTimeRemaining);
        startCountdown(status.lockoutTimeRemaining);
      } else if (!status.isLocked) {
        // Se não está mais bloqueado, para o countdown
        stopCountdown();
        setLockoutTimeRemaining(0);
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error);
    }
  };

  // Função para iniciar a contagem regressiva
  const startCountdown = (initialSeconds: number) => {
    // Limpa intervalo existente
    stopCountdown();
    
    let seconds = initialSeconds;
    
    countdownInterval.current = setInterval(async () => {
      seconds--;
      
      if (seconds <= 0) {
        // Timer expirou, verificar status novamente
        stopCountdown();
        
        // Buscar status atualizado do backend
        try {
          const status = await getLoginStatus(email);
          setIsLocked(status.isLocked);
          setLockoutTimeRemaining(0);
          
          if (!status.isLocked) {
            setRemainingAttempts(status.remainingAttempts);
            setError("");
          }
        } catch (error) {
          console.error("Erro ao verificar status após timeout:", error);
        }
      } else {
        setLockoutTimeRemaining(seconds);
      }
    }, 1000);
  };

  // Função para parar a contagem regressiva
  const stopCountdown = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
  };

  // Verificar status quando o email mudar
  useEffect(() => {
    fetchLoginStatus(email);
    
    // Cleanup ao desmontar ou email mudar
    return () => {
      stopCountdown();
    };
  }, [email]);

  // Polling periódico quando está bloqueado (para sincronizar com o backend)
  useEffect(() => {
    if (isLocked && email) {
      const pollInterval = setInterval(() => {
        fetchLoginStatus(email);
      }, 5000); // Verifica a cada 5 segundos
        
      return () => clearInterval(pollInterval);
    }
  }, [isLocked, email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginService(email, password);
      // Login bem sucedido - limpa timers e redireciona
      stopCountdown();
      window.location.href = "/home";
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao autenticar";
      setError(errorMessage);
      
      // Atualizar status após tentativa falha
      await fetchLoginStatus(email);
    } finally {
      setLoading(false);
    }
  }

  // Limpar timers ao desmontar o componente
  useEffect(() => {
    return () => {
      stopCountdown();
    };
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.header}>
        <h2>Bem-vindo de volta!</h2>
        <p>Faça login para acessar seu controle financeiro</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLocked}
        />

        <input
          className={styles.input}
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLocked}
        />

        {error && <p className={styles.error}>{error}</p>}
        
        {remainingAttempts !== null && remainingAttempts < 5 && remainingAttempts > 0 && !isLocked && (
          <p className={styles.warning}>
            ⚠️ Você tem {remainingAttempts} tentativa{remainingAttempts !== 1 ? 's' : ''} restante{remainingAttempts !== 1 ? 's' : ''}
          </p>
        )}
        
        {isLocked && lockoutTimeRemaining > 0 && (
          <p className={styles.locked}>
            🔒 Conta temporariamente bloqueada. Aguarde {lockoutTimeRemaining} segundos para tentar novamente.
          </p>
        )}

        <button 
          className={styles.button} 
          type="submit" 
          disabled={loading || isLocked}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <button
          type="button"
          className={styles.button} 
          onClick={() =>
            setModalCadastroAberto(true)
          }
        >
          Criar conta
        </button>
      </form>
      <ModalCadastro
      aberto={modalCadastroAberto}
      onClose={() =>
        setModalCadastroAberto(false)
      }
    />
    </main>
  );
}