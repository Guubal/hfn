// Função para inicializar o autocomplete de endereços
function initAddressAutocomplete() {
  console.log('Iniciando configuração do autocomplete de endereços');
  
  const addressInput = document.getElementById('client-address');
  
  // Verificar se o elemento e a biblioteca Awesomplete estão disponíveis
  if (!addressInput) {
    console.error('Elemento de endereço não encontrado');
    return;
  }
  
  if (typeof Awesomplete === 'undefined') {
    console.error('Biblioteca Awesomplete não encontrada');
    return;
  }
  
  // Verificar se a lista de ruas está disponível
  if (typeof street === 'undefined') {
    console.error('Lista de ruas não encontrada');
    return;
  }
  
  if (!Array.isArray(street)) {
    console.error('Lista de ruas não é um array');
    return;
  }
  
  if (street.length === 0) {
    console.error('Lista de ruas está vazia');
    return;
  }
  
  console.log('Inicializando autocomplete para endereços com', street.length, 'ruas');
  console.log('Primeiras 3 ruas:', street.slice(0, 3));
  
  // Inicializar o Awesomplete para endereços
  try {
    const addressAwesomplete = new Awesomplete(addressInput, {
      list: street,
      minChars: 1,  // Mostrar sugestões após digitar pelo menos 1 caractere
      maxItems: 10, // Mostrar mais itens para facilitar a seleção
      autoFirst: true,
      filter: function(text, input) {
        // Filtro personalizado que ignora acentos e maiúsculas/minúsculas
        return Awesomplete.FILTER_CONTAINS(
          text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
          input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        );
      }
    });
    
    console.log('Awesomplete inicializado com sucesso');
    
    // Adicionar classe para indicar que o campo tem autocomplete
    addressInput.classList.add('has-awesomplete');
    
    // Evento para quando o usuário clica no campo de endereço
    addressInput.addEventListener('focus', function() {
      console.log('Campo de endereço recebeu foco');
      // Verificar se o foco foi mantido por pelo menos 100ms antes de mostrar sugestões
      setTimeout(() => {
        // Verificar se o autocomplete está permitido e se o campo ainda tem foco
        if ((window.allowAutocomplete === undefined || window.allowAutocomplete) && 
            document.activeElement === this && this.value === '') {
          // Mostrar todas as sugestões quando o campo estiver vazio e ainda tiver foco
          console.log('Mostrando sugestões de endereços');
          this.awesomplete.evaluate();
        }
      }, 200);
    });
    
    // Evento para quando um endereço é selecionado
    addressInput.addEventListener('awesomplete-selectcomplete', function() {
      console.log('Endereço selecionado:', this.value);
      // Adicionar efeito de destaque
      if (typeof addHighlightEffect === 'function') {
        addHighlightEffect(this);
      } else {
        // Implementação local do efeito de destaque caso a função global não esteja disponível
        this.classList.add('highlight-selection');
        setTimeout(() => {
          this.classList.remove('highlight-selection');
        }, 800);
      }
    });
    
    // Evento para sugerir endereços com base no texto digitado
    addressInput.addEventListener('input', function() {
      const inputValue = this.value.toLowerCase();
      console.log('Digitando no campo de endereço:', inputValue);
      
      // Filtrar endereços que correspondem ao texto digitado
      const enderecosFiltrados = street.filter(endereco => 
        endereco.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
          inputValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
      );
      
      console.log('Endereços filtrados:', enderecosFiltrados.length);
      
      // Atualizar a lista de sugestões
      if (enderecosFiltrados.length > 0) {
        this.awesomplete.list = enderecosFiltrados;
      } else {
        // Restaurar a lista completa
        this.awesomplete.list = street;
      }
    });
    
    // Definir explicitamente a lista no objeto Awesomplete
    addressAwesomplete.list = street;
    
    console.log('Configuração do autocomplete de endereços concluída');
  } catch (error) {
    console.error('Erro ao inicializar Awesomplete:', error);
  }
}

// Inicializar o autocomplete para o campo de endereço quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded: Aguardando para inicializar autocomplete de endereços');
  
  // Garantir que o script só execute após o carregamento completo da página
  setTimeout(initAddressAutocomplete, 1000);
});

// Backup: tentar inicializar novamente se a página já estiver carregada
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Documento já carregado, inicializando autocomplete de endereços');
  setTimeout(initAddressAutocomplete, 1000);
}
