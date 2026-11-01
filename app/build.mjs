// Copies the web game into www/ for the native apps (no service worker: the files ship inside the app)
import {cpSync,rmSync,mkdirSync} from 'node:fs';
const src=new URL('../',import.meta.url),www=new URL('./www/',import.meta.url);
rmSync(www,{recursive:true,force:true});mkdirSync(www);
for(const f of ['index.html','manifest.webmanifest','icon.svg','icon-180.png','icon-192.png','icon-512.png','fonts'])
  cpSync(new URL(f,src),new URL(f,www),{recursive:true});
console.log('www/ ready');
