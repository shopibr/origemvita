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
    if (['rubravita-live', 'ignivita-live', 'levivita-live', 'aurivita-live', 'pedivita-live', 'cinnavita-live', 'cordivita-live'].includes(document.body.dataset.checkout)) return;
    event.preventDefault();
    if (!window.CO) return;
    dialog.querySelector('.demo-selection').textContent = `${window.COkit} · ${window.COprice}`;
    dialog.showModal();
  }));
})();

// One-finger horizontal swipes change slides; the browser owns scrolling and zoom.
(() => {
  const gallery = document.getElementById('slides');
  const buttons = Array.from(document.querySelectorAll('.thumbs button'));
  if (!gallery || buttons.length < 2) return;
  let start = null;
  const zoomed = () => window.visualViewport && window.visualViewport.scale > 1.01;
  const updateTouchAction = () => {
    gallery.style.touchAction = zoomed() ? 'auto' : 'pan-y pinch-zoom';
    start = null;
  };
  updateTouchAction();
  if (window.visualViewport) window.visualViewport.addEventListener('resize', updateTouchAction);
  gallery.addEventListener('touchstart', event => {
    start = event.touches.length === 1 && !zoomed()
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : null;
  }, { passive: true });
  gallery.addEventListener('touchmove', event => {
    if (event.touches.length !== 1 || zoomed()) start = null;
  }, { passive: true });
  gallery.addEventListener('touchcancel', () => { start = null; }, { passive: true });
  gallery.addEventListener('touchend', event => {
    const origin = start;
    start = null;
    if (!origin || event.touches.length || zoomed() || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - origin.x;
    const dy = event.changedTouches[0].clientY - origin.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    const current = buttons.findIndex(button => button.classList.contains('on'));
    const next = (current + (dx < 0 ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].click();
  }, { passive: true });
})();
