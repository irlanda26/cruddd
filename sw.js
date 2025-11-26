const CHACE_NAME = 'chache-1';
self.addEventListener('install', e => {
    const cacheProm = caches.open(CHACE_NAME).then(cache => {
        return cache.addAll([
            '/',
            'index.html',
            '/css/login.css',
            '/html/login.html',
            'js/app.js',
            '/js/celular.js',
            '/js/login.js',
            'json.json',
            'celuares.json',
            'logo.png'

        ]);
    });
    e.waitUntil(cacheProm);
});
self.addEventListener('fetch', e => {
    //solo cachas
    //e.respondWith(caches.match(e.request));
    //busca en el cache y la web
    const respuesta = caches.match(e.request).then(res => {
        if (res) return res;
        //dosen esist
        console.log('desen esist', e.request.url);
        return fetch(e.request).then(newR => {
            caches.open(CHACE_NAME).then(cache => {
                cache.put(e.request, newR);
            })
            return newR.clone();
        })
    })
    e.respondWith(respuesta);
})