// Funções para gerenciar o recibo de pagamento

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar a data com a data atual
  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0] // Formato YYYY-MM-DD para input date
  document.getElementById("receipt-date").value = formattedDate
  
  // Adicionar event listeners para os campos do recibo
  document.getElementById("receipt-value").addEventListener("input", updateReceiptPreview)
  document.getElementById("receipt-payment-method").addEventListener("change", updateReceiptPreview)
  document.getElementById("receipt-payment-details").addEventListener("input", updateReceiptPreview)
  document.getElementById("receipt-date").addEventListener("change", updateReceiptPreview)
  document.getElementById("receipt-notes").addEventListener("input", updateReceiptPreview)
})

// Função para gerar PDF do recibo
function generateReceiptPDF() {
  // Carregar o logo antes de gerar o PDF
  getImageBase64('https://raw.githubusercontent.com/Guubal/hfn/main/logo.png', function(base64Logo, imgWidth, imgHeight) {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    // Cores modernas
    const primary = [255, 180, 0] // --primary: #ffb400
    const foreground = [61, 61, 64] // --foreground: #3d3d40
    const mutedForeground = [125, 125, 138] // --muted-foreground: #7d7d8a
    const border = [235, 235, 237] // --border: #ebebed
    const white = [255, 255, 255]

    // Cabeçalho com cor primária
    doc.setFillColor(...primary)
    doc.rect(0, 0, 210, 40, "F")

    // Logo HFN centralizado
    const logoMaxWidth = 60
    const logoMaxHeight = 25
    const aspectRatio = imgWidth / imgHeight
    let logoWidth, logoHeight
    
    if (imgWidth > imgHeight) {
      logoWidth = Math.min(logoMaxWidth, imgWidth)
      logoHeight = logoWidth / aspectRatio
      
      if (logoHeight > logoMaxHeight) {
        logoHeight = logoMaxHeight
        logoWidth = logoHeight * aspectRatio
      }
    } else {
      logoHeight = Math.min(logoMaxHeight, imgHeight)
      logoWidth = logoHeight * aspectRatio
      
      if (logoWidth > logoMaxWidth) {
        logoWidth = logoMaxWidth
        logoHeight = logoWidth / aspectRatio
      }
    }
    
    const logoX = (210 - logoWidth) / 2
    const logoY = 10
    
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

    // Título do recibo
    doc.setFillColor(...white)
    doc.roundedRect(55, 45, 100, 12, 3, 3, "F")
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...primary)
    doc.text("RECIBO DE PAGAMENTO", 105, 53, { align: "center" })

    // Número do recibo e data
    const currentDate = new Date()
    const receiptDate = document.getElementById("receipt-date").value 
      ? new Date(document.getElementById("receipt-date").value) 
      : currentDate
    const dateStr = receiptDate.toLocaleDateString("pt-BR")
    const receiptNum = `REC-${currentDate.getTime().toString().slice(-6)}`

    // Dados do recibo
    let yPosition = 70
    
    // Valor recebido
    const receiptValue = document.getElementById("receipt-value").value
    const formattedValue = Number(receiptValue).toLocaleString("pt-BR", { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })
    
    doc.setFillColor(245, 245, 246) // var(--secondary)
    doc.roundedRect(20, yPosition, 170, 15, 3, 3, "F")
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...foreground)
    doc.text("Valor Recebido:", 30, yPosition + 10)
    doc.setFontSize(14)
    doc.setTextColor(...primary)
    doc.text(`R$ ${formattedValue}`, 180, yPosition + 10, { align: "right" })
    
    yPosition += 25
    
    // Informações do recibo
    doc.setFillColor(247, 247, 248) // var(--muted)
    doc.roundedRect(20, yPosition, 170, 80, 3, 3, "F")
    
    // Título da seção
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...foreground)
    doc.text("Informações do Recibo", 30, yPosition + 10)
    
    // Linha separadora
    doc.setDrawColor(235, 235, 237) // var(--border)
    doc.setLineWidth(0.5)
    doc.line(30, yPosition + 13, 180, yPosition + 13)
    
    // Informações em formato de tabela
    yPosition += 20
    doc.setFontSize(10)
    
    // Data
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...mutedForeground)
    doc.text("Data:", 30, yPosition)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...foreground)
    doc.text(dateStr, 60, yPosition)
    
    // Número do recibo
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...mutedForeground)
    doc.text("Recibo Nº:", 120, yPosition)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...foreground)
    doc.text(receiptNum, 150, yPosition)
    
    yPosition += 10
    
    // Cliente
    if (formData.client.name) {
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...mutedForeground)
      doc.text("Cliente:", 30, yPosition)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(...foreground)
      doc.text(formData.client.name, 60, yPosition)
      yPosition += 10
    }
    
    // Veículo
    if (formData.vehicle.name) {
      let vehicleInfo = formData.vehicle.name
      if (formData.vehicle.plate) {
        vehicleInfo += ` - ${formData.vehicle.plate}`
      }
      
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...mutedForeground)
      doc.text("Veículo:", 30, yPosition)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(...foreground)
      doc.text(vehicleInfo, 60, yPosition)
      yPosition += 10
    }
    
    // Forma de pagamento
    const paymentMethod = document.getElementById("receipt-payment-method")
    if (paymentMethod.value) {
      const paymentMethodText = paymentMethod.options[paymentMethod.selectedIndex].text
      
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...mutedForeground)
      doc.text("Forma de Pagamento:", 30, yPosition)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(...foreground)
      doc.text(paymentMethodText, 80, yPosition)
      yPosition += 10
      
      // Detalhes do pagamento
      const paymentDetails = document.getElementById("receipt-payment-details").value
      if (paymentDetails) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...mutedForeground)
        doc.text("Detalhes:", 30, yPosition)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...foreground)
        
        // Quebrar texto longo em múltiplas linhas
        const detailLines = doc.splitTextToSize(paymentDetails, 140)
        doc.text(detailLines, 60, yPosition)
        yPosition += detailLines.length * 6
      }
    }
    
    // Observações
    const receiptNotes = document.getElementById("receipt-notes").value
    if (receiptNotes) {
      yPosition += 5
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...mutedForeground)
      doc.text("Observações:", 30, yPosition)
      
      yPosition += 6
      doc.setFont("helvetica", "normal")
      doc.setTextColor(...foreground)
      
      // Quebrar texto longo em múltiplas linhas
      const noteLines = doc.splitTextToSize(receiptNotes, 150)
      doc.text(noteLines, 30, yPosition)
    }
    
    // Texto do recibo
    yPosition = 180
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...foreground)
    doc.text("Recebemos o valor acima descrito referente aos serviços prestados.", 105, yPosition, { align: "center" })
    
    // Assinatura
    yPosition = 220
    doc.setDrawColor(...foreground)
    doc.setLineWidth(0.5)
    doc.line(65, yPosition, 145, yPosition)
    
    yPosition += 5
    doc.setFontSize(8)
    doc.setTextColor(...mutedForeground)
    doc.text("HFN Funilaria - CNPJ XX.XXX.XXX/0001-XX", 105, yPosition, { align: "center" })
    
    // Rodapé
    doc.setDrawColor(...border)
    doc.setLineWidth(0.5)
    doc.line(15, 280, 195, 280)
    
    doc.setFillColor(...primary)
    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...foreground)
    doc.text("HFN - Martelinho de Ouro", 105, 285, { align: "center" })
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...mutedForeground)
    doc.text("Telefone: (11) 98646-1743 | E-mail: honofelipe_neto@gmail.com", 105, 289, { align: "center" })
    
    // Salvar o PDF
    const fileName = `HFN_Recibo_${receiptNum}_${dateStr.replace(/\//g, "-")}.pdf`
    doc.save(fileName)
  })
}

// Função para visualizar o PDF do recibo
function previewReceiptPDF() {
  generateReceiptPDF(function(doc) {
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    
    // Criar modal para visualizar o PDF
    const modal = document.createElement('div')
    modal.className = 'pdf-modal'
    modal.innerHTML = `
      <div class="pdf-modal-content">
        <div class="pdf-modal-header">
          <h3>Visualização do Recibo</h3>
          <button class="pdf-modal-close">&times;</button>
        </div>
        <div class="pdf-modal-body">
          <iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    document.body.style.overflow = 'hidden' // Impedir rolagem da página
    
    // Adicionar evento para fechar o modal
    const closeBtn = modal.querySelector('.pdf-modal-close')
    closeBtn.addEventListener('click', function() {
      document.body.removeChild(modal)
      document.body.style.overflow = '' // Restaurar rolagem
      URL.revokeObjectURL(url) // Liberar recursos
    })
  })
}

// Função para compartilhar o PDF do recibo
function shareReceiptPDF() {
  generateReceiptPDF(function(doc) {
    const blob = doc.output('blob')
    const receiptNum = `REC-${new Date().getTime().toString().slice(-6)}`
    const file = new File([blob], `Recibo_HFN_${receiptNum}.pdf`, { type: "application/pdf" })
    
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: "Recibo HFN",
        text: "Segue o recibo em PDF da HFN Funilaria!",
        files: [file]
      }).catch((err) => {
        alert("Erro ao compartilhar: " + err.message)
      })
    } else {
      // Caso não dê pra compartilhar, salva e avisa usuário
      doc.save(`Recibo_HFN_${receiptNum}.pdf`)
      alert("Seu navegador não permite compartilhar arquivos PDF diretamente. O arquivo foi baixado, envie manualmente pelo WhatsApp ou outro app.")
    }
  })
}
