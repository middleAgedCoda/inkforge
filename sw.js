const V="inkforge-v28",SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  const page=r.mode==="navigate"||/\/(index\.html)?$/.test(new URL(r.url).pathname);
  const store=res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
  if(page){e.respondWith(fetch(r).then(store).catch(()=>caches.match(r).then(h=>h||caches.match("index.html"))));return}
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(store)))});
