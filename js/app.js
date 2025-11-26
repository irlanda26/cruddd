
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}
if (window.caches) {
    caches.open('Prueba-1').then(cache => {
        // cache.add('/index.html');
        cache.addAll([
            '../index.html',
            '../css/login.css',
            '../html/login.html',
            'js/celular.js',
            'js/login.js',
            '../celuares.json',
            '../json.json',
            '../logo.png'
        ]).then(() => {
            //cache.delete('/css/style.css');
            cache.put('/index.html', new Response('hola munde'))
        });
    })
}
caches.keys().then(keys => {
    console.log(keys);
})