// Script de depuração para verificar o funcionamento das abas
document.addEventListener('DOMContentLoaded', function() {
  console.log('Debug script carregado');
  
  // Verificar se as abas existem
  const tabsContainer = document.querySelector('.tabs-container');
  console.log('Container de abas:', tabsContainer);
  
  const tabButtons = document.querySelectorAll('.tab-button');
  console.log('Botões de abas encontrados:', tabButtons.length);
  tabButtons.forEach((button, index) => {
    console.log(`Aba ${index + 1}:`, button.getAttribute('data-tab'));
  });
  
  const tabContents = document.querySelectorAll('.tab-content');
  console.log('Conteúdos de abas encontrados:', tabContents.length);
  tabContents.forEach((content, index) => {
    console.log(`Conteúdo ${index + 1}:`, content.id);
  });
  
  // Adicionar event listeners para as abas
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      console.log('Clique na aba:', tabId);
      
      // Remover classe active de todas as abas
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Adicionar classe active à aba clicada
      this.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');
      
      console.log('Aba ativada:', tabId);
    });
  });
  
  // Verificar se estamos na etapa 4
  document.getElementById('btn-next').addEventListener('click', function() {
    setTimeout(() => {
      const step4 = document.getElementById('step-4');
      if (step4 && step4.classList.contains('active')) {
        console.log('Etapa 4 ativada - verificando abas');
        const activeTab = document.querySelector('.tab-button.active');
        const activeContent = document.querySelector('.tab-content.active');
        console.log('Aba ativa:', activeTab ? activeTab.getAttribute('data-tab') : 'nenhuma');
        console.log('Conteúdo ativo:', activeContent ? activeContent.id : 'nenhum');
      }
    }, 100);
  });
});
