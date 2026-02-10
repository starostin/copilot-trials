// Budget Data Manager
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];
const STORAGE_KEY = 'bucks2barData';

// Global chart instance
let chartInstance = null;

// Load data from localStorage
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing stored data:', e);
        }
    }
    // Return default empty structure
    return {
        income: new Array(12).fill(0),
        expenses: new Array(12).fill(0)
    };
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Get current data from input fields
function getCurrentData() {
    const data = {
        income: [],
        expenses: []
    };
    
    // Collect income values
    document.querySelectorAll('.income-input').forEach(input => {
        const value = parseFloat(input.value) || 0;
        data.income.push(value);
    });
    
    // Collect expense values
    document.querySelectorAll('.expense-input').forEach(input => {
        const value = parseFloat(input.value) || 0;
        data.expenses.push(value);
    });
    
    return data;
}

// Update totals display
function updateTotals() {
    const data = getCurrentData();
    
    const totalIncome = data.income.reduce((sum, val) => sum + val, 0);
    const totalExpenses = data.expenses.reduce((sum, val) => sum + val, 0);
    
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
}

// Populate inputs with data
function populateInputs(data) {
    document.querySelectorAll('.income-input').forEach((input, index) => {
        input.value = data.income[index] > 0 ? data.income[index].toFixed(2) : '';
    });
    
    document.querySelectorAll('.expense-input').forEach((input, index) => {
        input.value = data.expenses[index] > 0 ? data.expenses[index].toFixed(2) : '';
    });
}

// Generate random budget data
function populateRandomData() {
    const data = {
        income: [],
        expenses: []
    };
    
    // Generate random income between $2000 and $8000
    for (let i = 0; i < 12; i++) {
        const income = Math.random() * 6000 + 2000; // 2000-8000
        data.income.push(parseFloat(income.toFixed(2)));
    }
    
    // Generate random expenses between $1000 and $6000
    for (let i = 0; i < 12; i++) {
        const expense = Math.random() * 5000 + 1000; // 1000-6000
        data.expenses.push(parseFloat(expense.toFixed(2)));
    }
    
    populateInputs(data);
    saveData(data);
    updateTotals();
    updateChart(data);
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data?')) {
        const emptyData = {
            income: new Array(12).fill(0),
            expenses: new Array(12).fill(0)
        };
        
        populateInputs(emptyData);
        localStorage.removeItem(STORAGE_KEY);
        updateTotals();
        updateChart(emptyData);
    }
}

// Initialize Chart.js
function initChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const data = loadData();
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: [
                {
                    label: 'Income',
                    data: data.income,
                    backgroundColor: 'rgba(40, 167, 69, 0.7)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Expenses',
                    data: data.expenses,
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses',
                    font: {
                        size: 18
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '$' + context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Amount (USD)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

// Update chart with new data
function updateChart(data) {
    if (chartInstance) {
        chartInstance.data.datasets[0].data = data.income;
        chartInstance.data.datasets[1].data = data.expenses;
        chartInstance.update();
    }
}

// Handle input changes
function handleInputChange() {
    const data = getCurrentData();
    saveData(data);
    updateTotals();
    updateChart(data);
}

// Download chart as PNG
function downloadChartAsPNG() {
    if (chartInstance) {
        // Get the chart as a base64 image
        const url = chartInstance.toBase64Image();
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'budget-chart.png';
        link.href = url;
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Handle submit button
function handleSubmit() {
    const data = getCurrentData();
    saveData(data);
    updateTotals();
    updateChart(data);
    
    // Visual feedback
    const submitBtn = document.getElementById('submitDataBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✅ Data Saved!';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Username validation
function validateUsername(username) {
    // Check length > 6 (minimum 7 characters)
    if (username.length <= 6) {
        return {
            valid: false,
            message: 'Username must be more than 6 characters long'
        };
    }
    
    // Check for at least 1 uppercase letter
    const hasUppercase = /[A-Z]/.test(username);
    if (!hasUppercase) {
        return {
            valid: false,
            message: 'Username must contain at least 1 uppercase letter'
        };
    }
    
    return {
        valid: true,
        message: 'Username is valid!'
    };
}

// Load username from storage
function loadUsername() {
    return localStorage.getItem('bucks2barUsername') || '';
}

// Save username to storage
function saveUsername(username) {
    localStorage.setItem('bucks2barUsername', username);
}

// Handle username input validation
function handleUsernameInput() {
    const input = document.getElementById('usernameInput');
    const errorDiv = document.getElementById('usernameError');
    const successDiv = document.getElementById('usernameSuccess');
    const username = input.value.trim();
    
    if (username.length === 0) {
        // Reset validation displays
        input.classList.remove('is-valid', 'is-invalid');
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
        return;
    }
    
    const validation = validateUsername(username);
    
    if (validation.valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorDiv.style.display = 'none';
        successDiv.style.display = 'block';
        successDiv.textContent = validation.message;
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        successDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = validation.message;
    }
}

// Handle username form submission
function handleUsernameSubmit(event) {
    event.preventDefault();
    
    const input = document.getElementById('usernameInput');
    const username = input.value.trim();
    const validation = validateUsername(username);
    
    if (validation.valid) {
        saveUsername(username);
        
        // Show success feedback
        const form = document.getElementById('usernameForm');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '✅ Saved!';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    } else {
        handleUsernameInput();
    }
}

// Initialize application
window.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    const data = loadData();
    populateInputs(data);
    updateTotals();
    
    // Initialize chart
    initChart();
    
    // Load and populate saved username
    const savedUsername = loadUsername();
    if (savedUsername) {
        const usernameInput = document.getElementById('usernameInput');
        usernameInput.value = savedUsername;
        handleUsernameInput();
    }
    
    // Add username form event listeners
    const usernameInput = document.getElementById('usernameInput');
    const usernameForm = document.getElementById('usernameForm');
    
    usernameInput.addEventListener('input', handleUsernameInput);
    usernameForm.addEventListener('submit', handleUsernameSubmit);
    
    // Add event listeners to all inputs
    document.querySelectorAll('.income-input, .expense-input').forEach(input => {
        input.addEventListener('input', handleInputChange);
    });
    
    // Add button event listeners
    document.getElementById('populateRandomBtn').addEventListener('click', populateRandomData);
    document.getElementById('clearDataBtn').addEventListener('click', clearAllData);
    document.getElementById('downloadChartBtn').addEventListener('click', downloadChartAsPNG);
    document.getElementById('submitDataBtn').addEventListener('click', handleSubmit);
    
    console.log('Bucks2bar Budget Tracker initialized!');
});