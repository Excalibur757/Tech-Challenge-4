import { RefObject } from "react";
import { palette } from "@/styles/theme/colors";

interface UploadModalProps {
  mostrarModalUpload: boolean;
  cancelarUpload: () => void;
  confirmarUpload: () => void;

  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;

  openFilePicker: () => void;

  fileInputRef: RefObject<HTMLInputElement | null>;

  arquivoSelecionado: File | null;
  erroAnexo: string | null;

  validarAnexo: (file: File) => string | null;

  setArquivoSelecionado: (file: File | null) => void;
  setErroAnexo: (erro: string | null) => void;

  dragActive: boolean;
}

export default function UploadModal({
  mostrarModalUpload,
  cancelarUpload,
  confirmarUpload,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  openFilePicker,
  fileInputRef,
  arquivoSelecionado,
  erroAnexo,
  validarAnexo,
  setArquivoSelecionado,
  setErroAnexo,
  dragActive,
}: UploadModalProps) {

  if (!mostrarModalUpload) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)"
        }}
        onClick={cancelarUpload}
      />

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          width: 520,
          maxWidth: "92%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          zIndex: 1001
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: palette.azul700
          }}
        >
          Upload da transação
        </h3>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFilePicker}
          style={{
            borderRadius: 8,
            border: `2px dashed ${
              dragActive ? palette.azul700 : "#cfcfcf"
            }`,
            padding: 28,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const erro = validarAnexo(file);

              if (erro) {
                setErroAnexo(erro);
                return;
              }

              setArquivoSelecionado(file);
              setErroAnexo(null);
            }}
          />

          {arquivoSelecionado ? (
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                color: "#1a1a1a"
              }}
            >
              {arquivoSelecionado.name}
            </p>
          ) : (
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                color: "#1a1a1a"
              }}
            >
              Arraste o arquivo aqui ou clique para selecionar
            </p>
          )}
        </div>

        {erroAnexo && (
          <span style={{ color: "red", fontSize: 12 }}>
            {erroAnexo}
          </span>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 16
          }}
        >
          <button
            onClick={cancelarUpload}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              color: "#000"
            }}
          >
            Cancelar
          </button>

          <button
            onClick={confirmarUpload}
            disabled={!arquivoSelecionado}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: arquivoSelecionado
                ? palette.azul700
                : "#ccc",
              color: "#000",
              cursor: arquivoSelecionado
                ? "pointer"
                : "not-allowed"
            }}
          >
            Confirmar upload
          </button>
        </div>
      </div>
    </div>
  );
}