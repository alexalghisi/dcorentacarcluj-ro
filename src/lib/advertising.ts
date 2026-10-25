export const ADSENSE_ACCOUNT = "ca-pub-4079300108937036";
export const ADSENSE_SCRIPT = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT}`;

export function adsterraUnit(width: number) {
  if (width >= 768) return { key: "420bec8420ceb6dcf93ad0c873b010eb", width: 728, height: 90 };
  if (width >= 400) return { key: "ab9100a85f77f2acafea9f09e17594b4", width: 300, height: 250 };
  return { key: "ac44df6e484d23de0b5037682810d054", width: 320, height: 50 };
}

export function adsterraDocument(unit: ReturnType<typeof adsterraUnit>, id: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;overflow:hidden}#ad{width:${unit.width}px;height:${unit.height}px}</style></head><body><div id="ad"><script>
  const notify=(filled)=>parent.postMessage({type:'adsterra-fill',id:${JSON.stringify(id)},filled},'*');
  let filled=false;
  const mark=()=>{filled=true;notify(true)};
  const watch=()=>document.querySelectorAll('#ad iframe,#ad img,#ad video').forEach(el=>{
    if(el.dataset.watched)return;el.dataset.watched='1';
    el.addEventListener('load',()=>{if(el.tagName==='IMG'&&!el.naturalWidth)return;mark()});
    if(el.tagName==='IMG'&&el.complete&&el.naturalWidth)mark();
  });
  new MutationObserver(watch).observe(document.getElementById('ad'),{childList:true,subtree:true});
  const probe=setInterval(()=>{if(filled)return clearInterval(probe);watch();document.querySelectorAll('#ad iframe').forEach(f=>{try{const b=f.contentDocument&&f.contentDocument.body;if(b&&b.innerHTML.length>50)mark()}catch(e){}})},500);
  setTimeout(()=>{if(!filled)notify(false)},15000);
  window.atOptions=${JSON.stringify({ ...unit, format: "iframe", params: {} })};
  </script><script src="https://bauval.org/22/${unit.key}" onerror="notify(false)"></script></div></body></html>`;
}