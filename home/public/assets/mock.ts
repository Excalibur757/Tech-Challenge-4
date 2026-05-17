export const listaExtratos = [
  {
    mes: "Maio",
    extratos: [
      { id: 42, data: "2026-05-20", valor: 30, tipo: "recarga_celular", descricao: "Recarga - Claro" },
      { id: 41, data: "2026-05-18", valor: 199.9, tipo: "estorno", descricao: "Estorno - Loja eletrônicos" },
      { id: 40, data: "2026-05-15", valor: 600, tipo: "pagamento_boleto", descricao: "Boleto - Água" },
      { id: 39, data: "2026-05-10", valor: 1400, tipo: "saque", descricao: "Saque especial" },
      { id: 38, data: "2026-05-02", valor: 3000, tipo: "deposito", descricao: "Depósito salário" },
    ],
  },
  {
    mes: "Abril",
    extratos: [
      { id: 37, data: "2026-04-28", valor: 45, tipo: "recarga_celular", descricao: "Recarga TIM" },
      { id: 36, data: "2026-04-19", valor: 87, tipo: "estorno", descricao: "Estorno mercado" },
      { id: 35, data: "2026-04-12", valor: 120, tipo: "pagamento_boleto", descricao: "Boleto - Conta" },
      { id: 34, data: "2026-04-05", valor: 2750, tipo: "deposito", descricao: "Depósito mensal" },
    ],
  },
  {
    mes: "Março",
    extratos: [
      { id: 33, data: "2026-03-25", valor: 50, tipo: "recarga_celular", descricao: "Recarga Vivo" },
      { id: 32, data: "2026-03-17", valor: 1200, tipo: "saque", descricao: "Saque mensal" },
      { id: 31, data: "2026-03-09", valor: 350, tipo: "pagamento_boleto", descricao: "Boleto - Internet" },
      { id: 30, data: "2026-03-01", valor: 3000, tipo: "deposito", descricao: "Depósito de salário" },
    ],
  },
  {
    mes: "Fevereiro",
    extratos: [
      { id: 29, data: "2026-02-26", valor: 90, tipo: "estorno", descricao: "Estorno farmácia" },
      { id: 28, data: "2026-02-18", valor: 350, tipo: "pagamento_boleto", descricao: "Boleto - Luz" },
      { id: 27, data: "2026-02-12", valor: 700, tipo: "saque", descricao: "Saque" },
      { id: 26, data: "2026-02-03", valor: 2800, tipo: "deposito", descricao: "Depósito" },
    ],
  },
  {
    mes: "Janeiro",
    extratos: [
      { id: 25, data: "2026-01-29", valor: 40, tipo: "recarga_celular", descricao: "Recarga TIM" },
      { id: 24, data: "2026-01-19", valor: 250, tipo: "pagamento_boleto", descricao: "Boleto - Água" },
      { id: 23, data: "2026-01-13", valor: 400, tipo: "saque", descricao: "Saque mensal" },
      { id: 22, data: "2026-01-05", valor: 2700, tipo: "deposito", descricao: "Depósito mensal" },
    ],
  },
];

export const opcoesTransacao = [
  {
    value: "",
    label: "Escolher transação",
  },
  {
    value: "deposito",
    label: "Depósito",
  },
  {
    value: "saque",
    label: "Saque",
  },
  {
    value: "pagamento_boleto",
    label: "Pagamento de boleto",
  },
  {
    value: "estorno",
    label: "Estorno",
  },
  {
    value: "recarga_celular",
    label: "Recarga de celular",
  },
];