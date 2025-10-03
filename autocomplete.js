// Mapeamento de veículos e seus modelos comuns
const veiculosModelos = {
  "Fiat Uno": ["Mille", "Way", "Attractive", "Vivace", "Evolution", "Sporting"],
  "Volkswagen Gol": ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "1000", "City", "CL", "GL", "GTI", "Plus", "Trend", "Comfortline", "Highline"],
  "Chevrolet Onix": ["Joy", "LT", "LTZ", "Premier", "Plus", "RS"],
  "Ford Ka": ["GL", "GLX", "Class", "Action", "SE", "SE Plus", "SEL", "Titanium", "FreeStyle"],
  "Toyota Corolla": ["SE-G", "Gli", "GLi", "XEi", "Altis", "XRS", "Hybrid"],
  "Honda Civic": ["CX", "LX", "LXL", "EX", "EXS", "EXL", "Sport", "Touring", "Si", "Type R"],
  "Renault Kwid": ["Life", "Zen", "Intense", "Outsider"],
  "Hyundai HB20": ["Comfort", "Comfort Plus", "Premium", "Sense", "Vision", "Evolution", "Diamond", "Diamond Plus", "Sport"],
  "Fiat Palio": ["ELX", "Young", "Fire", "Week", "Weekend", "Adventure", "Attractive", "Essence", "Sporting", "EDX", "Sole"],
  "Volkswagen Polo": ["1.0", "1.6", "GT", "BlueMotion", "MSI", "Comfortline", "Highline", "GTS"],
  "Peugeot 208": ["Allure", "Griffe", "Active", "GT", "Like", "Urban Tech"],
  "Jeep Renegade": ["Sport", "Longitude", "Limited", "Moab", "Trailhawk"],
  "Nissan Versa": ["S", "SV", "SL", "Exclusive", "Special Edition"],
  "Hyundai Creta": ["Action", "Attitude", "Smart", "Smart Plus", "Pulse", "Pulse Plus", "Limited"],
  "Chevrolet Corsa": ["Wind", "Sedan", "Hatch", "Classic", "GL", "GLS", "Premium", "Maxx", "Super", "Millennium"],
  "Chevrolet Spin": ["LS", "LT", "LTZ", "Premier", "Activ"],
  "Ford Fiesta": ["GL", "GLX", "Class", "Supercharger", "SE", "Sel", "Titanium"],
  "Volkswagen Fox": ["City", "Trend", "Pepper", "Highline", "Comfortline", "Xtreme", "Rock in Rio", "Prime"],
  "Chevrolet Prisma": ["Joy", "LT", "LTZ", "Advantage", "Midnight"],
  "Toyota Hilux": ["Std", "SR", "SRV", "SRX", "Chassi", "Cabine Simples", "Cabine Dupla", "Challenge"],
  "Volkswagen Voyage": ["CL", "GL", "GLS", "Trend", "Evidence", "Comfortline", "Highline", "G5", "G6"],
  "Fiat Mobi": ["Easy", "Like", "Way", "Drive", "Trekking"],
  "Renault Sandero": ["Authentique", "Expression", "Vibe", "Dynamique", "Stepway", "GT Line", "RS"],
  "Volkswagen T-Cross": ["Sense", "200 TSI", "Comfortline", "Highline", "Exclusive"],
  "Fiat Argo": ["Drive", "Precision", "HGT", "Trekking", "S-Design"],
  "Toyota Yaris": ["XL", "XS", "XLS", "Hatch", "Sedan"],
  "Chevrolet Tracker": ["LT", "LTZ", "Premier", "Midnight"],
  "Honda HR-V": ["LX", "EX", "EXL", "Touring"],
  "Jeep Compass": ["Sport", "Longitude", "Limited", "S", "Trailhawk"],
  "Volkswagen Virtus": ["MPI", "TSI", "Comfortline", "Highline", "GTS"],
  "Fiat Cronos": ["Drive", "Precision", "HGT", "S-Design"],
  "Renault Duster": ["Expression", "Dynamique", "Intense", "Iconic", "Outsider", "Techroad", "Zen"],
  "Ford EcoSport": ["S", "SE", "FreeStyle", "Titanium", "STORM"],
  "Nissan Kicks": ["S", "SV", "SL", "Exclusive", "Active"],
  "Chevrolet Cruze": ["LT", "LTZ", "Premier", "Sport6"],
  "Toyota Etios": ["X", "XS", "XL", "Cross", "Platinum", "Valco"],
  "Mitsubishi L200": ["Triton", "Savannah", "HPE", "GL", "Outdoor", "Sport", "GLS"],
  "Ford Ranger": ["XL", "XLT", "Limited", "FX4", "Storm"],
  "Chevrolet S10": ["LS", "Advantage", "LT", "LTZ", "High Country"],
  "Volkswagen Amarok": ["SE", "Trendline", "Highline", "Comfortline", "Extreme", "V6 Highline"],
  "Fiat Toro": ["Endurance", "Freedom", "Volcano", "Ranch", "Ultra"],
  "Honda Fit": ["DX", "LX", "EX", "EXL", "Twist"],
  "Renault Logan": ["Authentique", "Expression", "Dynamique", "Life", "Zen", "Intense"],
  "Hyundai i30": ["GL", "GLS", "CW", "Top"],
  "Citroën C3": ["Origine", "Tendance", "Exclusive", "Urban Trail", "Attraction", "Style"],
  "Mitsubishi Pajero": ["TR4", "Dakar", "Full", "Sport", "HPE"],
  "Kia Sportage": ["LX", "EX", "EX2", "EX2 Flex", "EX Prestige", "SX"],
  "Volkswagen Jetta": ["Comfortline", "Highline", "GLI", "TSI", "Trendline", "R-Line"],
  "Ford Fusion": ["S", "SE", "Titanium", "EcoBoost", "Hybrid"],
  "Chevrolet Astra": ["GL", "GLS", "Advantage", "Sedan", "Hatch", "Sport"],
  "Chevrolet Classic": ["LS", "Advantage", "Spirit", "VHC", "Life"],
  "Volkswagen Santana": ["GL", "GLS", "CD", "Quantum", "Exclusive", "Sportline"],
  "Peugeot 207": ["One", "XR", "XS", "Passion", "Quiksilver", "Escapade"],
  "Citroën C4 Cactus": ["Live", "Feel", "Shine", "X-Series", "Rip Curl"],
  "Peugeot 2008": ["Allure", "Griffe", "Style", "Crossway", "Feline"],
  "Volkswagen UP!": ["Move", "Take", "High", "Cross", "I-Motion", "Pepper", "Turbo", "Xtreme"],
  "Ford Focus": ["GL", "GLX", "SE", "Titanium", "Sedan", "Hatch", "Ghia"],
  "Fiat Siena": ["EL", "HL", "Fire", "Attractive", "Grand Siena"],
  "Fiat Strada": ["Working", "Trekking", "Hard Working", "Freedom", "Volcano", "Advantage"],
  "Chevrolet Montana": ["LS", "Sport", "Sportive", "Conquest"],
  "Renault Oroch": ["Express", "Intense", "Outsider", "Dynamique", "Iconic"],
  "Fiat Doblo": ["ELX", "Adventure", "Cargo", "HLX", "Attractive"],
  "Fiat Fiorino": ["Furgão", "Endurance", "Hard Working", "ELX"],
  "Hyundai Tucson": ["GLS", "Top", "Limited", "GL", "Automático"],
  "Volkswagen Passat": ["LSE", "GL", "GLS", "Pointer", "TSi", "Variant", "Comfortline", "Highline"],
  "Hyundai Santa Fe": ["GLS", "Premium", "Top"],
  "Volkswagen Touareg": ["V6", "V8", "Tiptronic", "Hybrid"],
  "BMW Série 3": ["318i", "320i", "325i", "328i", "330i", "320d", "340i", "M3", "Gran Turismo"],
  "Mercedes-Benz Classe C": ["C180", "C200", "C220", "C250", "C300", "C43 AMG", "C63 AMG"],
  "Ford Fiesta Rocam": ["Hatch", "Sedan", "GL", "GLX"],
  "Renault Megane": ["Authentique", "Expression", "Grand Tour", "Dynamique"],
  "Peugeot 307": ["Feline", "Presence", "Rallye", "Allure", "Passion"],
  "Volkswagen Golf": ["GL", "GLX", "GTI", "TSI", "Comfortline", "Highline", "Sportline"],
  "Peugeot 308": ["Active", "Allure", "Griffe", "Feline"],
  "Fiat Punto": ["Attractive", "Sporting", "Essence", "Blackmotion", "T-Jet", "Absolute"],
  "Volkswagen Saveiro": ["Surf", "Robust", "Cross", "Trend", "Highline", "Pepper"],
  "Nissan March": ["S", "SV", "SL", "Active", "Unique"],
  "Volkswagen Nivus": ["Comfortline", "Highline"],
  "Toyota SW4": ["SR", "SRX", "Diamond", "SRV", "Challenge"],
  "Honda City": ["LX", "EX", "EXL", "Touring"],
  "Citroën Aircross": ["Start", "Feel", "Live", "Shine"],
  "Chevrolet Meriva": ["Joy", "Maxx", "Premium", "Easytronic"],
  "Fiat Idea": ["Adventure", "Attractive", "Essence", "Sole"],
  "Chevrolet Zafira": ["Elegance", "Comfort", "Elite"]
};

// Lista para autocomplete (usando as chaves do objeto veiculosModelos)
const veiculosAdicionais = Object.keys(veiculosModelos);

// Combinar veículos para o autocomplete (neste caso, são os mesmos)
const veiculos = veiculosAdicionais;

// Lista de serviços de funilaria e pintura para autocomplete
const servicosFunilaria = [
  // Pintura de peças
  "Pintura para-choque dianteiro",
  "Pintura para-choque traseiro",
  "Pintura capô",
  "Pintura teto",
  "Pintura porta dianteira lado direito",
  "Pintura porta dianteira lado esquerdo",
  "Pintura porta traseira lado direito",
  "Pintura porta traseira lado esquerdo",
  "Pintura paralama dianteiro direito",
  "Pintura paralama dianteiro esquerdo",
  "Pintura lateral traseira direita",
  "Pintura lateral traseira esquerda",
  "Pintura tampa traseira",
  "Pintura coluna direita",
  "Pintura coluna esquerda",
  "Pintura teto solar",
  "Pintura spoiler dianteiro",
  "Pintura spoiler traseiro",
  "Pintura caixa de ar",
  "Pintura grade dianteira",
  "Pintura espelho retrovisor direito",
  "Pintura espelho retrovisor esquerdo",
  "Pintura completa do veículo",
  "Pintura parcial do veículo",
  "Pintura de rodas (jogo)",
  "Pintura de calotas (jogo)",
  "Pintura de frisos laterais",
  "Pintura de maçanetas",
  
  // Reparações de funilaria
  "Reparação de amassado para-choque dianteiro",
  "Reparação de amassado para-choque traseiro",
  "Reparação de amassado capô",
  "Reparação de amassado teto",
  "Reparação de amassado porta dianteira direita",
  "Reparação de amassado porta dianteira esquerda",
  "Reparação de amassado porta traseira direita",
  "Reparação de amassado porta traseira esquerda",
  "Reparação de amassado paralama dianteiro direito",
  "Reparação de amassado paralama dianteiro esquerdo",
  "Reparação de amassado lateral traseira direita",
  "Reparação de amassado lateral traseira esquerda",
  "Reparação de amassado tampa traseira",
  "Desamassar sem pintura (PDR) porta",
  "Desamassar sem pintura (PDR) paralama",
  "Desamassar sem pintura (PDR) capô",
  "Desamassar sem pintura (PDR) teto",
  
  // Substituição de peças
  "Substituição para-choque dianteiro",
  "Substituição para-choque traseiro",
  "Substituição capô",
  "Substituição porta dianteira direita",
  "Substituição porta dianteira esquerda",
  "Substituição porta traseira direita",
  "Substituição porta traseira esquerda",
  "Substituição paralama dianteiro direito",
  "Substituição paralama dianteiro esquerdo",
  "Substituição grade dianteira",
  "Substituição farol dianteiro direito",
  "Substituição farol dianteiro esquerdo",
  "Substituição lanterna traseira direita",
  "Substituição lanterna traseira esquerda",
  "Substituição espelho retrovisor direito",
  "Substituição espelho retrovisor esquerdo",
  "Substituição vidro para-brisa",
  "Substituição vidro traseiro",
  "Substituição vidro porta dianteira direita",
  "Substituição vidro porta dianteira esquerda",
  "Substituição vidro porta traseira direita",
  "Substituição vidro porta traseira esquerda",
  
  // Polimentos
  "Polimento completo",
  "Polimento de farol",
  "Polimento de peça",
  "Polimento técnico",
  "Polimento cristalizado",
  "Polimento e cristalização",
  
  // Outros serviços
  "Martelinho de ouro",
  "Reparação de riscos",
  "Reparação de granizo",
  "Tratamento anticorrosivo",
  "Impermeabilização de estofados",
  "Higienização interna",
  "Aplicação de película",
  "Aplicação de insulfilm",
  "Reparação de calhas",
  "Reparação de solda",
  "Alinhamento de portas",
  "Alinhamento de tampa traseira",
  "Alinhamento de capô",
  "Aplicação de verniz",
  "Aplicação de primer",
  "Aplicação de massa",
  "Lixamento e preparação para pintura",
  "Reparação de ferrugem",
  "Reparação de trinca",
  "Reparação de furo",
  "Reparação de rasgo",
  "Aplicação de adesivos",
  "Remoção de adesivos",
  "Personalização com adesivos",
  "Envelopamento parcial",
  "Envelopamento completo",
  "Restauração de plásticos",
  "Restauração de painel",
  "Hidratação de couro",
  "Limpeza de estofados",
  "Lavagem técnica",
  "Lavagem de motor",
  "Cristalização de vidros",
  "Vitrificação de pintura",
  "Aplicação de cerâmica",
  "Reparação de para-choque plástico",
  "Reparação de caixa de roda",
  "Reparação de assoalho",
  "Funilaria completa",
  "Geometria de chassi",
  "Alinhamento de chassi",
  "Reparação de longarina",
  "Reparação de monobloco"
];

// Removida a tabela de preços sugeridos e a função de sugestão de preços
// Os preços serão inseridos manualmente pelo usuário

// Gerar lista de anos (do ano atual até 1950)
function generateYearsList() {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  // Adicionar anos do atual até 1950
  for (let year = currentYear; year >= 1950; year--) {
    years.push(year.toString());
  }
  
  return years;
}

// Lista de anos para o autocomplete
const anos = generateYearsList();

// Função para adicionar efeito de destaque ao selecionar um item
function addHighlightEffect(element) {
  // Adicionar classe para o efeito visual
  element.classList.add('highlight-selection');
  
  // Remover a classe após a animação
  setTimeout(() => {
    element.classList.remove('highlight-selection');
  }, 800);
}

// Inicializar o Awesomplete quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  const vehicleInput = document.getElementById('vehicle-name');
  const yearInput = document.getElementById('vehicle-year');
  
  // Inicializar autocomplete para veículos
  if (vehicleInput) {
    // Inicializar o Awesomplete
    const awesomplete = new Awesomplete(vehicleInput, {
      list: veiculos,
      minChars: 1,
      maxItems: 8,
      autoFirst: true,
      filter: function(text, input) {
        // Filtro personalizado que ignora acentos e maiúsculas/minúsculas
        return Awesomplete.FILTER_CONTAINS(
          text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
          input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        );
      }
    });
    
    // Adicionar evento para quando o usuário digita no campo de veículo
    vehicleInput.addEventListener('input', function() {
      // Verificar se o texto digitado está na lista de veículos
      const inputValue = this.value.toLowerCase();
      const matchingVehicles = veiculos.filter(v => 
        v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
          inputValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
      );
      
      // Se não houver correspondências e o campo não estiver vazio
      if (matchingVehicles.length === 0 && inputValue.length > 0) {
        // Adicionar uma classe para indicar que o veículo não foi encontrado
        this.classList.add('vehicle-not-found');
      } else {
        // Remover a classe se houver correspondências ou o campo estiver vazio
        this.classList.remove('vehicle-not-found');
      }
    });
    
    // Adicionar classe para indicar que o campo tem autocomplete
    vehicleInput.classList.add('has-awesomplete');
    
    // Evento para quando um item é selecionado
    vehicleInput.addEventListener('awesomplete-selectcomplete', function() {
      const selectedVehicle = vehicleInput.value;
      const modelInput = document.getElementById('vehicle-model');
      
      // Adicionar efeito de destaque
      addHighlightEffect(vehicleInput);
      
      if (modelInput) {
        // Limpar o campo de modelo quando o veículo é alterado
        modelInput.value = '';
        // Verificar se temos modelos para este veículo
        if (veiculosModelos[selectedVehicle]) {
          // Criar um novo Awesomplete para o campo de modelo
          if (!modelInput.awesomplete) {
            modelInput.classList.add('awesomplete');
            new Awesomplete(modelInput, {
              list: veiculosModelos[selectedVehicle],
              minChars: 0,
              maxItems: 8,
              autoFirst: true
            });
          } else {
            // Atualizar a lista de modelos
            modelInput.awesomplete.list = veiculosModelos[selectedVehicle];
          }
          
          // Atualizar o placeholder com alguns exemplos de modelos
          const modelos = veiculosModelos[selectedVehicle];
          if (modelos && modelos.length > 0) {
            const exemplos = modelos.slice(0, 3).join(', ');
            modelInput.placeholder = `Ex: ${exemplos}`;
          }
          
          // Adicionar evento de foco para mostrar as sugestões
          // Usamos setTimeout para evitar que as sugestões apareçam e desapareçam rapidamente
          modelInput.addEventListener('focus', function() {
            // Verificar se o foco foi mantido por pelo menos 100ms antes de mostrar sugestões
            setTimeout(() => {
              // Verificar se o autocomplete está permitido e se o campo ainda tem foco
              if (window.allowAutocomplete && document.activeElement === this && this.value === '') {
                // Mostrar todas as sugestões quando o campo estiver vazio e ainda tiver foco
                this.awesomplete.evaluate();
              }
            }, 200);
          });
          
          // Adicionar evento para quando um modelo é selecionado
          modelInput.addEventListener('awesomplete-selectcomplete', function() {
            // Adicionar efeito de destaque
            addHighlightEffect(this);
          });
        } else {
          modelInput.placeholder = "Ex: Vivace 1.0"; // Placeholder padrão
        }
      }
    });
    
    // Evento para quando o usuário clica no campo de veículo
    // Usamos setTimeout para evitar que as sugestões apareçam e desapareçam rapidamente
    // quando a seção é carregada
    vehicleInput.addEventListener('focus', function() {
      // Verificar se o foco foi mantido por pelo menos 100ms antes de mostrar sugestões
      setTimeout(() => {
        // Verificar se o autocomplete está permitido e se o campo ainda tem foco
        if (window.allowAutocomplete && document.activeElement === this && this.value === '') {
          // Mostrar todas as sugestões quando o campo estiver vazio e ainda tiver foco
          this.awesomplete.evaluate();
        }
      }, 200);
    });
  }
  
  // Inicializar autocomplete para o campo de ano
  if (yearInput) {
    // Inicializar o Awesomplete para o ano
    const yearAwesomplete = new Awesomplete(yearInput, {
      list: anos,
      minChars: 0,  // Mostrar todos os anos ao clicar
      maxItems: 10, // Mostrar mais itens para facilitar a seleção
      autoFirst: true,
      sort: false    // Manter a ordem cronológica (mais recente primeiro)
    });
    
    // Adicionar classe para indicar que o campo tem autocomplete
    yearInput.classList.add('has-awesomplete');
    
    // Evento para quando o usuário clica no campo de ano
    // Usamos setTimeout para evitar que as sugestões apareçam e desapareçam rapidamente
    // quando a seção é carregada
    yearInput.addEventListener('focus', function() {
      // Verificar se o foco foi mantido por pelo menos 100ms antes de mostrar sugestões
      setTimeout(() => {
        // Verificar se o autocomplete está permitido e se o campo ainda tem foco
        if (window.allowAutocomplete && document.activeElement === this && this.value === '') {
          // Mostrar todas as sugestões quando o campo estiver vazio e ainda tiver foco
          this.awesomplete.evaluate();
        }
      }, 200);
    });
    
    // Evento para quando um ano é selecionado
    yearInput.addEventListener('awesomplete-selectcomplete', function() {
      // Adicionar efeito de destaque
      addHighlightEffect(this);
    });
  }
  
  // Inicializar autocomplete para o campo de descrição de serviços
  const descriptionInput = document.getElementById('item-description');
  if (descriptionInput) {
    // Inicializar o Awesomplete para serviços
    const descriptionAwesomplete = new Awesomplete(descriptionInput, {
      list: servicosFunilaria,
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
        if (window.allowAutocomplete && document.activeElement === this && this.value === '') {
          // Mostrar todas as sugestões quando o campo estiver vazio e ainda tiver foco
          this.awesomplete.evaluate();
        }
      }, 200);
    });
    
    // Evento para quando um serviço é selecionado
    descriptionInput.addEventListener('awesomplete-selectcomplete', function() {
      // Adicionar efeito de destaque
      addHighlightEffect(this);
    });
  }
});
