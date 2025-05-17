if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Registering Service Worker...');
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
} else {
    console.error('Service Worker not supported in this browser');
}