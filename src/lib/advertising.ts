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

/** Adsterra Native Banner (NativeBanner_1, 4:1 widget). */
export const ADSTERRA_NATIVE_KEY = "471ff9dfab2afed94172b3c1bae1109a";
/** Adsterra Social Bar (SocialBar_1) — the only ad script that runs in the page itself. */
export const ADSTERRA_SOCIAL_BAR_SRC = "https://bauval.org/14/08f2737e64f46d6026af4de4283ec886";
/** Adsterra Smartlink (Smartlink_1) — used only as a clearly labelled sponsored link. */
export const ADSTERRA_SMARTLINK = "https://araplhn.org/4/774cb25231e4bd2f08c8dfa892efffb7";

/** Delay before the Social Bar may load, so it never shows during the first seconds of a visit. */
export const SOCIAL_BAR_DELAY_MS = 12000;

/** Social Bar stays off admin screens and the private review form. */
export function socialBarAllowed(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return !/^\/(admin|recenzie|lovable)(\/|$)/.test(path);
}

/** Sandboxed document for the native banner; reports fill and its content height to the parent. */
export function nativeBannerDocument(id: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_blank"><style>html,body{margin:0;padding:0;overflow:hidden;font-family:system-ui,sans-serif}</style></head><body><div id="wrap"><script>
  const send=(data)=>parent.postMessage(Object.assign({type:'adsterra-native',id:${JSON.stringify(id)}},data),'*');
  let filled=false;
  const height=()=>Math.ceil(document.getElementById('wrap').getBoundingClientRect().height);
  const check=()=>{const box=document.getElementById('container-${ADSTERRA_NATIVE_KEY}');if(!box)return;const h=height();if(box.children.length&&h>20){filled=true;send({filled:true,height:h})}};
  new MutationObserver(check).observe(document.body,{childList:true,subtree:true,attributes:true});
  setInterval(check,1000);
  setTimeout(()=>{if(!filled)send({filled:false})},15000);
  </script><script async="async" data-cfasync="false" src="https://bauval.org/21/${ADSTERRA_NATIVE_KEY}" onerror="send({filled:false})"></script><div id="container-${ADSTERRA_NATIVE_KEY}"></div></div></body></html>`;
}
