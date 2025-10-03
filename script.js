// Estado da aplicação
let currentStep = 1
let budgetItems = []
let itemIdCounter = 0

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
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  updateStepDisplay()
  updateNavigationButtons()
})

// Navegação entre etapas
function nextStep() {
  if (currentStep < 4) {
    saveCurrentStepData()
    currentStep++
    updateStepDisplay()
    updateNavigationButtons()

    if (currentStep === 4) {
      renderPreview()
    }

    if (currentStep === 3) {
      updateTotalDisplay()
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    saveCurrentStepData()
    currentStep--
    updateStepDisplay()
    updateNavigationButtons()

    if (currentStep === 3) {
      updateTotalDisplay()
    }
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
function renderPreview() {
  const container = document.getElementById("preview-content")
  const total = budgetItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  let html = ""

  // Dados do Cliente
  if (formData.client.name || formData.client.address || formData.client.phone || formData.client.email) {
    html += '<div class="preview-section">'
    html += '<h3 class="preview-section-title">Dados do Cliente</h3>'
    if (formData.client.name)
      html += `<div class="preview-item"><span class="preview-item-label">Nome:</span><span class="preview-item-value">${formData.client.name}</span></div>`
    if (formData.client.address)
      html += `<div class="preview-item"><span class="preview-item-label">Endereço:</span><span class="preview-item-value">${formData.client.address}</span></div>`
    if (formData.client.phone)
      html += `<div class="preview-item"><span class="preview-item-label">Telefone:</span><span class="preview-item-value">${formData.client.phone}</span></div>`
    if (formData.client.email)
      html += `<div class="preview-item"><span class="preview-item-label">E-mail:</span><span class="preview-item-value">${formData.client.email}</span></div>`
    html += "</div>"
  }

  // Dados do Veículo
  if (formData.vehicle.name || formData.vehicle.model || formData.vehicle.plate || formData.vehicle.year) {
    html += '<div class="preview-section">'
    html += '<h3 class="preview-section-title">Dados do Veículo</h3>'
    if (formData.vehicle.name)
      html += `<div class="preview-item"><span class="preview-item-label">Veículo:</span><span class="preview-item-value">${formData.vehicle.name}</span></div>`
    if (formData.vehicle.model)
      html += `<div class="preview-item"><span class="preview-item-label">Modelo:</span><span class="preview-item-value">${formData.vehicle.model}</span></div>`
    if (formData.vehicle.plate)
      html += `<div class="preview-item"><span class="preview-item-label">Placa:</span><span class="preview-item-value">${formData.vehicle.plate}</span></div>`
    if (formData.vehicle.year)
      html += `<div class="preview-item"><span class="preview-item-label">Ano:</span><span class="preview-item-value">${formData.vehicle.year}</span></div>`
    html += "</div>"
  }

  // Itens do Orçamento
  if (budgetItems.length > 0) {
    html += '<div class="preview-section">'
    html += '<h3 class="preview-section-title">Itens do Orçamento</h3>'
    html += '<table class="preview-table">'
    html += "<thead><tr><th>Descrição</th><th>Qtd</th><th>Valor Unit.</th><th>Total</th></tr></thead>"
    html += "<tbody>"
    budgetItems.forEach((item) => {
      html += `<tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>R$ ${(item.quantity * item.price).toFixed(2)}</td>
            </tr>`
    })
    html += "</tbody></table>"
    html += '<div class="preview-total">'
    html += '<div class="preview-total-label">VALOR TOTAL</div>'
    html += `<div class="preview-total-value">R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>`
    html += "</div>"
    html += "</div>"
  }

  if (!html) {
    html = '<p class="empty-message">Nenhum dado foi preenchido</p>'
  }

  container.innerHTML = html
}

function generatePDF() {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()

  const primaryBlue = [59, 89, 152]
  const darkGray = [51, 51, 51]
  const lightGray = [128, 128, 128]
  const bgGray = [245, 245, 245]

  let yPosition = 20

  // Cabeçalho azul
  doc.setFillColor(...primaryBlue)
  doc.rect(0, 0, 210, 45, "F")

  // Logo HFN
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(15, 12, 20, 20, 3, 3, "F")
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...primaryBlue)
  doc.text("HFN", 25, 25, { align: "center" })

  // Nome da empresa
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.text("HFN FUNILARIA", 40, 22)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Orçamento Profissional de Serviços", 40, 30)

  // Número do orçamento e data
  const currentDate = new Date()
  const dateStr = currentDate.toLocaleDateString("pt-BR")
  const orcamentoNum = `ORÇ-${currentDate.getTime().toString().slice(-6)}`

  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.text(`Nº: ${orcamentoNum}`, 195, 22, { align: "right" })
  doc.text(`Data: ${dateStr}`, 195, 28, { align: "right" })
  doc.text(`Validade: 15 dias`, 195, 34, { align: "right" })

  yPosition = 55

  // Dados do Cliente
  if (formData.client.name || formData.client.address || formData.client.phone || formData.client.email) {
    doc.setFillColor(...bgGray)
    doc.rect(15, yPosition, 180, 7, "F")
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...darkGray)
    doc.text("DADOS DO CLIENTE", 20, yPosition + 5)

    yPosition += 12

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...darkGray)

    if (formData.client.name) {
      doc.setFont("helvetica", "bold")
      doc.text("Nome:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.client.name, 45, yPosition)
      yPosition += 6
    }
    if (formData.client.address) {
      doc.setFont("helvetica", "bold")
      doc.text("Endereço:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.client.address, 45, yPosition)
      yPosition += 6
    }
    if (formData.client.phone) {
      doc.setFont("helvetica", "bold")
      doc.text("Telefone:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.client.phone, 45, yPosition)
      yPosition += 6
    }
    if (formData.client.email) {
      doc.setFont("helvetica", "bold")
      doc.text("E-mail:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.client.email, 45, yPosition)
      yPosition += 6
    }

    yPosition += 8
  }

  // Dados do Veículo
  if (formData.vehicle.name || formData.vehicle.model || formData.vehicle.plate || formData.vehicle.year) {
    doc.setFillColor(...bgGray)
    doc.rect(15, yPosition, 180, 7, "F")
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...darkGray)
    doc.text("DADOS DO VEÍCULO", 20, yPosition + 5)

    yPosition += 12

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...darkGray)

    if (formData.vehicle.name) {
      doc.setFont("helvetica", "bold")
      doc.text("Veículo:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.vehicle.name, 45, yPosition)
      yPosition += 6
    }
    if (formData.vehicle.model) {
      doc.setFont("helvetica", "bold")
      doc.text("Modelo:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.vehicle.model, 45, yPosition)
      yPosition += 6
    }
    if (formData.vehicle.plate) {
      doc.setFont("helvetica", "bold")
      doc.text("Placa:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.vehicle.plate, 45, yPosition)
      yPosition += 6
    }
    if (formData.vehicle.year) {
      doc.setFont("helvetica", "bold")
      doc.text("Ano:", 20, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text(formData.vehicle.year, 45, yPosition)
      yPosition += 6
    }

    yPosition += 8
  }

  // Itens do Orçamento
  if (budgetItems.length > 0) {
    doc.setFillColor(...bgGray)
    doc.rect(15, yPosition, 180, 7, "F")
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...darkGray)
    doc.text("DISCRIMINAÇÃO DOS SERVIÇOS E PEÇAS", 20, yPosition + 5)

    yPosition += 12

    // Cabeçalho da tabela
    doc.setFillColor(...primaryBlue)
    doc.rect(15, yPosition - 2, 180, 8, "F")
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("DESCRIÇÃO", 20, yPosition + 3)
    doc.text("QTD", 140, yPosition + 3, { align: "center" })
    doc.text("VALOR UNIT.", 162, yPosition + 3, { align: "right" })
    doc.text("TOTAL", 190, yPosition + 3, { align: "right" })

    yPosition += 10

    // Linhas da tabela
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...darkGray)
    doc.setFontSize(9)

    budgetItems.forEach((item, index) => {
      if (yPosition > 260) {
        doc.addPage()
        yPosition = 20
      }

      // Linha alternada
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250)
        doc.rect(15, yPosition - 3, 180, 8, "F")
      }

      // Descrição
      const descLines = doc.splitTextToSize(item.description, 115)
      doc.text(descLines, 20, yPosition + 2)

      doc.text(item.quantity.toString(), 140, yPosition + 2, { align: "center" })
      doc.text(`R$ ${item.price.toFixed(2)}`, 162, yPosition + 2, { align: "right" })
      doc.text(`R$ ${(item.quantity * item.price).toFixed(2)}`, 190, yPosition + 2, { align: "right" })

      yPosition += 8
    })

    // Linha de separação
    doc.setDrawColor(...primaryBlue)
    doc.setLineWidth(0.5)
    doc.line(15, yPosition, 195, yPosition)

    yPosition += 8

    // Total
    const total = budgetItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

    doc.setFillColor(...primaryBlue)
    doc.rect(130, yPosition - 3, 65, 12, "F")
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 255, 255)
    doc.text("VALOR TOTAL:", 135, yPosition + 4)
    doc.setFontSize(14)
    doc.text(`R$ ${total.toFixed(2)}`, 190, yPosition + 4, { align: "right" })

    yPosition += 20

    // Observações
    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    doc.setTextColor(...lightGray)
    doc.text("Observações:", 15, yPosition)
    yPosition += 4
    doc.setFont("helvetica", "normal")
    doc.text("• Orçamento válido por 15 dias a partir da data de emissão.", 15, yPosition)
    yPosition += 4
    doc.text("• Valores sujeitos a alteração sem aviso prévio.", 15, yPosition)
    yPosition += 4
    doc.text("• Garantia de 90 dias para serviços executados.", 15, yPosition)
  }

  // Rodapé em todas as páginas
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Linha superior do rodapé
    doc.setDrawColor(...lightGray)
    doc.setLineWidth(0.3)
    doc.line(15, 280, 195, 280)

    // Informações da empresa
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...lightGray)
    doc.text("HFN Funilaria - Serviços Automotivos Especializados", 105, 285, { align: "center" })
    doc.text("Telefone: (00) 0000-0000 | E-mail: contato@hfnfunilaria.com.br", 105, 289, { align: "center" })
    doc.text(`Página ${i} de ${pageCount}`, 195, 289, { align: "right" })
  }

  // Salvar PDF
  const fileName = `HFN_Orcamento_${orcamentoNum}_${dateStr.replace(/\//g, "-")}.pdf`
  doc.save(fileName)
}
