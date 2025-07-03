export function register(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(
        (registration) => {
          console.log('Service Worker registered: ', registration);
        },
        (error) => {
          console.error('Service Worker registration failed: ', error);
        },
      );
    });
  }
}

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
