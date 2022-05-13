export interface DashboardSummaryResponse {
    numberOfOrders:      number;
    paidOrders:          number;
    numberOfClients:     number;
    numberOfProducts:    number;
    productsWithNoStock: number;
    lowStockProducts:    number;
    notPaidOrders:       number;
}
