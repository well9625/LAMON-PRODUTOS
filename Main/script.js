// =============================================
// SCROLL INFINITO - VERSÃO ESTÁVEL (SEM LOOPS)
// =============================================

// Variável para controlar se já foi executado
let scrollConfigurado = false;

function configurarScroll() {
  // Impede execuções duplicadas
  if (scrollConfigurado) return;
  
  const track = document.querySelector('.logos-track');
  if (!track) return;
  
  const logos = track.querySelectorAll('img');
  if (logos.length === 0) return;
  
  const totalLogos = logos.length / 2;
  
  let larguraPrimeiraMetade = 0;
  for (let i = 0; i < totalLogos; i++) {
    const logo = logos[i];
    const largura = logo.offsetWidth;
    const margemDireita = parseFloat(getComputedStyle(logo).marginRight) || 0;
    larguraPrimeiraMetade += largura + margemDireita;
  }
  
  if (larguraPrimeiraMetade === 0) {
    larguraPrimeiraMetade = 1500;
  }
  
  // Remove animação existente
  track.style.animation = 'none';
  track.style.transform = 'translateX(0)';
  
  // Remove estilos anteriores
  const estiloAntigo = document.getElementById('scrollStyle');
  if (estiloAntigo) {
    estiloAntigo.remove();
  }
  
  // Cria a nova animação
  const style = document.createElement('style');
  style.id = 'scrollStyle';
  style.textContent = `
    @keyframes scrollInfinitoExato {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${larguraPrimeiraMetade}px); }
    }
    .logos-track {
      animation: scrollInfinitoExato 20s linear infinite !important;
    }
  `;
  document.head.appendChild(style);
  
  // Marca como configurado
  scrollConfigurado = true;
  
  console.log('✅ Scroll infinito configurado com sucesso!');
  console.log('✅ Largura calculada:', larguraPrimeiraMetade + 'px');
}

// Executa APENAS UMA VEZ quando a página carregar
window.addEventListener('load', function() {
  // Aguarda as imagens carregarem
  setTimeout(configurarScroll, 500);
});

// Executa APENAS se a janela for redimensionada (com delay)
let timeoutId;
window.addEventListener('resize', function() {
  // Reseta a flag para permitir reconfigurar
  scrollConfigurado = false;
  
  // Limpa o timeout anterior
  clearTimeout(timeoutId);
  
  // Aguarda o usuário parar de redimensionar
  timeoutId = setTimeout(function() {
    configurarScroll();
  }, 500);
});