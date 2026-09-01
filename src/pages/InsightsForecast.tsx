import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CircleAlert,
  CircleCheck,
  CircleX,
  Gauge,
  Target,
} from "lucide-react";
import { KpiCard } from "../components/KpiCard";
import { Panel } from "../components/Panel";
import { alerts, deals } from "../data/mockData";
import { useFilters } from "../context/FilterContext";
import {
  formatCurrency,
  formatDate,
  formatPercent,
  getForecast,
} from "../utils/calculations";
import type { AlertSeverity } from "../types";

const severityUi: Record<
  AlertSeverity,
  { icon: typeof CircleCheck; classes: string; label: string }
> = {
  success: {
    icon: CircleCheck,
    classes: "border-emerald-100 bg-emerald-50 text-emerald-900",
    label: "Oportunidade",
  },
  warning: {
    icon: CircleAlert,
    classes: "border-amber-100 bg-amber-50 text-amber-900",
    label: "Atenção",
  },
  critical: {
    icon: CircleX,
    classes: "border-rose-100 bg-rose-50 text-rose-900",
    label: "Crítico",
  },
};

export function InsightsForecast() {
  const { filters } = useFilters();
  const forecast = getForecast(deals, filters);
  const visibleAlerts = alerts.filter(
    (alert) =>
      filters.companyId === "all" || alert.companyId === filters.companyId,
  );
  const projectedAttainment = forecast.target
    ? forecast.projected / forecast.target
    : 0;
  return (
    <div className="space-y-6">
      <section className="future-hero rounded-2xl p-6 text-white sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-sky-100">
              <CalendarClock size={17} /> Forecast mensal — referência simulada
              em 21/08/2026
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Antecipe o gap antes que ele vire fechamento perdido.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-100">
              A projeção usa o run rate diário de receita reconhecida e os dias
              restantes do mês.
            </p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
            <p className="text-xs font-medium text-sky-100">
              Projeção de atingimento
            </p>
            <p className="mt-1 text-3xl font-bold">
              {formatPercent(projectedAttainment)}
            </p>
          </div>
        </div>
      </section>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Meta do mês"
          value={formatCurrency(forecast.target, true)}
          meta="orçamento consolidado"
          description="Meta financeira para o período mensal."
        />
        <KpiCard
          label="Realizado"
          value={formatCurrency(forecast.actual, true)}
          meta={`${forecast.elapsedDays} dias corridos`}
          change={0.05}
          description="Receita reconhecida até a data de referência."
        />
        <KpiCard
          label="Projeção"
          value={formatCurrency(forecast.projected, true)}
          meta={`${formatPercent(projectedAttainment)} da meta`}
          change={-0.08}
          description="Run rate diário multiplicado pelos 31 dias do mês."
          tone="accent"
        />
        <KpiCard
          label="Gap projetado"
          value={formatCurrency(forecast.gap, true)}
          meta="a recuperar"
          change={-0.12}
          description="Diferença entre a meta e a projeção atual."
        />
        <KpiCard
          label="Ritmo necessário"
          value={formatCurrency(forecast.requiredDailyRate)}
          meta={`${forecast.remainingDays} dias restantes`}
          description="Receita diária adicional necessária para atingir a meta."
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
        <Panel
          title="Run rate e ritmo necessário"
          subtitle="Comparação para orientar a cadência comercial"
        >
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Realizado no ritmo atual
                </span>
                <strong className="text-slate-900">
                  {formatCurrency(forecast.dailyRunRate)}/dia
                </strong>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{
                    width: `${Math.min((forecast.dailyRunRate / Math.max(forecast.requiredDailyRate, 1)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Ritmo adicional para a meta
                </span>
                <strong className="text-slate-900">
                  {formatCurrency(forecast.requiredDailyRate)}/dia
                </strong>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-rose-500"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <Gauge className="mt-0.5 shrink-0 text-sky-600" size={19} />
              <span>
                Se a cadência atual for mantida, a projeção fecha em{" "}
                <strong>{formatCurrency(forecast.projected, true)}</strong>.
                Priorize negócios com probabilidade e capacidade de entrega
                compatíveis.
              </span>
            </div>
          </div>
        </Panel>
        <Panel
          title="Ações sugeridas"
          subtitle="Foco de liderança para os próximos dias"
        >
          <div className="space-y-3">
            <div className="flex gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4">
              <Target className="shrink-0 text-sky-700" size={18} />
              <p className="text-sm leading-5 text-sky-950">
                <strong>Comercial:</strong> revise oportunidades de alta
                probabilidade que podem reconhecer receita ainda neste mês.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border border-violet-100 bg-violet-50 p-4">
              <BadgeCheck className="shrink-0 text-violet-700" size={18} />
              <p className="text-sm leading-5 text-violet-950">
                <strong>Operação:</strong> valide capacidade antes de acelerar
                contratos de implantação e projetos TechBrabo.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <AlertCircle className="shrink-0 text-amber-700" size={18} />
              <p className="text-sm leading-5 text-white-950">
                <strong>Marketing:</strong> mantenha investimentos em canais com
                qualidade e ROAS comprovados.
              </p>
            </div>
          </div>
        </Panel>
      </div>
      <Panel
        title="Central de alertas automáticos"
        subtitle="Desvios que merecem intervenção executiva no período"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {visibleAlerts.map((alert) => {
            const ui = severityUi[alert.severity];
            const Icon = ui.icon;
            return (
              <article
                key={alert.id}
                className={`rounded-xl border p-4 ${ui.classes}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <Icon className="mt-0.5 shrink-0" size={19} />
                    <div>
                      <p className="font-bold">{alert.title}</p>
                      <p className="mt-1 text-sm leading-5 opacity-80">
                        {alert.detail}
                      </p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-lg font-bold">
                    {alert.metric}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-current/10 pt-3 text-xs font-semibold opacity-75">
                  <span>
                    {alert.companyId === "montseguro"
                      ? "Montseguro"
                      : alert.companyId === "prop5"
                        ? "Prop5"
                        : "TechBrabo"}
                  </span>
                  <span>•</span>
                  <span>{ui.label}</span>
                  <span>•</span>
                  <span>{formatDate(alert.createdAt)}</span>
                  <ArrowRight size={14} className="ml-auto" />
                </div>
              </article>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
