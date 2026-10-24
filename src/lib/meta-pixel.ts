export const PIXEL_ID = "1104208202495234";

// Conservative no-banner route: unresolved locations and consent regions do not transmit.
export const CONSENT_REGIONS = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LI LV LT LU MT NL NO PL PT RO SK SI ES SE GB CH BR CA KR TR ZA".split(" ");

export function permitsAdvertising(country: string, optedOut = false): boolean {
  return !optedOut && /^[A-Z]{2}$/.test(country) && !["XX", "T1", ...CONSENT_REGIONS].includes(country);
}

export function advertisingPermittedNow(): boolean {
  if (typeof window === "undefined") return false;
  const state = window as Window & { __radarAdvertisingAllowed?: boolean };
  const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
  try {
    return state.__radarAdvertisingAllowed === true && !browser.globalPrivacyControl &&
      !["denied", "false", "rejected"].includes(window.localStorage.getItem("advertising_consent") ?? "");
  } catch {
    return false;
  }
}

// Official Meta bootstrap, guarded once per document and loaded only where permitted.
export const PIXEL_SNIPPET = `(function(){
if(window.__radarPixelStarted)return;window.__radarPixelStarted=true;
window.__radarAdvertisingAllowed=false;
function optedOut(){try{return navigator.globalPrivacyControl===true||['denied','false','rejected'].indexOf(localStorage.getItem('advertising_consent'))!==-1;}catch(e){return true;}}
var controller=new AbortController();var timeout=setTimeout(function(){controller.abort();},2000);
fetch('/cdn-cgi/trace',{signal:controller.signal,credentials:'same-origin'}).then(function(r){if(!r.ok)throw new Error('region unavailable');return r.text();}).then(function(text){
var match=text.match(/^loc=([A-Z0-9]{2})$/m);var country=match?match[1]:'';
if(!/^[A-Z]{2}$/.test(country)||${JSON.stringify([...CONSENT_REGIONS, "XX", "T1"])}.indexOf(country)!==-1||optedOut())return;
window.__radarAdvertisingAllowed=true;
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}',{},{agent:'lovable'});fbq('track','PageView');
}).catch(function(){}).finally(function(){clearTimeout(timeout);});
window.addEventListener('storage',function(){if(optedOut()){window.__radarAdvertisingAllowed=false;if(typeof window.fbq==='function')window.fbq('consent','revoke');}});
})();`;