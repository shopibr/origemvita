(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'demo-checkout';
  dialog.innerHTML = '<h2>Seu kit está selecionado.</h2><p class="demo-selection"></p><p>Esta é uma apresentação demonstrativa. Nenhuma compra ou cobrança será realizada.</p><button type="button">Voltar à página</button>';
  document.body.append(dialog);
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  document.querySelectorAll('.offer').forEach(offer => {
    offer.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); offer.click(); }
    });
    offer.addEventListener('click', () => {
      document.querySelectorAll('.offer').forEach(item => item.setAttribute('aria-checked', String(item.dataset.kit === offer.dataset.kit)));
      const bar = document.querySelector('.stickybar .info');
      if (bar) bar.textContent = `${window.COkit} · ${window.COprice}`;
    });
  });
  document.querySelectorAll('.js-buy').forEach(button => button.addEventListener('click', event => {
    if (['rubravita-live', 'ignivita-live', 'levivita-live'].includes(document.body.dataset.checkout)) return;
    event.preventDefault();
    if (!window.CO) return;
    dialog.querySelector('.demo-selection').textContent = `${window.COkit} · ${window.COprice}`;
    dialog.showModal();
  }));
})();
