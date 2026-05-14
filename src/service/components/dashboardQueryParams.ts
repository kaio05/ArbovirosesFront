export type DashboardScope = 'notificados' | 'confirmados' | 'obitos';

interface DashboardQueryParams {
  yearSelected: string;
  agravoSelected: string;
  bairro?: string;
  scope?: DashboardScope;
  semanaInicial?: string;
  semanaFinal?: string;
}

export function buildDashboardQueryParams({
  yearSelected,
  agravoSelected,
  bairro,
  scope = 'notificados',
  semanaInicial,
  semanaFinal,
}: DashboardQueryParams) {
  const params = new URLSearchParams({
    year: yearSelected,
    agravo: agravoSelected,
    scope,
  });

  if (bairro) params.set('bairro', bairro);
  if (semanaInicial) params.set('semanaInicial', semanaInicial);
  if (semanaFinal) params.set('semanaFinal', semanaFinal);

  return params.toString();
}
