/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

// SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0>

function handleRegistration(registration) {
  console.log('Service Worker Registered.', registration);

  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (!installingWorker) return;

    installingWorker.onstatechange = () => {
      console.log('Service Worker state:', installingWorker.state);

      if (installingWorker.state !== 'installed') return;

      if (navigator.serviceWorker.controller) {
        console.log('New Service Worker installed. It will activate automatically.');
      } else {
        console.log('Service Worker installed for the first time.');
      }
    };
  };
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(handleRegistration)
    .catch((error) => {
      console.log('ServiceWorker registration failed:', error);
    });

  let refreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;

    console.log('New Service Worker has taken control. Reloading page...');
    window.location.reload();
  });
}
