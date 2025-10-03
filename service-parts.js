// Lista de peças de funilaria
const pecasFunilaria = [
  'Para-choque dianteiro',
  'Para-choque traseiro',
  'Capô',
  'Teto',
  'Porta dianteira direita',
  'Porta dianteira esquerda',
  'Porta traseira direita',
  'Porta traseira esquerda',
  'Paralama dianteiro direito',
  'Paralama dianteiro esquerdo',
  'Lateral traseira direita',
  'Lateral traseira esquerda',
  'Tampa traseira',
  'Coluna central',
  'Coluna dianteira direita',
  'Coluna dianteira esquerda',
  'Coluna traseira direita',
  'Coluna traseira esquerda',
  'Teto solar',
  'Spoiler dianteiro',
  'Spoiler traseiro',
  'Saia lateral',
  'Caixa de roda dianteira',
  'Caixa de roda traseira',
  'Caixa de ar',
  'Grade dianteira',
  'Friso lateral direito',
  'Friso lateral esquerdo',
  'Maçaneta direita',
  'Maçaneta esquerda',
  'Espelho retrovisor direito',
  'Espelho retrovisor esquerdo',
  'Roda dianteira direita',
  'Roda dianteira esquerda',
  'Roda traseira direita',
  'Roda traseira esquerda',
  'Calota dianteira direita',
  'Calota dianteira esquerda',
  'Calota traseira direita',
  'Calota traseira esquerda',
  'Lanterna traseira direita',
  'Lanterna traseira esquerda',
  'Farol dianteiro direito',
  'Farol dianteiro esquerdo',
  'Vidro para-brisa',
  'Vidro traseiro',
  'Vidro porta dianteira direita',
  'Vidro porta dianteira esquerda',
  'Vidro porta traseira direita',
  'Vidro porta traseira esquerda',
  'Vidro lateral',
  'Vidro vigia',
  'Parabrisas',
  'Painel externo',
  'Painel interno',
  'Soleira',
  'Assoalho',
  'Longarina',
  'Monobloco',
  'Colméia do radiador',
  'Suporte do para-choque',
  'Amortecedor de impacto do para-choque',
  'Para-lama traseiro direito',
  'Para-lama traseiro esquerdo'
];

// Tipos de serviços de funilaria
const tiposServicos = [
  'Pintura de',
  'Reparação de amassado em',
  'Substituição de',
  'Polimento de',
  'Desamassar sem pintura (martelinho/PDR)',
  'Restauração de',
  'Alinhamento de',
  'Ajuste de vão de',
  'Reparação de riscos em',
  'Tratamento anticorrosivo em',
  'Impermeabilização de',
  'Aplicação de película em',
  'Aplicação de insulfilm em',
  'Envelopamento de',
  'Cristalização de',
  'Vitrificação de',
  'Aplicação de cerâmica em',
  'Soldagem de',
  'Remoção de adesivo de',
  'Aplicação de adesivo em',
  'Limpeza técnica de',
  'Higienização de'
];

// Função para gerar descrições completas de serviços
function gerarDescricoesServicos() {
  const descricoes = [];
  
  // Adicionar combinações de tipo de serviço + peça
  tiposServicos.forEach(tipo => {
    // Se o tipo já inclui uma preposição completa no final, não adicionar peça
    if (tipo.endsWith('(martelinho/PDR)')) {
      pecasFunilaria.forEach(peca => {
        if (['Porta', 'Paralama', 'Capô', 'Teto'].some(p => peca.includes(p))) {
          descricoes.push(`${tipo} ${peca}`);
        }
      });
    } else {
      pecasFunilaria.forEach(peca => {
        descricoes.push(`${tipo} ${peca}`);
      });
    }
  });
  
  // Adicionar serviços específicos que não seguem o padrão
  const servicosEspecificos = [
    // Pintura
    "Pintura completa do veículo",
    "Pintura parcial do veículo",
    "Pintura de peças plásticas",
    
    // Polimentos, Vitrificação etc
    "Polimento completo",
    "Polimento técnico",
    "Polimento cristalizado",
    "Polimento e cristalização",
    "Espelhamento de pintura",
    
    // Restauração
    "Restauração de partes internas",
    "Restauração de couro",

    // Reparos, ajustes, outros
    "Martelinho de ouro",
    "Levantamento de estrutura",
    "Reparação de danos por granizo",
    "Limpeza e higienização interna",
    "Higienização interna completa",
    "Limpeza de estofados",
    "Desmontagem e montagem de peças para pintura/funilaria",
    "Inspeção estrutural",
    "Reparo de solda em carroceria",
    "Reparação de ferrugem",
    "Reparação de trinca",
    "Reparação de furo",
    "Reparação de rasgo",
    "Remoção de cola/adesivo da lataria",
    "Eliminação de odores/desinfecção",
    "Aplicação de massa poliéster",
    "Aplicação de massa rápida",
    "Aplicação de primer",
    "Aplicação de verniz",  
    "Lixamento e preparação para pintura",
    "Acabamento fino",
    "Lixamento polidor",
    "Correção de casca de laranja",
    "Remoção de respingo de tinta",
    "Reparo de encaixe de para-choque",
    "Soldagem de plásticos",

    // Adesivagem, Envelopamento, Proteção
    "Personalização com adesivo",
    "Envelopamento parcial",
    "Envelopamento completo",
    "Proteção de pintura com película",

    // Lavagem e detalhamento
    "Lavagem técnica",
    "Lavagem completa",
    "Higienização de ar-condicionado",
    "Descontaminação de pintura",
    "Descontaminação de vidro",
    "Lavagem de motor",
    "Limpeza de baú/carrocerias",

    // Estrutura
    "Geometria de chassi",
    "Alinhamento de chassi",
    "Solda de longarina",
    "Solda de monobloco",
    "Funilaria completa"
  ];
  
  // Adicionar os serviços específicos à lista de descrições
  descricoes.push(...servicosEspecificos);
  
  return descricoes;
}

// Gerar a lista completa de descrições de serviços
const servicosFunilariaCompleto = gerarDescricoesServicos();

// Função para adicionar efeito de destaque (caso não esteja disponível no escopo global)
function localHighlightEffect(element) {
  element.classList.add('highlight-selection');
  setTimeout(() => {
    element.classList.remove('highlight-selection');
  }, 800);
}

// Inicializar o autocomplete para descrição de serviços
document.addEventListener('DOMContentLoaded', function() {
  const descriptionInput = document.getElementById('item-description');
  
  if (descriptionInput && typeof Awesomplete !== 'undefined') {
    // Inicializar o Awesomplete para serviços
    const descriptionAwesomplete = new Awesomplete(descriptionInput, {
      list: servicosFunilariaCompleto,
      minChars: 1,  // Mostrar sugestões após digitar pelo menos 1 caractere
      maxItems: 15, // Mostrar mais itens para facilitar a seleção
      autoFirst: true,
      filter: function(text, input) {
        // Filtro personalizado que ignora acentos e maiúsculas/minúsculas
        return Awesomplete.FILTER_CONTAINS(
          text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
          input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        );
      }
    });
    
    // Adicionar classe para indicar que o campo tem autocomplete
    descriptionInput.classList.add('has-awesomplete');
    
    // Evento para quando o usuário clica no campo de descrição
    descriptionInput.addEventListener('focus', function() {
      // Verificar se o foco foi mantido por pelo menos 100ms antes de mostrar sugestões
      setTimeout(() => {
        // Verificar se o autocomplete está permitido e se o campo ainda tem foco
        if ((window.allowAutocomplete === undefined || window.allowAutocomplete) && 
            document.activeElement === this && this.value === '') {
          // Mostrar todas as sugestões quando o campo estiver vazio e ainda tiver foco
          this.awesomplete.evaluate();
        }
      }, 200);
    });
    
    // Evento para quando um serviço é selecionado
    descriptionInput.addEventListener('awesomplete-selectcomplete', function() {
      // Adicionar efeito de destaque
      if (typeof addHighlightEffect === 'function') {
        addHighlightEffect(this);
      } else {
        localHighlightEffect(this);
      }
    });
    
    // Evento para sugerir serviços com base na peça digitada
    descriptionInput.addEventListener('input', function() {
      const inputValue = this.value.toLowerCase();
      
      // Se o usuário digitou o nome de uma peça, sugerir serviços para essa peça
      const pecaDigitada = pecasFunilaria.find(peca => 
        inputValue.includes(peca.toLowerCase())
      );
      
      if (pecaDigitada) {
        // Filtrar serviços relacionados a essa peça
        const servicosRelacionados = servicosFunilariaCompleto.filter(servico => 
          servico.toLowerCase().includes(pecaDigitada.toLowerCase())
        );
        
        // Atualizar a lista de sugestões
        if (servicosRelacionados.length > 0) {
          this.awesomplete.list = servicosRelacionados;
        }
      } else {
        // Restaurar a lista completa
        this.awesomplete.list = servicosFunilariaCompleto;
      }
    });
  }
});
