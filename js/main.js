/* ── SHARED JS — main.js ── */

/* FLOATIES */
function initFloaties(ids) {
  var items = ids || ["🌸","💕","✨","🌷","💖","⭐","🦋","🌈","💫","🎀","🐣","🍬","💗","🥰"];
  var f = document.getElementById("floaties");
  if (!f) return;
  for (var i = 0; i < 22; i++) {
    var el = document.createElement("div");
    el.className = "floaty";
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.left = (Math.random() * 100) + "%";
    el.style.animationDuration = (8 + Math.random() * 10) + "s";
    el.style.animationDelay = (Math.random() * 12) + "s";
    el.style.fontSize = (1 + Math.random() * 1.5) + "rem";
    f.appendChild(el);
  }
}

/* CONFETTI */
function initConfetti() {
  var c = document.getElementById("confettiContainer");
  if (!c) return;
  var colors = ["#ff9eb5","#c084fc","#fde68a","#86efac","#7dd3fc","#f9a8d4","#a78bfa"];
  for (var i = 0; i < 45; i++) {
    var p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left = (Math.random() * 100) + "%";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (4 + Math.random() * 6) + "s";
    p.style.animationDelay = (Math.random() * 8) + "s";
    p.style.width = (6 + Math.random() * 8) + "px";
    p.style.height = (6 + Math.random() * 8) + "px";
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    c.appendChild(p);
  }
}

/* HEART BURST */
function launchHearts(containerId) {
  var hb = document.getElementById(containerId || "hb");
  if (!hb) return;
  var e = ["💗","💕","🌸","💖","✨","💓","🌷","💍","👑","🎂"];
  var n = 0;
  var t = setInterval(function() {
    if (n++ > 26) { clearInterval(t); return; }
    var h = document.createElement("span");
    h.className = "hf";
    h.textContent = e[Math.floor(Math.random() * e.length)];
    h.style.left = (5 + Math.random() * 90) + "%";
    h.style.bottom = "0";
    h.style.fontSize = (0.9 + Math.random() * 1.1) + "rem";
    h.style.animationDelay = (Math.random() * 0.8) + "s";
    h.style.animationDuration = (2.5 + Math.random() * 2) + "s";
    hb.appendChild(h);
    setTimeout(function() { if (h.parentNode) h.remove(); }, 5000);
  }, 200);
}

/* STAR BURST (wrong password) */
function spawnStars(parentId) {
  var card = document.getElementById(parentId || "card");
  if (!card) return;
  var emojis = ["💔","😭","🙈","❌","😤","💀","🫠","😂","🚫","😵"];
  for (var i = 0; i < 6; i++) {
    (function(idx) {
      setTimeout(function() {
        var s = document.createElement("span");
        s.className = "star";
        s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        s.style.left = (10 + Math.random() * 80) + "%";
        s.style.top = (10 + Math.random() * 55) + "%";
        card.appendChild(s);
        setTimeout(function() { if (s.parentNode) s.remove(); }, 700);
      }, idx * 80);
    })(i);
  }
}

/* PROGRESS DOTS */
function initDots(total, current) {
  var wrap = document.getElementById("progressDots");
  if (!wrap) return;
  for (var i = 0; i < total; i++) {
    var d = document.createElement("div");
    d.className = "pdot" + (i === current ? " active" : i < current ? " done" : "");
    wrap.appendChild(d);
  }
}

/* INTERSECTION OBSERVER — animate memories on scroll */
function initMemoryObserver() {
  var memories = document.querySelectorAll(".memory");
  if (!memories.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.12 });
  memories.forEach(function(m) {
    m.style.opacity = "0";
    m.style.transform = "translateY(40px)";
    m.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(m);
  });
}

/* FINALE HEART TRIGGER on scroll */
function initFinaleHearts(sectionId) {
  var section = document.getElementById(sectionId);
  if (!section) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { launchHearts("hb"); obs.disconnect(); }
    });
  }, { threshold: 0.3 });
  obs.observe(section);
}
