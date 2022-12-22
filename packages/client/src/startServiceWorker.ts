function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./assets/serviceWorker.js', { type: 'module' })
        .then((reg) => {
          console.log('ServiceWorker registration successful with scope: ', reg.scope);
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
}

export default startServiceWorker;
