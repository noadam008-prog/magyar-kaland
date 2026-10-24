// Magyar Kaland offline cache (42f054fb22)
const CACHE = "mk-42f054fb22";
const SHELL = ["./", "index.html", "app.js?v=42f054fb22", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "packs/index.json", "packs/pics.json", "assets/node_modules/@expo-google-fonts/baloo-2/400Regular/Baloo2_400Regular.20f6d0043a8ab7fd4a6466f6f6611685.ttf", "assets/node_modules/@expo-google-fonts/baloo-2/500Medium/Baloo2_500Medium.cf867a5944fb838010f772a139620a75.ttf", "assets/node_modules/@expo-google-fonts/baloo-2/600SemiBold/Baloo2_600SemiBold.61e1563819bc0ab5fc68673fc4909c99.ttf", "assets/node_modules/@expo-google-fonts/baloo-2/700Bold/Baloo2_700Bold.f57ab981c1dec25a04bea3cce20ea18c.ttf", "assets/node_modules/@expo-google-fonts/baloo-2/800ExtraBold/Baloo2_800ExtraBold.15e8199eb1b3d423d8642f1837b3a9c4.ttf"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  })));
});
