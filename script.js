document.getElementById('stmt-account').value = statementData.accountNumber;
  document.getElementById('stmt-begin-date').value = statementData.beginningDate;
  document.getElementById('stmt-end-date').value = statementData.endingDate;
  document.getElementById('stmt-begin-balance').value = statementData.beginningBalance;
  document.getElementById('stmt-end-balance').value = statementData.endingBalance;
  document.getElementById('dividend-income').value = statementData.dividendIncome;
  document.getElementById('unrealized-gain-loss').value = statementData.unrealizedGainLoss;
  
  // Display data previews
  document.getElementById('gl-data-preview').textContent = JSON.stringify(glData, null, 2);
  document.getElementById('statement-data-preview').textContent = JSON.stringify(statementData, null, 2);
  
  // Enable buttons
  document.getElementById('perform-reconciliation').disabled = false;
  
  // Switch to extract tab
  document.querySelector('.tab[data-tab="extract"]').click();
}

// Extract data from files
function extractData() {
  try {
    // In a real implementation, this would parse the Excel and PDF files
    // For demo purposes, we'll use simplified extraction logic
    
    // Extract GL data
    if (glData.preliminary) {
      // Sample extraction logic - would be more complex in real implementation
      glData = {
        accountNumber: "10202",
        accountName: "Edward Jones Investment Acct",
        balanceDate: "2025-02-28",
        balance: 229138.59,
        dividendAccountNumber: "9020",
        unrealizedGainLossAccountNumber: "30200"
      };
    }
    
    // Extract statement data
    if (statementData.preliminary) {
      // Sample extraction logic - would be more complex in real implementation
      statementData = {
        accountNumber: "283-21821-1-3",
        beginningDate: "2025-03-01",
        endingDate: "2025-03-28",
        beginningBalance: 229138.59,
        endingBalance: 219557.03,
        dividendIncome: 214.98,
        unrealizedGainLoss: -9581.56,
        transactions: [
          { date: "2025-03-03", description: "Dividend on Franklin Total Return A", amount: 51.01 },
          { date: "2025-03-03", description: "Reinvestment into Franklin Total Return A", amount: -51.01 },
          { date: "2025-03-03", description: "Dividend on Franklin Low Dur Ttl Rtn A", amount: 51.81 },
          { date: "2025-03-03", description: "Reinvestment into Franklin Low Dur Ttl Rtn A", amount: -51.81 },
          { date: "2025-03-04", description: "Dividend on Franklin Income A1", amount: 50.49 },
          { date: "2025-03-04", description: "Reinvestment into Franklin Income A1", amount: -50.49 },
          { date: "2025-03-27", description: "Dividend on Franklin U.S. Govt Secs A1", amount: 38.95 },
          { date: "2025-03-27", description: "Reinvestment into Franklin U.S. Govt Secs A1", amount: -38.95 },
          { date: "2025-03-27", description: "Dividend on Templeton Global Bond A", amount: 22.72 },
          { date: "2025-03-27", description: "Reinvestment into Templeton Global Bond A", amount: -22.72 }
        ],
        portfolioComposition: [
          { name: "Franklin Dynatech A", value: 47146.04 },
          { name: "Franklin Income A1", value: 10974.88 },
          { name: "Franklin Low Dur Ttl Rtn A", value: 16640.86 },
          { name: "Franklin Rising Dividends A", value: 65169.87 },
          { name: "Templeton Foreign A", value: 17760.51 },
          { name: "Templeton Glbl Smaller Cos A", value: 27350.32 },
          { name: "Templeton Global Bond A", value: 4329.54 },
          { name: "Franklin Total Return A", value: 16310.56 },
          { name: "Franklin U.S. Govt Secs A1", value: 13874.45 }
        ]
      };
    }
    
    // Populate form fields
    document.getElementById('gl-account').value = glData.accountNumber;
    document.getElementById('gl-account-name').value = glData.accountName;
    document.getElementById('gl-balance-date').value = glData.balanceDate;
    document.getElementById('gl-balance').value = glData.balance;
    document.getElementById('dividend-account').value = glData.dividendAccountNumber;
    document.getElementById('unrealized-account').value = glData.unrealizedGainLossAccountNumber;
    
    document.getElementById('stmt-account').value = statementData.accountNumber;
    document.getElementById('stmt-begin-date').value = statementData.beginningDate;
    document.getElementById('stmt-end-date').value = statementData.endingDate;
    document.getElementById('stmt-begin-balance').value = statementData.beginningBalance;
    document.getElementById('stmt-end-balance').value = statementData.endingBalance;
    document.getElementById('dividend-income').value = statementData.dividendIncome;
    document.getElementById('unrealized-gain-loss').value = statementData.unrealizedGainLoss;
    
    // Display data previews
    document.getElementById('gl-data-preview').textContent = JSON.stringify(glData, null, 2);
    document.getElementById('statement-data-preview').textContent = JSON.stringify(statementData, null, 2);
    
    // Enable buttons
    document.getElementById('perform-reconciliation').disabled = false;
    
    alert("Data extracted successfully!");
  } catch (error) {
    console.error("Error extracting data:", error);
    alert("Error extracting data: " + error.message);
  }
}

// Perform reconciliation
function performReconciliation() {
  // Get values from form
  const glBalance = parseFloat(document.getElementById('gl-balance').value);
  const glBalanceDate = document.getElementById('gl-balance-date').value;
  const stmtBeginBalance = parseFloat(document.getElementById('stmt-begin-balance').value);
  const stmtEndBalance = parseFloat(document.getElementById('stmt-end-balance').value);
  const dividendIncome = parseFloat(document.getElementById('dividend-income').value);
  const unrealizedGainLoss = parseFloat(document.getElementById('unrealized-gain-loss').value);
  
  // Calculate dividend reinvestment
  const dividendReinvestment = -dividendIncome;
  
  // Calculate adjusted balance
  const adjustedBalance = glBalance + dividendIncome + unrealizedGainLoss + dividendReinvestment;
  
  // Calculate difference
  const difference = adjustedBalance - stmtEndBalance;
  
  // Check if reconciled (within $0.01)
  const reconciled = Math.abs(difference) < 0.01;
  
  // Store reconciliation data
  reconciliationData = {
    glBalance,
    glBalanceDate,
    stmtBeginBalance,
    stmtEndBalance,
    dividendIncome,
    unrealizedGainLoss,
    dividendReinvestment,
    adjustedBalance,
    difference,
    reconciled
  };
  
  // Update reconciliation display
  document.getElementById('recon-gl-date').textContent = formatDate(glBalanceDate);
  document.getElementById('recon-gl-balance').textContent = formatCurrency(glBalance);
  document.getElementById('recon-dividend-income').textContent = formatCurrency(dividendIncome);
  document.getElementById('recon-unrealized-loss').textContent = formatCurrency(unrealizedGainLoss);
  document.getElementById('recon-dividend-reinvest').textContent = formatCurrency(dividendReinvestment);
  document.getElementById('recon-adjusted-balance').textContent = formatCurrency(adjustedBalance);
  document.getElementById('recon-stmt-balance').textContent = formatCurrency(stmtEndBalance);
  document.getElementById('recon-difference').textContent = formatCurrency(difference);
  
  const statusElement = document.getElementById('recon-status');
  if (reconciled) {
    statusElement.textContent = "RECONCILED ✓";
    statusElement.className = "text-right reconciled";
  } else {
    statusElement.textContent = "NOT RECONCILED ✗";
    statusElement.className = "text-right not-reconciled";
  }
  
  // Update dividend transactions table
  updateDividendTransactionsTable();
  
  // Enable journal entries button
  document.getElementById('generate-journal-entries').disabled = false;
  
  // Switch to reconciliation tab
  document.querySelector('.tab[data-tab="reconciliation"]').click();
}

// Update dividend transactions table
function updateDividendTransactionsTable() {
  const tableBody = document.getElementById('dividend-transactions').querySelector('tbody');
  tableBody.innerHTML = '';
  
  let totalDividends = 0;
  
  // Filter transactions to show only dividend income (not reinvestments)
  const dividendTransactions = statementData.transactions.filter(t => t.amount > 0);
  
  for (const transaction of dividendTransactions) {
    const row = document.createElement('tr');
    
    const dateCell = document.createElement('td');
    dateCell.textContent = formatDate(transaction.date);
    row.appendChild(dateCell);
    
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = transaction.description;
    row.appendChild(descriptionCell);
    
    const amountCell = document.createElement('td');
    amountCell.textContent = formatCurrency(transaction.amount);
    amountCell.className = 'text-right';
    row.appendChild(amountCell);
    
    tableBody.appendChild(row);
    
    totalDividends += transaction.amount;
  }
  
  // Add total row
  const totalRow = document.createElement('tr');
  totalRow.className = 'total-row';
  
  const totalLabelCell = document.createElement('td');
  totalLabelCell.colSpan = 2;
  totalLabelCell.textContent = 'Total Dividends';
  totalRow.appendChild(totalLabelCell);
  
  const totalAmountCell = document.createElement('td');
  totalAmountCell.textContent = formatCurrency(totalDividends);
  totalAmountCell.className = 'text-right';
  totalRow.appendChild(totalAmountCell);
  
  tableBody.appendChild(totalRow);
}

// Generate journal entries
function generateJournalEntries() {
  // Clear existing entries
  const container = document.getElementById('journal-entries-container');
  container.innerHTML = '';
  
  // Entry 1: Record dividend income
  const entry1 = document.createElement('div');
  entry1.className = 'journal-entry';
  entry1.innerHTML = `
    <h3>Journal Entry #1: Record Dividend Income</h3>
    <table>
      <tr>
        <th>Account</th>
        <th class="text-right">Debit</th>
        <th class="text-right">Credit</th>
      </tr>
      <tr>
        <td>${glData.accountNumber} · ${glData.accountName}</td>
        <td class="text-right">${formatCurrency(reconciliationData.dividendIncome)}</td>
        <td class="text-right"></td>
      </tr>
      <tr>
        <td>${glData.dividendAccountNumber} · Dividend Income</td>
        <td class="text-right"></td>
        <td class="text-right">${formatCurrency(reconciliationData.dividendIncome)}</td>
      </tr>
    </table>
    <p><em>To record dividend income for period ending ${formatDate(statementData.endingDate)}</em></p>
  `;
  container.appendChild(entry1);
  
  // Entry 2: Record unrealized gain/loss
  const isLoss = reconciliationData.unrealizedGainLoss < 0;
  const unrealizedAmount = Math.abs(reconciliationData.unrealizedGainLoss);
  
  const entry2 = document.createElement('div');
  entry2.className = 'journal-entry';
  entry2.innerHTML = `
    <h3>Journal Entry #2: Record Unrealized ${isLoss ? 'Loss' : 'Gain'}</h3>
    <table>
      <tr>
        <th>Account</th>
        <th class="text-right">Debit</th>
        <th class="text-right">Credit</th>
      </tr>
      <tr>
        <td>${glData.unrealizedGainLossAccountNumber} · Unrealized Gains or Losses</td>
        <td class="text-right">${isLoss ? formatCurrency(unrealizedAmount) : ''}</td>
        <td class="text-right">${!isLoss ? formatCurrency(unrealizedAmount) : ''}</td>
      </tr>
      <tr>
        <td>${glData.accountNumber} · ${glData.accountName}</td>
        <td class="text-right">${!isLoss ? formatCurrency(unrealizedAmount) : ''}</td>
        <td class="text-right">${isLoss ? formatCurrency(unrealizedAmount) : ''}</td>
      </tr>
    </table>
    <p><em>To record unrealized ${isLoss ? 'loss' : 'gain'} for period ending ${formatDate(statementData.endingDate)}</em></p>
  `;
  container.appendChild(entry2);
  
  // Entry 3: Record dividend reinvestment
  const entry3 = document.createElement('div');
  entry3.className = 'journal-entry';
  entry3.innerHTML = `
    <h3>Journal Entry #3: Record Dividend Reinvestment</h3>
    <table>
      <tr>
        <th>Account</th>
        <th class="text-right">Debit</th>
        <th class="text-right">Credit</th>
      </tr>
      <tr>
        <td>${glData.unrealizedGainLossAccountNumber} · Unrealized Gains or Losses</td>
        <td class="text-right">${formatCurrency(Math.abs(reconciliationData.dividendReinvestment))}</td>
        <td class="text-right"></td>
      </tr>
      <tr>
        <td>${glData.accountNumber} · ${glData.accountName}</td>
        <td class="text-right"></td>
        <td class="text-right">${formatCurrency(Math.abs(reconciliationData.dividendReinvestment))}</td>
      </tr>
    </table>
    <p><em>To record reinvestment of dividends for period ending ${formatDate(statementData.endingDate)}</em></p>
  `;
  container.appendChild(entry3);
  
  // Store journal entries for later use
  journalEntries = [
    {
      number: 1,
      description: "Record Dividend Income",
      entries: [
        {
          account: glData.accountNumber,
          accountName: glData.accountName,
          debit: reconciliationData.dividendIncome,
          credit: 0
        },
        {
          account: glData.dividendAccountNumber,
          accountName: "Dividend Income",
          debit: 0,
          credit: reconciliationData.dividendIncome
        }
      ]
    },
    {
      number: 2,
      description: `Record Unrealized ${isLoss ? 'Loss' : 'Gain'}`,
      entries: [
        {
          account: glData.unrealizedGainLossAccountNumber,
          accountName: "Unrealized Gains or Losses",
          debit: isLoss ? unrealizedAmount : 0,
          credit: !isLoss ? unrealizedAmount : 0
        },
        {
          account: glData.accountNumber,
          accountName: glData.accountName,
          debit: !isLoss ? unrealizedAmount : 0,
          credit: isLoss ? unrealizedAmount : 0
        }
      ]
    },
    {
      number: 3,
      description: "Record Dividend Reinvestment",
      entries: [
        {
          account: glData.unrealizedGainLossAccountNumber,
          accountName: "Unrealized Gains or Losses",
          debit: Math.abs(reconciliationData.dividendReinvestment),
          credit: 0
        },
        {
          account: glData.accountNumber,
          accountName: glData.accountName,
          debit: 0,
          credit: Math.abs(reconciliationData.dividendReinvestment)
        }
      ]
    }
  ];
  
  // Enable generate report button
  document.getElementById('generate-report').disabled = false;
  
  // Switch to entries tab
  document.querySelector('.tab[data-tab="entries"]').click();
}

// Generate report
function generateReport() {
  // Update portfolio composition table
  const tableBody = document.getElementById('portfolio-composition').querySelector('tbody');
  tableBody.innerHTML = '';
  
  let totalValue = 0;
  for (const item of statementData.portfolioComposition) {
    totalValue += item.value;
  }
  
  for (const item of statementData.portfolioComposition) {
    const row = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);
    
    const valueCell = document.createElement('td');
    valueCell.textContent = formatCurrency(item.value);
    valueCell.className = 'text-right';
    row.appendChild(valueCell);
    
    const percentageCell = document.createElement('td');
    const percentage = (item.value / totalValue * 100).toFixed(2);
    percentageCell.textContent = `${percentage}%`;
    percentageCell.className = 'text-right';
    row.appendChild(percentageCell);
    
    tableBody.appendChild(row);
  }
  
  // Add total row
  const totalRow = document.createElement('tr');
  totalRow.className = 'total-row';
  
  const totalLabelCell = document.createElement('td');
  totalLabelCell.textContent = 'Total';
  totalRow.appendChild(totalLabelCell);
  
  const totalValueCell = document.createElement('td');
  totalValueCell.textContent = formatCurrency(totalValue);
  totalValueCell.className = 'text-right';
  totalRow.appendChild(totalValueCell);
  
  const totalPercentageCell = document.createElement('td');
  totalPercentageCell.textContent = '100.00%';
  totalPercentageCell.className = 'text-right';
  totalRow.appendChild(totalPercentageCell);
  
  tableBody.appendChild(totalRow);
  
  // Update performance summary table
  const performanceTable = document.getElementById('performance-summary').querySelector('tbody');
  performanceTable.innerHTML = '';
  
  const performanceData = [
    { period: 'This Quarter', rate: '-2.97%' },
    { period: 'Year to Date', rate: '-2.97%' },
    { period: 'Last 12 Months', rate: '1.17%' },
    { period: '3 Years (Annualized)', rate: '3.16%' },
    { period: '5 Years (Annualized)', rate: '9.45%' }
  ];
  
  for (const item of performanceData) {
    const row = document.createElement('tr');
    
    const periodCell = document.createElement('td');
    periodCell.textContent = item.period;
    row.appendChild(periodCell);
    
    const rateCell = document.createElement('td');
    rateCell.textContent = item.rate;
    rateCell.className = 'text-right';
    row.appendChild(rateCell);
    
    performanceTable.appendChild(row);
  }
  
  // Create portfolio chart
  if (typeof Chart !== 'undefined') {
    createPortfolioChart();
  }
  
  // Switch to report tab
  document.querySelector('.tab[data-tab="report"]').click();
}

// Create portfolio chart
function createPortfolioChart() {
  const ctx = document.getElementById('portfolioChart').getContext('2d');
  
  // Check if chart already exists
  if (window.portfolioChart) {
    window.portfolioChart.destroy();
  }
  
  // Prepare data
  const labels = statementData.portfolioComposition.map(item => item.name);
  const data = statementData.portfolioComposition.map(item => item.value);
  
  // Define colors
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#8AC249', '#EA526F', '#23395B'
  ];
  
  // Create chart
  window.portfolioChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Start new reconciliation
function startNewReconciliation() {
  // Reset form fields
  document.getElementById('gl-account').value = '';
  document.getElementById('gl-account-name').value = '';
  document.getElementById('gl-balance-date').value = '';
  document.getElementById('gl-balance').value = '';
  document.getElementById('dividend-account').value = '';
  document.getElementById('unrealized-account').value = '';
  
  document.getElementById('stmt-account').value = '';
  document.getElementById('stmt-begin-date').value = '';
  document.getElementById('stmt-end-date').value = '';
  document.getElementById('stmt-begin-balance').value = '';
  document.getElementById('stmt-end-balance').value = '';
  document.getElementById('dividend-income').value = '';
  document.getElementById('unrealized-gain-loss').value = '';
  
  // Reset file info
  document.getElementById('excel-file-info').textContent = '';
  document.getElementById('pdf-file-info').textContent = '';
  
  // Hide previews
  document.getElementById('excel-preview-section').classList.add('hidden');
  document.getElementById('pdf-preview-section').classList.add('hidden');
  
  // Reset data
  glData = {};
  statementData = {};
  reconciliationData = {};
  journalEntries = [];
  
  // Disable buttons
  document.getElementById('continue-to-extraction').disabled = true;
  document.getElementById('perform-reconciliation').disabled = true;
  document.getElementById('generate-journal-entries').disabled = true;
  document.getElementById('generate-report').disabled = true;
  
  // Switch to upload tab
  document.querySelector('.tab[data-tab="upload"]').click();
}

// Format currency amount
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date string
function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return as-is if invalid
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateString; // Return original on error
  }
}
