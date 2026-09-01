# Dicionário de KPIs — Grupo Mont

Os dados desta prova são simulados e têm referência em 31/08/2026. Cada indicador é calculado a partir de entidades em `src/data/mockData.ts`; nenhum VGV da Prop5 é incorporado à receita consolidada.

| Indicador | Finalidade | Fórmula | Fonte | Interpretação | Dados faltantes |
|---|---|---|---|---|---|
| Receita consolidada | Acompanhar receita reconhecida do grupo. | Σ `deals.actualRevenue` | `deals` | Comparar com a meta do período. | Negócios sem receita reconhecida contam como R$ 0, não como venda futura. |
| Meta e atingimento | Medir aderência ao orçamento. | Receita / meta mensal × multiplicador do período | `companies`, `deals` | ≥90% no ritmo; 60–89% atenção; <60% risco. | Sem meta cadastrada, atingimento é 0 e deve-se cadastrar orçamento. |
| Pipeline ponderado | Medir receita esperada, sem confundir com realizado. | Σ (`deal.amount` × `deal.probability`) para negócios abertos | `deals` | Indica cobertura provável da meta. | Probabilidade ausente deve bloquear o registro, não assumir 100%. |
| CAC | Controlar custo de aquisição de cliente. | Investimento / vendas atribuídas | `marketingCampaigns` | Menor CAC, mantendo qualidade, é preferível. | Sem vendas, exibir “sem base” e não infinito. |
| CPL | Avaliar custo de geração de demanda. | Investimento / leads | `marketingCampaigns` | Deve ser analisado junto de qualidade e conversão. | Sem leads, exibir “sem base”. |
| ROAS | Avaliar retorno atribuído de cada canal. | Receita atribuída / investimento | `marketingCampaigns` | Maior que 1x recupera investimento em receita atribuída. | Sem investimento, não calcular ROAS. |
| Qualidade de lead | Priorizar canais que progridem. | Média de `qualityScore` | `marketingCampaigns`, `leads` | Score alto combina perfil, intenção e avanço. | Leads sem score entram em fila de enriquecimento, fora da média. |
| Conversão de funil | Identificar gargalos por empresa. | Volume etapa atual / volume etapa anterior | `funnelSnapshots` | A maior perda entre etapas é o foco de melhoria. | Sem volume anterior, conversão é indisponível. |
| Ciclo médio | Monitorar velocidade comercial. | Média de `deal.cycleDays` | `deals` | Ciclos longos exigem forecast mais conservador. | Negócio sem data de entrada não entra até correção. |
| Margem operacional | Relacionar lucro e receita. | Lucro operacional / receita reconhecida | `kpis`, `deals` | Mostra eficiência econômica, não volume bruto. | Receita zero implica margem indisponível; não dividir por zero. |
| Forecast / run rate | Antecipar fechamento do mês. | (Realizado / dias decorridos) × dias no mês | `deals`, calendário | Projeção não substitui pipeline nem previsão do vendedor. | Sem dias ou receita, usar 0 e indicar base insuficiente. |
| Gap e ritmo necessário | Converter desvio em ação diária. | Max(meta − projeção, 0) / dias restantes | `companies`, `deals` | Mostra receita diária adicional para alcançar a meta. | Sem dias restantes, congelar cálculo e fechar período. |
| Vidas cobertas (Montseguro) | Medir base sob cobertura. | Σ `deal.lives` em implantação/ativo | `deals` | Não confundir com empresas contratantes. | Contrato sem número de vidas deve ficar pendente de implantação. |
| Ticket por vida (Montseguro) | Acompanhar monetização da carteira. | Prêmio contratado / vidas / 12 | `deals` | Compara qualidade financeira de grupos. | Sem vidas, não calcular ticket. |
| Quebra na implantação (Montseguro) | Proteger receita entre contratação e ativo. | 1 − implantações concluídas / contratações | `funnelSnapshots`, `deals` | Queda exige ação de pós-venda e documentação. | Sem contratos no período, exibir “sem base”. |
| Volume transacionado / VGV (Prop5) | Medir escala de capital estruturado. | Σ `deal.propertyValue` | `deals` | É volume de negócio do cliente, **não receita Prop5**. | Imóvel sem valor fica fora até avaliação. |
| Receita de comissão (Prop5) | Medir faturamento real da consultoria. | Σ `deal.actualRevenue` de fechamentos | `deals` | É a linha usada no consolidado do grupo. | Comissão pendente só entra após reconhecimento. |
| Ticket imobiliário (Prop5) | Entender perfil patrimonial. | VGV / nº de estruturas | `deals` | Influencia ciclo e modelo de atendimento. | Sem VGV, excluir do denominador e corrigir origem. |
| Projetos / Setup (TechBrabo) | Medir receita pontual entregue. | Σ receita reconhecida de `type=project` | `deals` | Não deve ser tratada como MRR. | Projeto sem marco de reconhecimento fica com receita 0. |
| MRR (TechBrabo) | Medir previsibilidade recorrente ativa. | Σ `deal.mrr` sem churn | `deals` | Base de receita mensal recorrente. | Contrato sem valor mensal não entra até saneamento. |
| Ocupação de engenharia (TechBrabo) | Impedir venda acima da capacidade. | Horas vendidas / horas disponíveis | `deals` | ≥90% exige replanejamento ou reforço de capacidade. | Sem capacidade definida, a oportunidade não pode ser aprovada. |
| Churn de suporte (TechBrabo) | Monitorar retenção da base. | Contratos churnados / contratos de suporte | `deals` | Deve ser lido junto a motivo de cancelamento e MRR perdido. | Sem status de contrato, manter em investigação. |

## Observações de governança

- A origem de marketing é atribuição gerencial; conciliação contábil deve usar receita reconhecida do ERP/financeiro.
- Todas as datas devem adotar o mesmo fuso e critério de competência em produção.
- Alertas precisam ter dono, data de resolução e limiar configurável quando conectados a dados reais.
