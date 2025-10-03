// Controle de modo da aplicação (Orçamento ou Recibo)
let appMode = 'budget'; // 'budget' ou 'receipt'
let receiptContentLoaded = false;

document.addEventListener('DOMContentLoaded', function() {
  console.log('App mode script carregado');
  
  // Inicializar o modo da aplicação
  updateAppMode(appMode);
  
  // Adicionar event listeners para os botões de modo
  document.querySelectorAll('.header-tab-button').forEach(button => {
    button.addEventListener('click', function() {
      const mode = this.getAttribute('data-mode');
      updateAppMode(mode);
    });
  });
  
  // Criar container para o conteúdo do recibo
  const mainContainer = document.querySelector('.container');
  const receiptContainer = document.createElement('div');
  receiptContainer.id = 'receipt-container';
  receiptContainer.className = 'receipt-container';
  receiptContainer.style.display = 'none';
  mainContainer.appendChild(receiptContainer);
});

// Função para atualizar o modo da aplicação
function updateAppMode(mode) {
  console.log(`Alterando para o modo: ${mode}`);
  appMode = mode;
  
  // Atualizar classes dos botões
  document.querySelectorAll('.header-tab-button').forEach(button => {
    if (button.getAttribute('data-mode') === mode) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Carregar conteúdo do recibo se necessário
  if (mode === 'receipt' && !receiptContentLoaded) {
    loadReceiptContent();
  } else {
    // Atualizar a visibilidade dos elementos baseado no modo
    updateVisibilityBasedOnMode();
  }
}

// Função para carregar o conteúdo do recibo
function loadReceiptContent() {
  console.log('Carregando conteúdo do recibo...');
  
  // Fazer uma requisição para obter o conteúdo do recibo
  fetch('receipt-content.html')
    .then(response => response.text())
    .then(html => {
      // Inserir o conteúdo no container
      document.getElementById('receipt-container').innerHTML = html;
      receiptContentLoaded = true;
      
      // Atualizar a visibilidade dos elementos
      updateVisibilityBasedOnMode();
      
      // Inicializar a prévia do recibo
      if (typeof updateReceiptPreview === 'function') {
        updateReceiptPreview();
      }
      
      // Adicionar event listeners para o formulário de recibo
      const paymentMethodSelect = document.getElementById('receipt-payment-method');
      if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function() {
          const detailsContainer = document.getElementById('receipt-payment-details-container');
          if (detailsContainer) {
            if (['cartao_credito', 'pix', 'transferencia', 'outro'].includes(this.value)) {
              detailsContainer.style.display = 'block';
            } else {
              detailsContainer.style.display = 'none';
            }
          }
          
          if (typeof updateReceiptPreview === 'function') {
            updateReceiptPreview();
          }
        });
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o conteúdo do recibo:', error);
    });
}

// Função para atualizar a visibilidade dos elementos baseado no modo
function updateVisibilityBasedOnMode() {
  // Elementos principais
  const stepsIndicator = document.querySelector('.steps-indicator');
  const cardContainer = document.querySelector('.card');
  const receiptContainer = document.getElementById('receipt-container');
  const totalDisplay = document.getElementById('total-display');
  
  if (appMode === 'budget') {
    // Modo Orçamento
    if (stepsIndicator) stepsIndicator.style.display = '';
    if (cardContainer) cardContainer.style.display = '';
    if (receiptContainer) receiptContainer.style.display = 'none';
    if (totalDisplay && currentStep === 3) totalDisplay.style.display = 'block';
    
    // Atualizar o título da página
    document.title = 'HFN Funilaria - Sistema de Orçamentos';
    
    // Remover classe do body
    document.body.classList.remove('receipt-mode');
    document.body.classList.add('budget-mode');
  } else {
    // Modo Recibo
    if (stepsIndicator) stepsIndicator.style.display = 'none';
    if (cardContainer) cardContainer.style.display = 'none';
    if (receiptContainer) receiptContainer.style.display = '';
    if (totalDisplay) totalDisplay.style.display = 'none';
    
    // Atualizar o título da página
    document.title = 'HFN Funilaria - Sistema de Recibos';
    
    // Adicionar classe ao body
    document.body.classList.remove('budget-mode');
    document.body.classList.add('receipt-mode');
  }
  
  console.log(`Modo atualizado: ${appMode}`);
}

// Função para verificar o modo atual
function isReceiptMode() {
  return appMode === 'receipt';
}

// Função para verificar o modo atual
function isBudgetMode() {
  return appMode === 'budget';
}
