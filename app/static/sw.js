// After a service worker is installed and the user navigates to a different page or refreshes,the service worker will begin to receive fetch events
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.open('cache').then(function(cache) {
    return cache.match(event.request).then(function(response) {
      console.log("cache request: " + event.request.url);
      var fetchPromise = fetch(event.request).then(function(networkResponse) {           
          // If we got a response from the cache, update the cache                   
          console.log("fetch completed: " + event.request.url, networkResponse);
          if (networkResponse) {
              console.debug("updated cached page: " + event.request.url, networkResponse);
              cache.put(event.request, networkResponse.clone());}
              return networkResponse;
              }, function (e) {   
              // Rejected promise - just ignore it, we're offline!   
              console.log("Error in fetch()", e);
              e.waitUntil(
              caches.open('cache').then(function(cache) { // Our cache here is named *cache* in the caches.open()
              return cache.addAll
              ([            
              // cache.addAll(), takes a list of URLs, then fetches them from the server and adds the response to the cache.           
              // Add your entire site to the cache- as in the code below; for offline access
              // If you have some build process for your site, perhaps that could generate the list of possible URLs that a user might load.               
              '/', // Do not remove this
              '/favicon.ico',
              '/index.html', // Default
              '/index.html?homescreen=1', // Default
              '/?homescreen=1', // Default
              '/index.css', // Configure as by your site; just an example
              '/apple-touch-icon.png',
              '/favicon-16x16.png',
              '/favicon-32x32.png',
              '/android-chrome-192x192.png',
              '/safari-pinned-tab.svg',
              '/mstile-144x144.png',
              '/autotrack.min.js',
              // Do not replace/delete/edit the service-worker.js/ and manifest.js paths below
              '/sw.js',
              '/manifest.json'   
              ]);
            })
          );
        });
      // Respond from the cache, or the network
      return response || fetchPromise;
    });
  }));
});
