// Estado da aplicação
let currentStep = 1
let budgetItems = []
let itemIdCounter = 0

// Flag para controlar quando o autocomplete pode ser ativado
// Isso evita que as sugestões apareçam automaticamente durante a transição entre etapas
window.allowAutocomplete = true

// Dados do formulário
const formData = {
  client: {
    name: "",
    address: "",
    phone: "",
    email: "",
  },
  vehicle: {
    name: "",
    model: "",
    plate: "",
    year: "",
  },
  receipt: {
    value: "",
    paymentMethod: "",
    paymentDetails: "",
    date: "",
    notes: "",
  },
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  updateStepDisplay()
  updateNavigationButtons()
  
  // Adicionar event listeners para as abas
  document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")
      switchTab(tabId)
    })
  })
})

// Navegação entre etapas
function nextStep() {
  if (currentStep < 4) {
    // Desativar autocomplete durante a transição
    window.allowAutocomplete = false
    
    saveCurrentStepData()
    currentStep++
    updateStepDisplay()
    updateNavigationButtons()

    if (currentStep === 4) {
      // Garantir que as abas estejam inicializadas corretamente
      console.log("Etapa 4 ativada - inicializando abas")
      
      // Certificar que a primeira aba está ativa
      document.querySelectorAll(".tab-button").forEach(button => {
        button.classList.remove("active")
      })
      
      document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active")
      })
      
      document.querySelector('.tab-button[data-tab="budget"]').classList.add("active")
      document.getElementById('tab-budget').classList.add("active")
      
      renderPreview()
      updateReceiptPreview()
    }

    if (currentStep === 3) {
      updateTotalDisplay()
    }
    
    // Reativar autocomplete após um pequeno atraso
    setTimeout(() => {
      window.allowAutocomplete = true
    }, 500)
  }
}

function prevStep() {
  if (currentStep > 1) {
    // Desativar autocomplete durante a transição
    window.allowAutocomplete = false
    
    saveCurrentStepData()
    currentStep--
    updateStepDisplay()
    updateNavigationButtons()

    if (currentStep === 3) {
      updateTotalDisplay()
    }
    
    // Reativar autocomplete após um pequeno atraso
    setTimeout(() => {
      window.allowAutocomplete = true
    }, 500)
  }
}

function updateStepDisplay() {
  // Atualizar conteúdo das etapas
  document.querySelectorAll(".step-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(`step-${currentStep}`).classList.add("active")

  // Atualizar indicadores
  document.querySelectorAll(".step-circle").forEach((circle, index) => {
    const stepNum = index + 1
    circle.classList.remove("active", "completed")

    if (stepNum === currentStep) {
      circle.classList.add("active")
    } else if (stepNum < currentStep) {
      circle.classList.add("completed")
    }
  })

  document.querySelectorAll(".step-label").forEach((label, index) => {
    const stepNum = index + 1
    label.classList.remove("active")

    if (stepNum === currentStep) {
      label.classList.add("active")
    }
  })

  document.querySelectorAll(".step-line").forEach((line, index) => {
    const stepNum = index + 1
    line.classList.remove("completed")

    if (stepNum < currentStep) {
      line.classList.add("completed")
    }
  })

  // Mostrar/ocultar total
  const totalDisplay = document.getElementById("total-display")
  if (currentStep === 3 && budgetItems.length > 0) {
    totalDisplay.style.display = "block"
  } else {
    totalDisplay.style.display = "none"
  }
}

function updateNavigationButtons() {
  const btnPrev = document.getElementById("btn-prev")
  const btnNext = document.getElementById("btn-next")

  btnPrev.disabled = currentStep === 1

  if (currentStep === 4) {
    btnNext.style.display = "none"
  } else {
    btnNext.style.display = "flex"
  }
}

// Função para alternar entre as abas
function switchTab(tabId) {
  console.log(`Alternando para a aba: ${tabId}`)
  
  // Remover classe active de todas as abas
  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.remove("active")
  })
  
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.remove("active")
  })
  
  // Adicionar classe active à aba selecionada
  const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`)
  const tabContent = document.getElementById(`tab-${tabId}`)
  
  if (tabButton && tabContent) {
    tabButton.classList.add("active")
    tabContent.classList.add("active")
    
    // Atualizar a prévia conforme a aba selecionada
    if (tabId === "receipt") {
      updateReceiptPreview()
    } else if (tabId === "budget") {
      renderPreview()
    }
    
    console.log(`Aba ${tabId} ativada com sucesso`)
  } else {
    console.error(`Erro ao alternar para a aba: ${tabId}. Elementos não encontrados.`)
    console.log('tabButton:', tabButton)
    console.log('tabContent:', tabContent)
  }
}

function saveCurrentStepData() {
  if (currentStep === 1) {
    formData.client.name = document.getElementById("client-name").value
    formData.client.address = document.getElementById("client-address").value
    formData.client.phone = document.getElementById("client-phone").value
    formData.client.email = document.getElementById("client-email").value
  } else if (currentStep === 2) {
    formData.vehicle.name = document.getElementById("vehicle-name").value
    formData.vehicle.model = document.getElementById("vehicle-model").value
    formData.vehicle.plate = document.getElementById("vehicle-plate").value
    formData.vehicle.year = document.getElementById("vehicle-year").value
  } else if (currentStep === 4) {
    // Na etapa 4, salvar os dados do recibo quando a aba de recibo estiver ativa
    if (document.getElementById("tab-receipt").classList.contains("active")) {
      formData.receipt.value = document.getElementById("receipt-value").value
      formData.receipt.paymentMethod = document.getElementById("receipt-payment-method").value
      formData.receipt.paymentDetails = document.getElementById("receipt-payment-details").value
      formData.receipt.date = document.getElementById("receipt-date").value
      formData.receipt.notes = document.getElementById("receipt-notes").value
    }
  }
}

// Gerenciamento de itens do orçamento
function addBudgetItem() {
  const description = document.getElementById("item-description").value
  const quantity = Number.parseInt(document.getElementById("item-quantity").value) || 1
  const price = Number.parseFloat(document.getElementById("item-price").value) || 0

  if (!description || price <= 0) {
    alert("Por favor, preencha a descrição e o valor do item.")
    return
  }

  const item = {
    id: itemIdCounter++,
    description,
    quantity,
    price,
  }

  budgetItems.push(item)

  // Limpar campos
  document.getElementById("item-description").value = ""
  document.getElementById("item-quantity").value = "1"
  document.getElementById("item-price").value = ""

  renderBudgetItems()
  updateTotalDisplay()
}

function removeBudgetItem(id) {
  budgetItems = budgetItems.filter((item) => item.id !== id)
  renderBudgetItems()
  updateTotalDisplay()
}

function renderBudgetItems() {
  const container = document.getElementById("budget-items-list")

  if (budgetItems.length === 0) {
    container.innerHTML = '<p class="empty-message">Nenhum item adicionado ainda</p>'
    return
  }

  container.innerHTML = budgetItems
    .map(
      (item) => `
        <div class="budget-item">
            <div class="budget-item-info">
                <div class="budget-item-description">${item.description}</div>
                <div class="budget-item-details">
                    ${item.quantity}x R$ ${item.price.toFixed(2)} = 
                    <span class="budget-item-total">R$ ${(item.quantity * item.price).toFixed(2)}</span>
                </div>
            </div>
            <button class="btn-remove" onclick="removeBudgetItem(${item.id})">Remover</button>
        </div>
    `,
    )
    .join("")
}

function updateTotalDisplay() {
  const total = budgetItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const totalElement = document.getElementById("total-value")

  if (totalElement) {
    totalElement.textContent = `R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const totalDisplay = document.getElementById("total-display")
  if (currentStep === 3 && budgetItems.length > 0) {
    totalDisplay.style.display = "block"
  } else {
    totalDisplay.style.display = "none"
  }
}

// Preview e geração de PDF
// Função para atualizar a prévia do recibo
function updateReceiptPreview() {
  const container = document.getElementById("receipt-preview")
  const receiptValue = document.getElementById("receipt-value").value
  const paymentMethod = document.getElementById("receipt-payment-method")
  const paymentDetails = document.getElementById("receipt-payment-details").value
  const receiptDate = document.getElementById("receipt-date").value
  const receiptNotes = document.getElementById("receipt-notes").value
  
  // Mostrar/esconder o campo de detalhes do pagamento
  const detailsContainer = document.getElementById("receipt-payment-details-container")
  if (paymentMethod.value && ["cartao_credito", "pix", "transferencia", "outro"].includes(paymentMethod.value)) {
    detailsContainer.style.display = "block"
  } else {
    detailsContainer.style.display = "none"
  }
  
  // Se não tiver valor, mostrar mensagem vazia
  if (!receiptValue) {
    container.innerHTML = '<p class="empty-message">Preencha os dados acima para visualizar a prévia do recibo</p>'
    return
  }
  
  // Formatação do valor
  const formattedValue = Number(receiptValue).toLocaleString("pt-BR", { 
    style: "currency", 
    currency: "BRL" 
  })
  
  // Formatação da data
  let formattedDate = ""
  if (receiptDate) {
    const date = new Date(receiptDate)
    formattedDate = date.toLocaleDateString("pt-BR")
  } else {
    const today = new Date()
    formattedDate = today.toLocaleDateString("pt-BR")
  }
  
  // Obter o nome do método de pagamento selecionado
  let paymentMethodText = ""
  if (paymentMethod.value) {
    paymentMethodText = paymentMethod.options[paymentMethod.selectedIndex].text
  }
  
  // Gerar o HTML do recibo
  let html = `
    <div class="receipt-header">
      <div class="receipt-title">RECIBO DE PAGAMENTO</div>
      <div class="receipt-subtitle">HFN Funilaria - Martelinho de Ouro</div>
    </div>
    
    <div class="receipt-body">
      <div class="receipt-row">
        <span class="receipt-label">Valor:</span>
        <span class="receipt-value-highlight">${formattedValue}</span>
      </div>
      
      <div class="receipt-row">
        <span class="receipt-label">Data:</span>
        <span class="receipt-value">${formattedDate}</span>
      </div>
  `
  
  // Cliente
  if (formData.client.name) {
    html += `
      <div class="receipt-row">
        <span class="receipt-label">Cliente:</span>
        <span class="receipt-value">${formData.client.name}</span>
      </div>
    `
  }
  
  // Veículo
  if (formData.vehicle.name) {
    let vehicleInfo = formData.vehicle.name
    if (formData.vehicle.plate) {
      vehicleInfo += ` - ${formData.vehicle.plate}`
    }
    html += `
      <div class="receipt-row">
        <span class="receipt-label">Veículo:</span>
        <span class="receipt-value">${vehicleInfo}</span>
      </div>
    `
  }
  
  // Forma de pagamento
  if (paymentMethodText) {
    html += `
      <div class="receipt-row">
        <span class="receipt-label">Forma de Pagamento:</span>
        <span class="receipt-value">${paymentMethodText}</span>
      </div>
    `
    
    // Detalhes do pagamento
    if (paymentDetails) {
      html += `
        <div class="receipt-row">
          <span class="receipt-label">Detalhes:</span>
          <span class="receipt-value">${paymentDetails}</span>
        </div>
      `
    }
  }
  
  // Observações
  if (receiptNotes) {
    html += `
      <div class="receipt-row">
        <span class="receipt-label">Observações:</span>
        <span class="receipt-value">${receiptNotes}</span>
      </div>
    `
  }
  
  html += `
    </div>
    
    <div class="receipt-footer">
      Recebemos o valor acima descrito referente aos serviços prestados.
    </div>
    
    <div class="receipt-signature">
      <div class="receipt-signature-line"></div>
      <div class="receipt-signature-label">HFN Funilaria - CNPJ XX.XXX.XXX/0001-XX</div>
    </div>
  `
  
  container.innerHTML = html
}

function renderPreview() {
  const container = document.getElementById("preview-content")
  const total = budgetItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  let html = ""

  // Dados do Cliente
  html += `
    <div class="rounded-lg border bg-muted/50 p-4">
      <h3 class="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        ${icons.fileText}
        Dados do Cliente
      </h3>
      <div class="space-y-2 text-sm">
  `

  if (formData.client.name || formData.client.address || formData.client.phone || formData.client.email) {
    if (formData.client.name) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Nome:</span> 
          <span class="text-foreground">${formData.client.name}</span>
        </p>
      `
    }
    if (formData.client.address) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Endereço:</span> 
          <span class="text-foreground">${formData.client.address}</span>
        </p>
      `
    }
    if (formData.client.phone) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Telefone:</span> 
          <span class="text-foreground">${formData.client.phone}</span>
        </p>
      `
    }
    if (formData.client.email) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">E-mail:</span> 
          <span class="text-foreground">${formData.client.email}</span>
        </p>
      `
    }
  } else {
    html += `<p class="text-muted-foreground">Nenhum dado informado</p>`
  }

  html += `
      </div>
    </div>
  `

  // Dados do Veículo
  html += `
    <div class="rounded-lg border bg-muted/50 p-4">
      <h3 class="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        ${icons.car}
        Dados do Veículo
      </h3>
      <div class="space-y-2 text-sm">
  `

  if (formData.vehicle.name || formData.vehicle.model || formData.vehicle.plate || formData.vehicle.year) {
    if (formData.vehicle.name) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Veículo:</span> 
          <span class="text-foreground">${formData.vehicle.name}</span>
        </p>
      `
    }
    if (formData.vehicle.model) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Modelo:</span> 
          <span class="text-foreground">${formData.vehicle.model}</span>
        </p>
      `
    }
    if (formData.vehicle.plate) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Placa:</span> 
          <span class="text-foreground">${formData.vehicle.plate}</span>
        </p>
      `
    }
    if (formData.vehicle.year) {
      html += `
        <p>
          <span class="font-medium text-muted-foreground">Ano:</span> 
          <span class="text-foreground">${formData.vehicle.year}</span>
        </p>
      `
    }
  } else {
    html += `<p class="text-muted-foreground">Nenhum dado informado</p>`
  }

  html += `
      </div>
    </div>
  `

  // Itens do Orçamento
  html += `
    <div class="rounded-lg border bg-muted/50 p-4">
      <h3 class="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        ${icons.list}
        Itens do Orçamento
      </h3>
  `

  if (budgetItems.length > 0) {
    html += '<div class="space-y-3">'
    
    budgetItems.forEach((item) => {
      html += `
        <div class="flex justify-between border-b pb-3 text-sm last:border-0">
          <div class="flex-1">
            <p class="font-medium text-foreground">${item.description}</p>
            <p class="text-xs text-muted-foreground">${item.quantity} × R$ ${item.price.toFixed(2)}</p>
          </div>
          <p class="font-semibold text-foreground">R$ ${(item.quantity * item.price).toFixed(2)}</p>
        </div>
      `
    })
    
    html += `
      <div class="mt-4 flex justify-between pt-4">
        <span class="text-base font-semibold text-foreground">TOTAL:</span>
        <span class="text-xl font-bold text-primary">R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
    `
    
    html += '</div>'
  } else {
    html += `<p class="text-muted-foreground">Nenhum item adicionado</p>`
  }

  html += `
    </div>
  `

  container.innerHTML = html
}

// Função auxiliar para converter imagem URL para base64 e obter suas dimensões
function getImageBase64(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onload = function() {
    var reader = new FileReader()
    reader.onloadend = function() {
      // Criar uma imagem para obter as dimensões
      var img = new Image()
      img.onload = function() {
        // Chamar o callback com o base64 e as dimensões
        callback(reader.result, img.width, img.height)
      }
      img.src = reader.result
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}

// Função para gerar e compartilhar o PDF
function generateAndSharePDF() {
  generatePDF(function(doc) {
    const blob = doc.output('blob');
    const file = new File([blob], 'orcamento_HFN.pdf', { type: "application/pdf" });
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: "Orçamento HFN",
        text: "Segue o orçamento em PDF da HFN Funilaria!",
        files: [file]
      }).catch((err) => {
        alert("Erro ao compartilhar: " + err.message);
      });
    } else {
      // Caso não dê pra compartilhar, salva e avisa usuário
      doc.save('orcamento_HFN.pdf');
      alert("Seu navegador não permite compartilhar arquivos PDF diretamente. O arquivo foi baixado, envie manualmente pelo WhatsApp ou outro app.");
    }
  });
}

// Função para visualizar o PDF sem baixá-lo
function previewPDF() {
  generatePDF(function(doc) {
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    
    // Criar modal para visualizar o PDF
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.innerHTML = `
      <div class="pdf-modal-content">
        <div class="pdf-modal-header">
          <h3>Visualização do Orçamento</h3>
          <button class="pdf-modal-close">&times;</button>
        </div>
        <div class="pdf-modal-body">
          <iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Impedir rolagem da página
    
    // Adicionar evento para fechar o modal
    const closeBtn = modal.querySelector('.pdf-modal-close');
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(modal);
      document.body.style.overflow = ''; // Restaurar rolagem
      URL.revokeObjectURL(url); // Liberar recursos
    });
  });
}

function generatePDF(callback) {
  // Carregar o logo antes de gerar o PDF
  getImageBase64('https://raw.githubusercontent.com/Guubal/hfn/main/logo.png', function(base64Logo, imgWidth, imgHeight) {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    // Cores modernas
    const primary = [255, 180, 0] // --primary: #ffb400
    const foreground = [61, 61, 64] // --foreground: #3d3d40
    const mutedForeground = [125, 125, 138] // --muted-foreground: #7d7d8a
    const bgMuted = [247, 247, 248] // --muted: #f7f7f8
    const border = [235, 235, 237] // --border: #ebebed
    const white = [255, 255, 255]

    let yPosition = 20

    // Cabeçalho com cor primária
    doc.setFillColor(...primary)
    doc.rect(0, 0, 210, 45, "F")

    // Logo HFN centralizado
    // Calcular as dimensões mantendo a proporção
    const logoMaxWidth = 60
    const logoMaxHeight = 25
    
    // Calcular a proporção da imagem
    const aspectRatio = imgWidth / imgHeight
    
    // Determinar as dimensões finais mantendo a proporção
    let logoWidth, logoHeight
    
    if (imgWidth > imgHeight) {
      // Imagem mais larga que alta
      logoWidth = Math.min(logoMaxWidth, imgWidth)
      logoHeight = logoWidth / aspectRatio
      
      // Verificar se a altura não excede o máximo
      if (logoHeight > logoMaxHeight) {
        logoHeight = logoMaxHeight
        logoWidth = logoHeight * aspectRatio
      }
    } else {
      // Imagem mais alta que larga ou quadrada
      logoHeight = Math.min(logoMaxHeight, imgHeight)
      logoWidth = logoHeight * aspectRatio
      
      // Verificar se a largura não excede o máximo
      if (logoWidth > logoMaxWidth) {
        logoWidth = logoMaxWidth
        logoHeight = logoWidth / aspectRatio
      }
    }
    
    // Centralizar o logo
    const logoX = (210 - logoWidth) / 2
    const logoY = 10
    
    // Adicionar o logo da URL
    try {
      doc.addImage(base64Logo, 'PNG', logoX, logoY, logoWidth, logoHeight)
    } catch (error) {
      // Fallback caso a imagem não carregue
      doc.setFillColor(...white)
      doc.roundedRect(logoX, 10, logoWidth, logoWidth / 3, 3, 3, "F")
      doc.setFontSize(22)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...primary)
      doc.text("HFN FUNILARIA", 105, 25, { align: "center" })
    }

    // Subtítulo
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...white)

    // Número do orçamento e data
    const currentDate = new Date()
    const dateStr = currentDate.toLocaleDateString("pt-BR")
    const orcamentoNum = `ORÇ-${currentDate.getTime().toString().slice(-6)}`

    // Adicionar sombra (um retângulo ligeiramente deslocado e com cor mais escura)
    // Usar uma cor mais suave para a sombra (cinza com transparência)
    doc.setFillColor(180, 180, 180) // Cor cinza médio para a sombra
    doc.roundedRect(142, 12, 60, 25, 3, 3, "F") // Deslocado 2 pontos para baixo e direita
    
    // Segunda camada de sombra para dar um efeito de gradiente
    doc.setFillColor(200, 200, 200) // Cor cinza mais claro
    doc.roundedRect(141, 11, 60, 25, 3, 3, "F") // Deslocado 1 ponto para baixo e direita
    
    // Retângulo branco principal por cima da sombra
    doc.setFillColor(...white)
    doc.roundedRect(140, 10, 60, 25, 3, 3, "F")
    doc.setFontSize(9)
    doc.setTextColor(...foreground)
    doc.setFont("helvetica", "bold")
    doc.text(`Nº: ${orcamentoNum}`, 170, 18, { align: "center" })
    doc.setFont("helvetica", "normal")
    doc.text(`Data: ${dateStr}`, 170, 24, { align: "center" })
    doc.text(`Validade: 15 dias`, 170, 30, { align: "center" })

    yPosition = 55

    // Definir largura e posição dos cards lado a lado
    const cardWidth = 87 // Largura de cada card
    const cardHeight = 60 // Altura fixa para os cards
    const cardSpacing = 6 // Espaçamento entre os cards
    
    // Posições X dos cards
    const clientCardX = 15
    const vehicleCardX = clientCardX + cardWidth + cardSpacing

    // Dados do Cliente - Estilo Card (lado esquerdo)
    doc.setFillColor(...bgMuted)
    doc.setDrawColor(...border)
    doc.roundedRect(clientCardX, yPosition, cardWidth, cardHeight, 3, 3, "FD")
    
    // Título do card do cliente
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...foreground)
    doc.text("Dados do Cliente", clientCardX + 10, yPosition + 10)
    
    // Linha separadora do card do cliente
    doc.setDrawColor(...border)
    doc.setLineWidth(0.5)
    doc.line(clientCardX + 10, yPosition + 13, clientCardX + cardWidth - 10, yPosition + 13)
    
    // Dados do Veículo - Estilo Card (lado direito)
    doc.setFillColor(...bgMuted)
    doc.setDrawColor(...border)
    doc.roundedRect(vehicleCardX, yPosition, cardWidth, cardHeight, 3, 3, "FD")
    
    // Título do card do veículo
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...foreground)
    doc.text("Dados do Veículo", vehicleCardX + 10, yPosition + 10)
    
    // Linha separadora do card do veículo
    doc.setDrawColor(...border)
    doc.setLineWidth(0.5)
    doc.line(vehicleCardX + 10, yPosition + 13, vehicleCardX + cardWidth - 10, yPosition + 13)
    
    // Preencher dados do cliente
    let clientYPos = yPosition + 20
    doc.setFontSize(9) // Fonte um pouco menor para caber no card
    
    if (formData.client.name || formData.client.address || formData.client.phone || formData.client.email) {
      if (formData.client.name) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Nome:", clientCardX + 10, clientYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        doc.text(formData.client.name, clientCardX + 35, clientYPos)
        clientYPos += 7
      }
      
      if (formData.client.address) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Endereço:", clientCardX + 10, clientYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        // Limitar o tamanho do texto para caber no card
        const addressLines = doc.splitTextToSize(formData.client.address, cardWidth - 40)
        doc.text(addressLines, clientCardX + 35, clientYPos)
        clientYPos += addressLines.length * 7
      }
      
      if (formData.client.phone) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Telefone:", clientCardX + 10, clientYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        doc.text(formData.client.phone, clientCardX + 35, clientYPos)
        clientYPos += 7
      }
      
      if (formData.client.email) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("E-mail:", clientCardX + 10, clientYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        // Limitar o tamanho do email para caber no card
        const emailLines = doc.splitTextToSize(formData.client.email, cardWidth - 40)
        doc.text(emailLines, clientCardX + 35, clientYPos)
        clientYPos += emailLines.length * 7
      }
    } else {
      doc.setTextColor(...mutedForeground)
      doc.text("Nenhum dado informado", clientCardX + 10, clientYPos)
    }
    
    // Preencher dados do veículo
    let vehicleYPos = yPosition + 20
    doc.setFontSize(9) // Fonte um pouco menor para caber no card
    
    if (formData.vehicle.name || formData.vehicle.model || formData.vehicle.plate || formData.vehicle.year) {
      if (formData.vehicle.name) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Veículo:", vehicleCardX + 10, vehicleYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        doc.text(formData.vehicle.name, vehicleCardX + 35, vehicleYPos)
        vehicleYPos += 7
      }
      
      if (formData.vehicle.model) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Modelo:", vehicleCardX + 10, vehicleYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        doc.text(formData.vehicle.model, vehicleCardX + 35, vehicleYPos)
        vehicleYPos += 7
      }
      
      if (formData.vehicle.plate) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Placa:", vehicleCardX + 10, vehicleYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        doc.text(formData.vehicle.plate, vehicleCardX + 35, vehicleYPos)
        vehicleYPos += 7
      }
      
      if (formData.vehicle.year) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Ano:", vehicleCardX + 10, vehicleYPos)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        doc.text(formData.vehicle.year, vehicleCardX + 35, vehicleYPos)
        vehicleYPos += 7
      }
    } else {
      doc.setTextColor(...mutedForeground)
      doc.text("Nenhum dado informado", vehicleCardX + 10, vehicleYPos)
    }
    
    // Usar a maior altura entre os dois cards para definir a posição Y seguinte
    yPosition = yPosition + cardHeight + 10

    // Itens do Orçamento - Estilo Card
    doc.setFillColor(...bgMuted)
    doc.setDrawColor(...border)
    doc.roundedRect(15, yPosition, 180, 10 + (budgetItems.length * 15) + 30, 3, 3, "FD")
    
    // Título do card
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...foreground)
    doc.text("Itens do Orçamento", 25, yPosition + 10)
    
    // Linha separadora
    doc.setDrawColor(...border)
    doc.setLineWidth(0.5)
    doc.line(clientCardX + 10, yPosition + 13, 185, yPosition + 13)
    
    let itemsYPos = yPosition + 20
    doc.setFontSize(10)
    
    if (budgetItems.length > 0) {
      // Itens em formato de lista
      budgetItems.forEach((item, index) => {
        if (itemsYPos > 260) {
          doc.addPage()
          itemsYPos = 20
        }
        
        // Descrição do item
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...foreground)
        const descLines = doc.splitTextToSize(item.description, 130)
        doc.text(descLines, 25, itemsYPos)
        
        // Valor total do item (direita)
        doc.setFont("helvetica", "semibold")
        doc.text(`R$ ${(item.quantity * item.price).toFixed(2)}`, 185, itemsYPos, { align: "right" })
        
        // Quantidade e valor unitário (abaixo da descrição)
        doc.setFontSize(8)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...mutedForeground)
        doc.text(`${item.quantity} × R$ ${item.price.toFixed(2)}`, 25, itemsYPos + 5)
        
        // Linha separadora entre itens (exceto o último)
        if (index < budgetItems.length - 1) {
          doc.setDrawColor(...border)
          doc.setLineWidth(0.2)
          doc.line(25, itemsYPos + 8, 185, itemsYPos + 8)
        }
        
        itemsYPos += 15
      })
      
      // Linha separadora para o total
      doc.setDrawColor(...primary)
      doc.setLineWidth(1)
      doc.line(25, itemsYPos, 185, itemsYPos)
      
      // Total
      const total = budgetItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
      
      itemsYPos += 10
      
      // Texto "TOTAL"
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...foreground)
      doc.text("TOTAL:", 25, itemsYPos)
      
      // Valor total
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...primary)
      doc.text(`R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 185, itemsYPos, { align: "right" })
      
      yPosition = itemsYPos + 15
    } else {
      doc.setTextColor(...mutedForeground)
      doc.text("Nenhum item adicionado", 25, itemsYPos)
      yPosition = itemsYPos + 15
    }

    // Rodapé em todas as páginas
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)

      // Linha superior do rodapé
      doc.setDrawColor(...border)
      doc.setLineWidth(0.5)
      doc.line(15, 280, 195, 280)

      // Informações da empresa
      doc.setFillColor(...primary)
      doc.setFontSize(8)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...foreground)
      doc.text("HFN - Martelinho de Ouro", 105, 285, { align: "center" })
      doc.setFont("helvetica", "normal")
      doc.setTextColor(...mutedForeground)
      doc.text("Telefone: (11) 98646-1743 | E-mail: honofelipe_neto@gmail.com", 105, 289, { align: "center" })
      doc.text(`Página ${i} de ${pageCount}`, 195, 289, { align: "right" })
    }

    // Se houver callback, chama-o com o documento
    if (callback && typeof callback === 'function') {
      callback(doc);
    } else {
      // Comportamento padrão: salvar o PDF
      const fileName = `HFN_Orcamento_${orcamentoNum}_${dateStr.replace(/\//g, "-")}.pdf`
      doc.save(fileName);
    }
  })
}
