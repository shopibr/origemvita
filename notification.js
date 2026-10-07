// Social Proof Notifications - Simula compras em tempo real
(function() {
  // Banner "Somente Hoje Frete Expresso Grátis" no topo
  const banner = document.createElement('div');
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, #dc2626 0%, #991b1b 100%);
    color: white;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    animation: pulse 2s infinite;
  `;
  banner.innerHTML = '🚚 SOMENTE HOJE FRETE EXPRESSO GRÁTIS 🚚';
  document.body.appendChild(banner);
  
  // Adicionar padding no body para o banner não sobrepor
  document.body.style.paddingTop = '52px';
  
  const nomes = ['João', 'Maria', 'Carlos', 'Ana', 'Paulo', 'Fernanda', 'Ricardo', 'Patricia', 'Bruno', 'Silvia', 'Marcelo', 'Juliana'];
  const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Pereira', 'Costa', 'Ferreira', 'Martins', 'Gomes', 'Alves', 'Rocha'];
  const produtos = ['RUBRAVITA', 'IGNIVITA', 'LEVIVITA', 'PEDIVITA', 'AURIVITA', 'CINNAVITA', 'CORDIVITA'];
  
  function getNomeAleatorio() {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`;
  }
  
  function getProdutoAleatorio() {
    return produtos[Math.floor(Math.random() * produtos.length)];
  }
  
  function mostrarNotificacao() {
    const nome = getNomeAleatorio();
    const produto = getProdutoAleatorio();
    const msgArray = [
      `${nome} comprou ${produto} agora`,
      `${nome} acabou de adquirir ${produto}`,
      `Novo pedido: ${produto} de ${nome}`,
      `${nome} confirmou compra de ${produto}`,
      `+1 cliente: ${produto} (${nome})`,
    ];
    
    const msg = msgArray[Math.floor(Math.random() * msgArray.length)];
    
    // Criar elemento de notificação
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    
    notif.textContent = '✓ ' + msg;
    document.body.appendChild(notif);
    
    // Remover após 4 segundos
    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notif.remove(), 300);
    }, 4000);
  }
  
  // Adicionar animações CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  `;
  document.head.appendChild(style);
  
  // Mostrar notificação a cada 8-15 segundos
  setInterval(mostrarNotificacao, Math.random() * 7000 + 8000);
  
  // Mostrar primeira notificação após 3 segundos
  setTimeout(mostrarNotificacao, 3000);
})();
