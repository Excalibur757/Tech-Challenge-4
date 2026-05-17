"use client";

import { useState, useRef, useEffect } from "react";
import { validarValor, validarDescricao, validarAnexo } from "@/utils/transacao";

interface UseNovaTransacaoProps {
  onTransacaoAdicionada: (transacao: any) => void;
  loading?: boolean;
}

const categoriasSugestao = [
  {
    label: "saque",
    keywords: ["mercado", "comida", "restaurante", "padaria", "feira", "compras", "dinheiro", "retirada"],
  },
  {
    label: "deposito",
    keywords: ["transferência recebida", "pix recebido", "depósito", "entrada", "crédito", "salário", "renda"],
  },
  {
    label: "pagamento_boleto",
    keywords: ["boleto", "conta", "água", "luz", "internet", "fatura", "pagamento", "energia", "telefone"],
  },
  {
    label: "estorno",
    keywords: ["estorno", "reembolso", "devolução", "cancelamento", "valor devolvido", "recuperação"],
  },
  {
    label: "recarga_celular",
    keywords: ["recarga", "celular", "claro", "tim", "vivo", "oi", "crédito de celular", "telefone pré-pago"],
  },
];

export function useNovaTransacao({ onTransacaoAdicionada, loading = false }: UseNovaTransacaoProps) {
  // Estados
  const [erroValor, setErroValor] = useState<string | null>(null);
  const [erroDescricao, setErroDescricao] = useState<string | null>(null);
  const [valorInput, setValorInput] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [valorSelect, setValorSelect] = useState<string>("");
  const [fazerUpload, setFazerUpload] = useState<boolean>(false);
  const [mostrarModalUpload, setMostrarModalUpload] = useState<boolean>(false);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
  const [erroAnexo, setErroAnexo] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Effects
  useEffect(() => {
    if (!descricao) return;

    const texto = descricao.toLowerCase();

    const categoriaEncontrada = categoriasSugestao.find(cat =>
      cat.keywords.some(keyword => texto.includes(keyword))
    );

    if (categoriaEncontrada) {
      setValorSelect(categoriaEncontrada.label);
    }
  }, [descricao]);

  // Handlers
  const handleToggleChange = (next: boolean) => {
    setFazerUpload(next);
    if (next) {
      setMostrarModalUpload(true);
    } else {
      setArquivoSelecionado(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const erro = validarAnexo(files[0]);
      if (erro) {
        setErroAnexo(erro);
        return;
      }
      setArquivoSelecionado(files[0]);
      setErroAnexo(null);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const confirmarUpload = () => {
    if (!arquivoSelecionado) return;
    setMostrarModalUpload(false);
  };

  const cancelarUpload = () => {
    setMostrarModalUpload(false);
    setFazerUpload(false);
    setArquivoSelecionado(null);
    setErroAnexo(null);
  };

  const submeterTransacao = () => {
    const novaTransacao = {
      valor: valorInput,
      tipo: valorSelect,
      descricao: descricao,
      upload: !!fazerUpload,
      arquivo: arquivoSelecionado ? arquivoSelecionado.name : undefined,
    };
    
    onTransacaoAdicionada(novaTransacao);

    // Reset do formulário
    setValorInput(0);
    setDescricao("");
    setValorSelect("");
    setArquivoSelecionado(null);
    setErroAnexo(null);
    setFazerUpload(false);
    setErroValor(null);
    setErroDescricao(null);
  };

  // Handlers dos inputs
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorString = e.target.value;
    const valorNumber = valorString === "" ? 0 : parseFloat(valorString);

    setValorInput(valorNumber);
    setErroValor(validarValor(valorNumber));
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(e.target.value);
    setErroDescricao(validarDescricao(e.target.value));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValorSelect(e.target.value);
  };

  return {
    // Estados
    erroValor,
    erroDescricao,
    valorInput,
    descricao,
    valorSelect,
    fazerUpload,
    mostrarModalUpload,
    arquivoSelecionado,
    erroAnexo,
    dragActive,
    fileInputRef,
    loading,
    
    // Handlers
    handleToggleChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFilePicker,
    confirmarUpload,
    cancelarUpload,
    submeterTransacao,
    handleValorChange,
    handleDescricaoChange,
    handleSelectChange,
    
    // Setters para o modal
    setArquivoSelecionado,
    setErroAnexo,
  };
}