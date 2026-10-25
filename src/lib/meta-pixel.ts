export const PIXEL_ID = "1104208202495234";

// Load the existing Meta Pixel once, and report PageView on initial page load.
export const PIXEL_SNIPPET = `(function(){
  if (window.__radarPixelStarted) return;
  window.__radarPixelStarted = true;

  !function(f,b,e,v,n,t,s) {
    if(f.fbq) return;
    n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
    if(!f._fbq) f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
    t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init','${PIXEL_ID}');
  window.fbq('track','PageView');
  window.__radarMetaPvPending=true;
  window.dispatchEvent(new Event('radar:meta-pageview'));
})();`;
