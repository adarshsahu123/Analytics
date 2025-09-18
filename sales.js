// Sales Page JavaScript

// Sample Sales Data
const salesData = [
  { id: 1, orderId: 'ORD001', customer: 'John Doe', product: 'Widget A', amount: 1500, date: '2023-10-01', status: 'Completed' },
  { id: 2, orderId: 'ORD002', customer: 'Jane Smith', product: 'Widget B', amount: 2200, date: '2023-09-28', status: 'Pending' },
  { id: 3, orderId: 'ORD003', customer: 'Bob Johnson', product: 'Widget C', amount: 800, date: '2023-09-15', status: 'Completed' },
  { id: 4, orderId: 'ORD004', customer: 'Alice Brown', product: 'Widget A', amount: 3000, date: '2023-10-02', status: 'Shipped' },
  { id: 5, orderId: 'ORD005', customer: 'Charlie Wilson', product: 'Widget D', amount: 1200, date: '2023-09-30', status: 'Completed' }
];

// Render Sales Table
function renderSalesTable(sales) {
  const tbody = document.querySelector('#salesTable tbody');
  tbody.innerHTML = '';

  sales.forEach(sale => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sale.orderId}</td>
      <td>${sale.customer}</td>
      <td>${sale.product}</td>
      <td>$${sale.amount.toLocaleString()}</td>
      <td>${sale.date}</td>
      <td><span class="status ${sale.status.toLowerCase()}">${sale.status}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// Search Functionality
function initSalesSearch() {
  const searchInput = document.getElementById('salesSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredSales = salesData.filter(sale =>
      sale.customer.toLowerCase().includes(query) ||
      sale.product.toLowerCase().includes(query) ||
      sale.orderId.toLowerCase().includes(query)
    );
    renderSalesTable(filteredSales);
  });
}

// Sort Functionality
function initSalesSort() {
  const headers = document.querySelectorAll('#salesTable th[data-sort]');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const sortKey = header.getAttribute('data-sort');
      const sortOrder = header.classList.contains('asc') ? 'desc' : 'asc';

      headers.forEach(h => h.classList.remove('asc', 'desc'));
      header.classList.add(sortOrder);

      const sortedSales = [...salesData].sort((a, b) => {
        if (sortKey === 'amount') {
          return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      renderSalesTable(sortedSales);
    });
  });
}

// Filter by Status
function initStatusFilter() {
  const statusFilter = document.getElementById('statusFilter');
  if (!statusFilter) return;

  statusFilter.addEventListener('change', (e) => {
    const status = e.target.value;
    const filteredSales = status === 'all' ? salesData : salesData.filter(sale => sale.status.toLowerCase() === status);
    renderSalesTable(filteredSales);
  });
}

// Initialize Sales Page
function initSalesPage() {
  renderSalesTable(salesData);
  initSalesSearch();
  initSalesSort();
  initStatusFilter();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('salesTable')) {
    initSalesPage();
  }
});
