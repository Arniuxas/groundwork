const CACHE='groundwork-v18';
const SHELL=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','fonts/fonts.css','fonts/IBMPlexMono-500-latin-ext.woff2','fonts/IBMPlexMono-500-latin.woff2','fonts/IBMPlexMono-600-latin-ext.woff2','fonts/IBMPlexMono-600-latin.woff2','fonts/IBMPlexSans-400-latin-ext.woff2','fonts/IBMPlexSans-400-latin.woff2','fonts/IBMPlexSans-500-latin-ext.woff2','fonts/IBMPlexSans-500-latin.woff2','fonts/IBMPlexSans-600-latin-ext.woff2','fonts/IBMPlexSans-600-latin.woff2','fonts/Newsreader-400-latin-ext.woff2','fonts/Newsreader-400-latin.woff2','fonts/Newsreader-400i-latin-ext.woff2','fonts/Newsreader-400i-latin.woff2','fonts/Newsreader-500-latin-ext.woff2','fonts/Newsreader-500-latin.woff2','fonts/Newsreader-600-latin-ext.woff2','fonts/Newsreader-600-latin.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
});
