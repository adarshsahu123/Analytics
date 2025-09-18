// Charts JavaScript for Analytics Dashboard

// Sample Data
const sampleData = {
  line: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1900, 3000, 5000, 2000, 3000]
  },
  bar: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: [10000, 15000, 12000, 18000]
  },
  pie: {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    data: [60, 30, 10]
  },
  radar: {
    labels: ['Sales', 'Marketing', 'Support', 'Development', 'HR'],
    data: [80, 70, 90, 85, 75]
  }
};

// Chart Configurations
const chartConfigs = {
  line: {
    type: 'line',
    data: {
      labels: sampleData.line.labels,
      datasets: [{
        label: 'Revenue',
        data: sampleData.line.data,
        borderColor: 'var(--primary)',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  },
  bar: {
    type: 'bar',
    data: {
      labels: sampleData.bar.labels,
      datasets: [{
        label: 'Sales',
        data: sampleData.bar.data,
        backgroundColor: 'var(--secondary)',
        borderColor: 'var(--secondary)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  },
  pie: {
    type: 'doughnut',
    data: {
      labels: sampleData.pie.labels,
      datasets: [{
        data: sampleData.pie.data,
        backgroundColor: ['var(--primary)', 'var(--secondary)', 'var(--warning)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  },
  radar: {
    type: 'radar',
    data: {
      labels: sampleData.radar.labels,
      datasets: [{
        label: 'Performance',
        data: sampleData.radar.data,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'var(--primary)',
        pointBackgroundColor: 'var(--primary)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        r: {
          beginAtZero: true
        }
      }
    }
  }
};

// Initialize Charts
function initChart(canvasId, type) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, chartConfigs[type]);
}

// Update Chart Data
function updateChart(chart, newData, timeframe) {
  // Simulate data change based on timeframe
  const multiplier = timeframe === '7' ? 0.7 : timeframe === '30' ? 1 : 1.3;
  const updatedData = newData.map(value => Math.floor(value * multiplier));

  chart.data.datasets[0].data = updatedData;
  chart.update('active'); // Animate update
}

// Timeframe Buttons
function initTimeframeControls(chart, chartType) {
  const buttons = document.querySelectorAll('.timeframe-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const timeframe = btn.getAttribute('data-timeframe');
      updateChart(chart, sampleData[chartType].data, timeframe);
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Initialize all charts on page
function initAllCharts() {
  const charts = {};

  if (document.getElementById('lineChart')) {
    charts.line = initChart('lineChart', 'line');
    initTimeframeControls(charts.line, 'line');
  }

  if (document.getElementById('barChart')) {
    charts.bar = initChart('barChart', 'bar');
    initTimeframeControls(charts.bar, 'bar');
  }

  if (document.getElementById('pieChart')) {
    charts.pie = initChart('pieChart', 'pie');
  }

  if (document.getElementById('radarChart')) {
    charts.radar = initChart('radarChart', 'radar');
  }

  return charts;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initAllCharts);

// Export for use in other scripts
window.ChartUtils = {
  initChart,
  updateChart,
  initAllCharts
};
