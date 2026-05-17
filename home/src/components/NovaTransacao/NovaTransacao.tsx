"use client";

import { palette } from "@/styles/theme/colors";
import { radii } from "@/styles/theme/radii";
import { fontSizes } from "@/styles/theme/typography";
import SelectComponente from "../Select/Select";
import { opcoesTransacao } from "../../../public/assets/mock";
import InputComponente from "../Input/Input";
import Botao from "../Botao/Botao";
import UploadModal from "../UploadModal/UploadModal";
import { useNovaTransacao } from "../../hooks/useNovaTransacao";
import styles from "./NovaTransacao.module.css";
import { validarAnexo } from "@/utils/transacao";

interface NovaTransacaoProps {
  onTransacaoAdicionada: (transacao: any) => void;
  loading?: boolean;
}

export default function NovaTransacao({ onTransacaoAdicionada, loading = false }: NovaTransacaoProps) {
  const {
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
    
    // Setters
    setArquivoSelecionado,
    setErroAnexo,
  } = useNovaTransacao({ onTransacaoAdicionada, loading });

  return (
    <>
      <div
        style={{
          flex: 1,
          minHeight: "fit-content",
          borderRadius: radii.sm,
          backgroundColor: palette.cinza300,
          padding: "24px",
        }}
      >
        <h4
          style={{
            fontSize: fontSizes.heading,
            color: palette.azul700,
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Nova transação
        </h4>
        
        {/* Seção de Upload - Layout melhorado */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          margin: '20px 0', 
          padding: '16px',
          backgroundColor: palette.cinza100,
          borderRadius: radii.sm,
          border: `1px solid ${palette.cinza100}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>📎</span>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: palette.cinza800, display: 'block' }}>
                Anexar comprovante
              </label>
              <span style={{ fontSize: 11, color: palette.preto }}>
                {fazerUpload ? "Você poderá enviar um arquivo" : "Ative para enviar um comprovante"}
              </span>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={fazerUpload}
            onClick={() => handleToggleChange(!fazerUpload)}
            title={fazerUpload ? "Desativar anexo de comprovante" : "Ativar anexo de comprovante"}
            style={{
              width: 52,
              height: 30,
              borderRadius: 9999,
              padding: 4,
              display: "flex",
              alignItems: "center",
              background: fazerUpload ? palette.azul700 : palette.cinza100,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#fff",
                transform: fazerUpload ? "translateX(22px)" : "translateX(0)",
                transition: "transform 0.2s ease",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
              }}
            />
          </button>
        </div>

        {/* Status do arquivo quando upload está ativo */}
        {fazerUpload && (
          <div style={{ 
            marginBottom: 16,
            padding: '12px',
            backgroundColor: palette.cinza100,
            borderRadius: radii.sm,
            borderLeft: `3px solid ${palette.azul700}`,
          }}>
            {arquivoSelecionado ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>📄</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: palette.cinza800 }}>
                      {arquivoSelecionado.name}
                    </div>
                    <div style={{ fontSize: 11, color: palette.preto }}>
                      {Math.round(arquivoSelecionado.size / 1024)} KB
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setArquivoSelecionado(null);
                    setErroAnexo(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    color: palette.cinza100,
                  }}
                  title="Remover arquivo"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>📎</span>
                <div>
                  <div style={{ fontSize: 13, color: palette.cinza100 }}>
                    Nenhum arquivo selecionado
                  </div>
                  <div style={{ fontSize: 11, color: palette.cinza100 }}>
                    Clique em "Adicionar" no modal para selecionar
                  </div>
                </div>
              </div>
            )}
            {erroAnexo && (
              <div style={{ 
                marginTop: 8, 
                padding: '8px',
                backgroundColor: '#FFE5E5',
                borderRadius: radii.sm,
                color: '#FF0000',
                fontSize: 12 
              }}>
                ⚠️ {erroAnexo}
              </div>
            )}
          </div>
        )}

        <SelectComponente
          value={valorSelect}
          onChange={handleSelectChange}
          options={opcoesTransacao}
        />

        <InputComponente
          type="number"
          value={valorInput}
          onChange={handleValorChange}
          label="Valor"
          placeholder="R$ 00,00"
        />

        {erroValor && (
          <span style={{ color: "red", fontSize: 12 }}>
            {erroValor}
          </span>
        )}

        <InputComponente
          type="text"
          value={descricao}
          onChange={handleDescricaoChange}
          label="Descrição da transação"
        />

        {erroDescricao && (
          <span style={{ color: "red", fontSize: 12 }}>
            {erroDescricao}
          </span>
        )}
                      
        <Botao
          label="Adicionar nova transação"
          onClick={submeterTransacao}
          backgroundColor={palette.azul700}
          disabled={!valorInput || valorInput <= 0 || !descricao || !valorSelect || loading}
          title="Clique para adicionar a nova transação"
        />
      </div>

      <UploadModal
        mostrarModalUpload={mostrarModalUpload}
        cancelarUpload={cancelarUpload}
        confirmarUpload={confirmarUpload}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        openFilePicker={openFilePicker}
        fileInputRef={fileInputRef}
        arquivoSelecionado={arquivoSelecionado}
        erroAnexo={erroAnexo}
        validarAnexo={validarAnexo}
        setArquivoSelecionado={setArquivoSelecionado}
        setErroAnexo={setErroAnexo}
        dragActive={dragActive}
      />
    </>
  );
}