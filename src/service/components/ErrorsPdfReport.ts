const baseApi = process.env.REACT_APP_API_URL ?? "";

export interface ErrorsReportFilters {
    category?: string;
    startDate?: number;
    endDate?: number;
    idAgravo?: string;
}

export async function downloadErrorsPdfReport(filters: ErrorsReportFilters = {}): Promise<void> {
    const params = new URLSearchParams();
    if (filters.category)            params.set("category", filters.category);
    if (filters.startDate != null)   params.set("startDate", String(filters.startDate));
    if (filters.endDate != null)     params.set("endDate", String(filters.endDate));
    if (filters.idAgravo)            params.set("idAgravo", filters.idAgravo);

    const queryString = params.toString();
    const url = `${baseApi}/notifications/errors/pdf${queryString ? "?" + queryString : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
        let message = "Não foi possível gerar o relatório PDF.";
        try {
            const errorData = await response.json();
            if (Array.isArray(errorData?.errors) && errorData.errors.length > 0) {
                message = errorData.errors[0];
            }
        } catch (_error) {
            // mantém a mensagem padrão quando a API não retorna JSON
        }
        throw new Error(message);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filters.category
        ? `erros-${filters.category.toLowerCase()}.pdf`
        : "erros-todos.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
}
