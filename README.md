# Grupo Mont — Cockpit Executivo

Dashboard executivo responsivo para CEO, Comercial e Marketing do Grupo Mont. A aplicação trata Montseguro, Prop5 Investimentos e TechBrabo como operações independentes: seus funis, indicadores de receita e limites operacionais não são misturados.

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

Para gerar e testar a versão de produção:

```bash
# 3. Gerar o build otimizado
npm run build

# 4. Pré-visualizar o build localmente
npm run preview
```

## Tecnologias utilizadas

- **React 19, TypeScript e Vite:** interface tipada e ambiente de desenvolvimento/build.
- **Tailwind CSS:** sistema visual responsivo e tokens de estilo.
- **Recharts:** gráficos comparativos, séries e tooltips de indicadores.
- **Lucide React:** ícones de navegação, status e ações.
- **Context API:** estado global dos filtros de período, empresa, canal e responsável.

## Telas entregues

- **CEO Overview:** receita/meta consolidada, CAC, pipeline ponderado, margem, comparação entre empresas, semáforo e eficiência de marketing.
- **Comercial:** funil específico por empresa, gargalo de conversão, pipeline ponderado e ranking de responsáveis com ciclo médio.
- **Marketing:** jornada investimento → receita, CPL, CAC, ROAS, qualidade por canal e tabela de campanhas.
- **Empresas:** drill-down com métricas próprias de Montseguro (vidas/operadoras/implantação), Prop5 (VGV versus comissão/origem) e TechBrabo (projetos/MRR/capacidade/churn).
- **Insights & Forecast:** previsão por run rate, gap, ritmo necessário, ações sugeridas e alertas priorizados.

## Arquitetura

```text
src/
├── components/          # layout, filtros e blocos reutilizáveis
├── context/             # estado global de filtros via Context API
├── data/mockData.ts     # base relacional simulada
├── pages/               # cinco visões do dashboard
├── types/               # contratos TypeScript das entidades
└── utils/calculations.ts# filtros, KPIs, forecast e formatação
```

Os filtros de período, empresa, canal e responsável vivem em `FilterContext`. As páginas sempre calculam os cartões e séries a partir de `mockData.ts`, em vez de manter totais duplicados. A referência de dados simulados é **31/08/2026**, declarada em `calculations.ts`, para manter resultados reprodutíveis durante a demonstração.

## Estrutura e modelagem dos dados

Os dados simulados estão centralizados em `src/data/mockData.ts` e usam identificadores relacionais para que filtros e cálculos sejam reaplicados sem totais estáticos duplicados.

- **`companies`:** ID, nome, segmento, cor, meta mensal, margem alvo e etapas específicas do funil.
- **`deals`:** ID, `companyId`, responsável, estágio, valor, probabilidade, receita reconhecida e ciclo. Inclui vidas/operadora/implantação para Montseguro; VGV e país de origem para Prop5; tipo de receita, MRR e horas/capacidade para TechBrabo.
- **`marketingCampaigns`:** empresa, canal, investimento, leads, oportunidades, reuniões, vendas, receita atribuída e score de qualidade.
- **`salesReps`:** consultores e vendedores, empresa, função, meta individual e métricas derivadas de carteira/ciclo.
- **`funnelSnapshots`:** volume por etapa e data para cada funil operacional, usado no cálculo de conversões e gargalos.
- **`leads`, `kpis` e `alerts`:** origem e qualidade dos leads, snapshots financeiros e eventos priorizados para gestão.

Os principais relacionamentos são `companyId` entre empresas, negócios, campanhas, snapshots e alertas; `salesRepId` entre vendedores, leads e negócios; e `leadId` entre lead e negócio comercial.

## Decisões técnicas

- **React + TypeScript + Vite** entrega uma base simples, rápida e segura para evolução do produto.
- **Tailwind CSS** fornece consistência visual sem uma camada adicional de CSS por componente.
- **Recharts** foi aplicado somente onde o gráfico facilita comparação e tendência; funis operacionais usam barras HTML para manter etapas longas legíveis.
- **Context API** é suficiente para o escopo de filtros compartilhados; uma migração para Zustand seria direta caso surjam estados assíncronos ou múltiplos domínios.
- **Dados relacionais mockados** conectam leads, deals, vendedores e campanhas, permitindo recalcular métricas por filtro.

## Regras de negócio preservadas

1. Na **Montseguro**, cotação, contratação, implantação e base ativa são etapas distintas. Vidas e perda de implantação têm tratamento próprio.
2. Na **Prop5**, volume transacionado/VGV é apresentado separado da comissão e da receita real; VGV jamais entra como faturamento.
3. Na **TechBrabo**, projeto/setup, MRR e suporte são separados. Contrato não é receita imediata e a ocupação de engenharia entra na decisão de vendas.

Veja [KPIS.md](./KPIS.md) para definições, fórmulas, fontes e tratamento de lacunas de dados.

## Limitações conhecidas e próximos passos

- **Persistência e backend:** aplicação client-side baseada em dados mockados em memória, sem API ou banco relacional (como PostgreSQL) nesta versão.
- **Atribuição de marketing:** a atribuição é direta/gerencial por campanha; não há suporte a modelos multi-touch ou janela de atribuição configurável.
- **Autenticação e perfis:** não há autenticação, multi-tenancy ou controle de acesso por função (RBAC); todas as empresas podem ser visualizadas livremente.
- **Conciliação contábil:** a receita representa a leitura comercial/gerencial simulada, sem integração e conciliação com ERP, financeiro ou regime de competência contábil.
- **Atualização em tempo real:** dados, alertas e forecast são recalculados no cliente a partir da base estática; integrações de CRM, mídia e capacidade operacional são próximos passos.
- **Mapa de fundo:** o mapa do Brasil é uma camada vetorial decorativa e não representa uma visualização geográfica ou dados por estado.
