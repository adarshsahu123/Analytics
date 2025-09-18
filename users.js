// Users Page JavaScript

// Sample Users Data
const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-10-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2023-09-28' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '2023-09-15' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2023-10-02' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', lastLogin: '2023-09-30' }
];

// Render Users Table
function renderUsersTable(users) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><span class="status ${user.status.toLowerCase()}">${user.status}</span></td>
      <td>${user.lastLogin}</td>
    `;
    tbody.appendChild(row);
  });
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('userSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredUsers = usersData.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
    renderUsersTable(filteredUsers);
  });
}

// Sort Functionality
function initSort() {
  const headers = document.querySelectorAll('#usersTable th[data-sort]');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const sortKey = header.getAttribute('data-sort');
      const sortOrder = header.classList.contains('asc') ? 'desc' : 'asc';

      headers.forEach(h => h.classList.remove('asc', 'desc'));
      header.classList.add(sortOrder);

      const sortedUsers = [...usersData].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      renderUsersTable(sortedUsers);
    });
  });
}

// Initialize Users Page
function initUsersPage() {
  renderUsersTable(usersData);
  initSearch();
  initSort();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('usersTable')) {
    initUsersPage();
  }
});
