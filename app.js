(function () {
"use strict";

var LS_KEY = "jp-shopmap-v1";
var CAT_ORDER = ["clothing", "shoes", "issey", "basics", "second", "market"];
var state = { city: "tokyo", tab: "shops", cats: [], styles: [], prices: [], q: "", saved: [], sel: null, route: null, area: "all", loc: null, sort: "price" };
try {
  var raw = localStorage.getItem(LS_KEY);
  if (raw) { var s0 = JSON.parse(raw); if (Array.isArray(s0.saved)) state.saved = s0.saved; if (s0.city === "kyoto" || s0.city === "tokyo") state.city = s0.city; }
} catch (e) {}
function persist() { try { localStorage.setItem(LS_KEY, JSON.stringify({ saved: state.saved, city: state.city })); } catch (e) {} }

var $ = function (id) { return document.getElementById(id); };
function h(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function catColor(cat) { return "var(" + CATS[cat].v + ")"; }
function yen(n) { return "¥¥¥".slice(0, n); }
function priceLabel(p) { if (!p) return "Varies"; return p[0] === p[1] ? yen(p[0]) : yen(p[0]) + "–" + yen(p[1]); }
function byId(id) { for (var i = 0; i < SHOPS.length; i++) if (SHOPS[i].id === id) return SHOPS[i]; return null; }
function toggle(arr, v) { var i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); }
function mapsUrl(s) {
  var q = s.name + ", " + s.area + ", " + (s.city === "tokyo" ? "Tokyo" : "Kyoto") + ", Japan";
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
}
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var isNarrow = function () { return window.matchMedia("(max-width: 860px)").matches; };

/* Market dates */
function today0() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function nextMarket(s) {
  var t = today0();
  if (s.monthly) {
    var d = new Date(t.getFullYear(), t.getMonth(), s.monthly);
    if (d < t) d = new Date(t.getFullYear(), t.getMonth() + 1, s.monthly);
    return d;
  }
  if (s.dates) for (var i = 0; i < s.dates.length; i++) {
    var p = s.dates[i].split("-"), dd = new Date(+p[0], +p[1] - 1, +p[2]);
    if (dd >= t) return dd;
  }
  return null;
}
function nextLabel(s) {
  var d = nextMarket(s); if (!d) return null;
  var diff = Math.round((d - today0()) / 86400000);
  var when = diff === 0 ? "today" : diff === 1 ? "tomorrow" : "in " + diff + " days";
  return "Next: " + d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) + " · " + when;
}

/* Distance helpers */
var CENTERS = { tokyo: [35.68, 139.74], kyoto: [35.0, 135.76] };
function meters(a, b) {
  var R = 6371000, t = Math.PI / 180;
  var dLat = (b[0] - a[0]) * t, dLng = (b[1] - a[1]) * t;
  var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * t) * Math.cos(b[0] * t) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function fmtDist(d) { return d < 1000 ? Math.round(d / 10) * 10 + " m" : (d / 1000).toFixed(d < 10000 ? 1 : 0) + " km"; }
function locCity() {
  if (!state.loc) return null;
  var here = [state.loc.lat, state.loc.lng];
  if (meters(here, CENTERS.tokyo) < 60000) return "tokyo";
  if (meters(here, CENTERS.kyoto) < 60000) return "kyoto";
  return null;
}
function nearCity() { return locCity() === state.city; }
function distTo(s) { return meters([state.loc.lat, state.loc.lng], [s.lat, s.lng]); }

/* ---------- Leaflet map ---------- */
var map = L.map("map", { zoomControl: true, attributionControl: true });
var darkMq = window.matchMedia("(prefers-color-scheme: dark)");
function styleUrl() { return "https://tiles.openfreemap.org/styles/" + (darkMq.matches ? "dark" : "positron"); }
var ATTR = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';
var base;
if (L.maplibreGL) {
  base = L.maplibreGL({ style: styleUrl(), attribution: ATTR }).addTo(map);
} else {
  base = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
}
function onScheme() {
  if (base.getMaplibreMap) { try { base.getMaplibreMap().setStyle(styleUrl()); } catch (e) {} }
  drawPins();
}
if (darkMq.addEventListener) darkMq.addEventListener("change", onScheme); else if (darkMq.addListener) darkMq.addListener(onScheme);
var markerLayer = L.layerGroup().addTo(map);
var routeLayer = L.layerGroup().addTo(map);
var markers = {};
map.on("click", function () { closePop(); });

function visibleShops() {
  var q = state.q.trim().toLowerCase();
  return SHOPS.filter(function (s) {
    if (s.city !== state.city) return false;
    if (state.cats.length && state.cats.indexOf(s.cat) < 0) return false;
    if (state.styles.length && !s.style.some(function (x) { return state.styles.indexOf(x) >= 0; })) return false;
    if (state.prices.length && s.p) {
      var ok = false;
      for (var t = s.p[0]; t <= s.p[1]; t++) if (state.prices.indexOf(t) >= 0) ok = true;
      if (!ok) return false;
    }
    if (q) { var hay = (s.name + " " + s.area + " " + s.why + " " + CATS[s.cat].label + " " + s.style.join(" ")).toLowerCase(); if (hay.indexOf(q) < 0) return false; }
    return true;
  });
}
function sortShops(arr) {
  if (state.sort === "near" && nearCity()) {
    return arr.slice().sort(function (a, b) {
      var da = a.lat != null ? distTo(a) : 1e9, db = b.lat != null ? distTo(b) : 1e9;
      return da - db;
    });
  }
  return arr.slice().sort(function (a, b) {
    var pa = a.p ? a.p[0] * 10 + a.p[1] : 99, pb = b.p ? b.p[0] * 10 + b.p[1] : 99;
    if (pa !== pb) return pa - pb;
    var ca = CAT_ORDER.indexOf(a.cat), cb = CAT_ORDER.indexOf(b.cat);
    if (ca !== cb) return ca - cb;
    return a.name.localeCompare(b.name);
  });
}
function findRoute(id) { var all = ROUTES.tokyo.concat(ROUTES.kyoto); for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i]; return null; }

function drawPins() {
  markerLayer.clearLayers(); routeLayer.clearLayers(); markers = {};
  var routeStops = state.tab === "routes" && state.route ? (findRoute(state.route) || {}).stops : null;
  var showIds = state.tab === "saved" ? state.saved : routeStops ? routeStops : visibleShops().map(function (s) { return s.id; });
  if (routeStops) {
    var pts = routeStops.map(byId).filter(function (s) { return s && s.lat != null; }).map(function (s) { return [s.lat, s.lng]; });
    var ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1b1f22";
    L.polyline(pts, { color: ink, weight: 3, opacity: 0.6, dashArray: "6 6" }).addTo(routeLayer);
  }
  var list = SHOPS.filter(function (s) { return s.city === state.city && s.lat != null && showIds.indexOf(s.id) >= 0; });
  list.forEach(function (s) {
    var on = true;
    var num = routeStops && on ? routeStops.indexOf(s.id) + 1 : null;
    var size = num ? 26 : 20;
    var icon = L.divIcon({
      className: "mkwrap",
      html: '<span class="mk' + (num ? " num" : "") + (on ? "" : " dim") + (state.sel === s.id ? " sel" : "") + '" style="--c:' + catColor(s.cat) + '">' + (num || "") + "</span>",
      iconSize: [size, size], iconAnchor: [size / 2, size / 2]
    });
    var m = L.marker([s.lat, s.lng], { icon: icon, title: s.name, keyboard: on, zIndexOffset: on ? 1000 : 0 });
    m.on("click", function (ev) { L.DomEvent.stopPropagation(ev); select(s.id, { fromMap: true }); });
    m.addTo(markerLayer); markers[s.id] = m;
  });
}
function markSel() {
  Object.keys(markers).forEach(function (id) {
    var el = markers[id].getElement(); if (!el) return;
    var span = el.querySelector(".mk"); if (span) span.classList.toggle("sel", id === state.sel);
  });
  document.querySelectorAll(".card").forEach(function (c) { c.classList.toggle("sel", c.id === "card-" + state.sel); });
}
function boundsOf(shops) {
  var pts = shops.filter(function (s) { return s && s.lat != null; }).map(function (s) { return [s.lat, s.lng]; });
  return pts.length ? L.latLngBounds(pts) : null;
}
function fitArea(animate) {
  var a = AREAS[state.city].filter(function (x) { return x.id === state.area; })[0];
  var b = a && a.b ? L.latLngBounds([a.b[0], a.b[2]], [a.b[1], a.b[3]]) : boundsOf(SHOPS.filter(function (s) { return s.city === state.city; }));
  if (b) map.fitBounds(b, { padding: [30, 30], animate: animate && !reduce });
}
function fitIds(ids) {
  var b = boundsOf(ids.map(byId));
  if (b) map.fitBounds(b, { padding: [50, 50], maxZoom: 17, animate: !reduce });
}

/* ---------- Panels ---------- */
function renderCityToggle() { ["tokyo", "kyoto"].forEach(function (c) { $("city-" + c).setAttribute("aria-pressed", String(state.city === c)); }); }
function renderAreas() {
  var box = $("areas"); box.innerHTML = "";
  AREAS[state.city].forEach(function (a) {
    var b = h("button", "areabtn", a.label); b.type = "button";
    b.setAttribute("aria-pressed", String(state.area === a.id));
    b.addEventListener("click", function (e) { e.stopPropagation(); state.area = a.id; renderAreas(); fitArea(true); });
    box.appendChild(b);
  });
  L.DomEvent.disableClickPropagation(box);
}
function renderLegend() {
  var box = $("legend"); box.innerHTML = "";
  CAT_ORDER.forEach(function (c) {
    if (!SHOPS.some(function (s) { return s.city === state.city && s.cat === c; })) return;
    var sp = h("span"), sw = h("i", "sw"); sw.style.background = catColor(c);
    sp.appendChild(sw); sp.appendChild(document.createTextNode(CATS[c].label)); box.appendChild(sp);
  });
}
function chip(label, pressed, onClick, extra) {
  var b = h("button", "chip"); b.type = "button"; b.setAttribute("aria-pressed", String(pressed));
  if (extra) b.appendChild(extra);
  var t = h("span", null, label); if (/^¥/.test(label)) t.className = "yen"; b.appendChild(t);
  b.addEventListener("click", onClick); return b;
}
function renderFilters() {
  var fc = $("f-cat"), fs = $("f-style"), fp = $("f-price");
  [fc, fs, fp].forEach(function (b) { while (b.children.length > 1) b.removeChild(b.lastChild); });
  CAT_ORDER.forEach(function (c) {
    if (!SHOPS.some(function (s) { return s.city === state.city && s.cat === c; })) return;
    var sw = h("i", "sw"); sw.style.background = catColor(c);
    fc.appendChild(chip(CATS[c].label, state.cats.indexOf(c) >= 0, function () { toggle(state.cats, c); update(); }, sw));
  });
  STYLES.forEach(function (st) { fs.appendChild(chip(st, state.styles.indexOf(st) >= 0, function () { toggle(state.styles, st); update(); })); });
  [1, 2, 3].forEach(function (t) { fp.appendChild(chip(yen(t), state.prices.indexOf(t) >= 0, function () { toggle(state.prices, t); update(); })); });
}

var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.6 9.7l5.8-.8z"/></svg>';
var STAR_O = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.6 9.7l5.8-.8z"/></svg>';

function card(s) {
  var c = h("article", "card" + (state.sel === s.id ? " sel" : "")); c.id = "card-" + s.id;
  var stripe = h("div", "stripe"); stripe.style.background = catColor(s.cat); c.appendChild(stripe);
  var body = h("div"); body.style.minWidth = "0";
  var head = h("div", "head");
  head.appendChild(h("h3", null, s.name)); head.appendChild(h("span", "price", priceLabel(s.p)));
  body.appendChild(head);
  if (nearCity() && s.lat != null) body.appendChild(h("div", "dist", fmtDist(distTo(s)) + " away"));
  body.appendChild(h("div", "meta", s.area + (s.hours ? " · " + s.hours : "")));
  body.appendChild(h("p", "why", s.why));
  var tags = h("div", "tags");
  var t1 = h("span", "tag"), sw = h("i", "sw"); sw.style.background = catColor(s.cat); t1.appendChild(sw); t1.appendChild(document.createTextNode(CATS[s.cat].label)); tags.appendChild(t1);
  s.style.forEach(function (st) { tags.appendChild(h("span", "tag", st)); });
  if (s.cat === "market") { var nl = nextLabel(s); if (nl) tags.appendChild(h("span", "next", nl)); }
  if (s.lat == null) tags.appendChild(h("span", "tag", "Not on map"));
  body.appendChild(tags);
  var act = h("div", "actions");
  var saved = state.saved.indexOf(s.id) >= 0;
  var sb = h("button", "save"); sb.type = "button"; sb.setAttribute("aria-pressed", String(saved));
  sb.innerHTML = (saved ? STAR : STAR_O) + "<span>" + (saved ? "Saved" : "Save") + "</span>";
  sb.addEventListener("click", function () { toggle(state.saved, s.id); persist(); update(); });
  act.appendChild(sb);
  if (s.lat != null) {
    var mb = h("button", null, "Show on map"); mb.type = "button";
    mb.addEventListener("click", function () { select(s.id, { zoom: true }); });
    act.appendChild(mb);
  }
  var gm = h("a", null, "Google Maps ↗"); gm.href = mapsUrl(s); gm.target = "_blank"; gm.rel = "noopener"; act.appendChild(gm);
  var sr = h("a", null, "Source ↗"); sr.href = s.src; sr.target = "_blank"; sr.rel = "noopener"; act.appendChild(sr);
  body.appendChild(act); c.appendChild(body);
  return c;
}
function renderList() {
  var shown = sortShops(visibleShops());
  var box = $("list"); box.innerHTML = "";
  var total = SHOPS.filter(function (s) { return s.city === state.city; }).length;
  var near = nearCity();
  $("shown").textContent = shown.length + " of " + total + " places" + (near ? "" : " · cheapest first");
  var sortBox = $("sort"); sortBox.innerHTML = ""; sortBox.hidden = !near;
  if (near) {
    [["price", "Cheapest"], ["near", "Nearest"]].forEach(function (o) {
      sortBox.appendChild(chip(o[1], state.sort === o[0], function () { state.sort = o[0]; renderList(); }));
    });
  }
  $("clear").hidden = !(state.cats.length || state.styles.length || state.prices.length || state.q);
  if (!shown.length) { box.appendChild(h("div", "empty", "Nothing matches these filters. Clear a filter or try another search.")); return; }
  shown.forEach(function (s) { box.appendChild(card(s)); });
}
function renderRoutes() {
  var box = $("panel-routes"); box.innerHTML = "";
  ROUTES[state.city].forEach(function (r) {
    var d = h("section", "route"); d.setAttribute("aria-current", String(state.route === r.id));
    d.appendChild(h("h3", null, r.name));
    d.appendChild(h("p", null, r.note + " " + r.stops.length + " stops."));
    if (state.route === r.id) {
      var ol = h("ol");
      r.stops.forEach(function (id, i) {
        var s = byId(id); if (!s) return;
        var li = h("li"); li.appendChild(h("span", "n", String(i + 1)));
        var b = h("button", null, s.name + (s.cat === "market" ? " (market days)" : "")); b.type = "button";
        b.addEventListener("click", function () { select(id, { zoom: true }); });
        li.appendChild(b); ol.appendChild(li);
      });
      d.appendChild(ol);
    }
    var sh = h("button", "linkbtn show", state.route === r.id ? "Hide route" : "Show route on map"); sh.type = "button";
    sh.addEventListener("click", function () {
      state.route = state.route === r.id ? null : r.id; state.sel = null; closePop();
      renderRoutes(); drawPins();
      if (state.route) fitIds(r.stops);
    });
    d.appendChild(sh); box.appendChild(d);
  });
}
function renderSaved() {
  var box = $("panel-saved"); box.innerHTML = "";
  var here = sortShops(state.saved.map(byId).filter(function (s) { return s && s.city === state.city; }));
  var other = state.saved.map(byId).filter(function (s) { return s && s.city !== state.city; }).length;
  var cityName = state.city === "tokyo" ? "Tokyo" : "Kyoto", otherName = state.city === "tokyo" ? "Kyoto" : "Tokyo";
  var top = h("div", "summary");
  top.appendChild(h("span", null, here.length + " saved in " + cityName + (other ? " · " + other + " in " + otherName : "")));
  if (here.length) { var fit = h("button", "linkbtn", "Fit map"); fit.type = "button"; fit.addEventListener("click", function () { fitIds(here.map(function (s) { return s.id; })); }); top.appendChild(fit); }
  box.appendChild(top);
  if (!here.length) { box.appendChild(h("div", "empty", "Tap Save on any shop to build your shortlist. It stays in this browser.")); return; }
  var list = h("div", "list"); here.forEach(function (s) { list.appendChild(card(s)); }); box.appendChild(list);
}
function renderTabs() {
  ["shops", "routes", "saved"].forEach(function (t) {
    $("tab-" + t).setAttribute("aria-selected", String(state.tab === t));
    $("panel-" + t).hidden = state.tab !== t;
  });
  $("savedcount").textContent = state.saved.length;
}

/* ---------- Selection ---------- */
function closePop() { $("pop").hidden = true; if (state.sel) { state.sel = null; markSel(); } }
function select(id, opts) {
  opts = opts || {};
  var s = byId(id); if (!s) return;
  state.sel = id; markSel();
  var pop = $("pop"), nl = s.cat === "market" ? nextLabel(s) : null;
  pop.innerHTML = '<button type="button" class="x" aria-label="Close">&times;</button>' +
    "<h3>" + esc(s.name) + "</h3>" +
    '<div class="meta">' + esc(CATS[s.cat].label) + " · " + esc(priceLabel(s.p)) + " · " + esc(s.area) + "</div>" +
    (s.hours ? '<div class="meta">' + esc(s.hours) + "</div>" : "") +
    (nl ? '<div class="meta">' + esc(nl) + "</div>" : "") +
    (nearCity() && s.lat != null ? '<div class="meta">' + esc(fmtDist(distTo(s))) + " from you</div>" : "") +
    '<div class="actions"><a target="_blank" rel="noopener" href="' + esc(mapsUrl(s)) + '">Google Maps ↗</a><button type="button" data-act="card">See details</button></div>';
  pop.hidden = false;
  L.DomEvent.disableClickPropagation(pop);
  pop.querySelector(".x").addEventListener("click", closePop);
  pop.querySelector('[data-act="card"]').addEventListener("click", function () { revealCard(id); });
  if (opts.zoom && s.lat != null) {
    map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 17), { animate: !reduce, duration: 0.6 });
    if (isNarrow()) document.querySelector(".mapwrap").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  if (opts.fromMap && !isNarrow()) revealCard(id, true);
}
function revealCard(id, soft) {
  var c = document.getElementById("card-" + id);
  if (!c && state.tab !== "shops") { state.tab = "shops"; state.route = null; renderTabs(); drawPins(); c = document.getElementById("card-" + id); }
  if (!c) { state.cats = []; state.styles = []; state.prices = []; state.q = ""; $("q").value = ""; update(); c = document.getElementById("card-" + id); }
  if (c) { markSel(); c.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: soft ? "nearest" : "center" }); }
}

function update() {
  renderFilters(); renderList(); renderTabs();
  if (state.tab === "saved") renderSaved();
  drawPins(); markSel();
}
function setCity(c) {
  if (state.city === c) return;
  state.city = c; state.area = "all"; state.route = null; state.sel = null; state.cats = []; state.styles = []; state.prices = [];
  persist(); closePop();
  renderCityToggle(); renderAreas(); renderLegend(); fitArea(false); renderRoutes(); update();
}

/* ---------- My location ---------- */
var LOC_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
var locBtn = null, watchId = null, firstFix = true, toastTimer = null;
var locLayer = L.layerGroup().addTo(map);
function toast(msg) {
  var t = $("toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 6000);
}
function refreshLists() { renderList(); if (state.tab === "saved") renderSaved(); }
function stopLocate() {
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  watchId = null; state.loc = null; locLayer.clearLayers();
  locBtn.classList.remove("on", "busy"); locBtn.setAttribute("aria-pressed", "false");
  refreshLists();
}
function onPos(p) {
  var lat = p.coords.latitude, lng = p.coords.longitude, acc = p.coords.accuracy || 0;
  state.loc = { lat: lat, lng: lng, acc: acc };
  locBtn.classList.remove("busy"); locBtn.classList.add("on"); locBtn.setAttribute("aria-pressed", "true");
  locLayer.clearLayers();
  if (acc > 0 && acc < 3000) L.circle([lat, lng], { radius: acc, color: "#2a7de1", weight: 1, opacity: 0.4, fillOpacity: 0.1, interactive: false }).addTo(locLayer);
  L.marker([lat, lng], { icon: L.divIcon({ className: "mkwrap", html: '<span class="me"></span>', iconSize: [18, 18], iconAnchor: [9, 9] }), interactive: false, keyboard: false, zIndexOffset: 3000 }).addTo(locLayer);
  if (firstFix) {
    firstFix = false;
    var c = locCity();
    if (c) {
      if (c !== state.city) setCity(c);
      state.sort = "near";
      map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { animate: !reduce });
    } else {
      var here = [lat, lng], dT = meters(here, CENTERS.tokyo), dK = meters(here, CENTERS.kyoto);
      toast("You're " + fmtDist(Math.min(dT, dK)) + " from " + (dT < dK ? "Tokyo" : "Kyoto") + ". Distances to shops will show once you're there.");
    }
  }
  refreshLists();
}
function onErr(e) {
  var msg = e && e.code === 1 ? "Location is blocked. Allow location for this site in your browser settings, then try again." : "Couldn't find your location. Try again in a moment.";
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  watchId = null; locBtn.classList.remove("busy", "on"); locBtn.setAttribute("aria-pressed", "false");
  toast(msg);
}
function toggleLocate() {
  if (watchId !== null) { stopLocate(); return; }
  if (!navigator.geolocation) { toast("This browser can't share your location."); return; }
  firstFix = true; locBtn.classList.add("busy");
  watchId = navigator.geolocation.watchPosition(onPos, onErr, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
}
var LocControl = L.Control.extend({
  options: { position: "topleft" },
  onAdd: function () {
    var b = L.DomUtil.create("button", "locbtn leaflet-control");
    b.type = "button"; b.title = "Show my location"; b.setAttribute("aria-label", "Show my location"); b.setAttribute("aria-pressed", "false");
    b.innerHTML = LOC_SVG;
    L.DomEvent.disableClickPropagation(b);
    L.DomEvent.on(b, "click", toggleLocate);
    locBtn = b; return b;
  }
});
map.addControl(new LocControl());

/* ---------- Wire up ---------- */
$("city-tokyo").addEventListener("click", function () { setCity("tokyo"); });
$("city-kyoto").addEventListener("click", function () { setCity("kyoto"); });
$("q").addEventListener("input", function (e) { state.q = e.target.value; renderList(); drawPins(); });
$("clear").addEventListener("click", function () { state.cats = []; state.styles = []; state.prices = []; state.q = ""; $("q").value = ""; update(); });
["shops", "routes", "saved"].forEach(function (t) {
  $("tab-" + t).addEventListener("click", function () {
    state.tab = t; if (t !== "routes") state.route = null;
    renderTabs(); if (t === "routes") renderRoutes(); if (t === "saved") renderSaved(); drawPins();
  });
});

renderCityToggle(); renderAreas(); renderLegend(); fitArea(false); renderRoutes(); update();
setTimeout(function () { map.invalidateSize(); }, 200);
})();
