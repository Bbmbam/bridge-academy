// ===== Bridge Classroom - สคริปต์กลางที่ทุกหน้าใช้ร่วมกัน =====
document.addEventListener('DOMContentLoaded', () => {

  // 1) ปุ่มเมนู ☰ บนมือถือ
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('navLinks');

  function closeMenu() {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    // ปิดเมนูเมื่อกดลิงก์ กด Esc หรือกดที่อื่นนอกเมนู
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => {
      if (!e.target.closest('.navbar')) closeMenu();
    });
  }

  // 2) ไฮไลต์เมนูของหน้าที่เปิดอยู่
  const clean = p => p.replace(/index\.html$/, '');
  const here = clean(location.pathname);
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (clean(new URL(a.href).pathname) === here) a.setAttribute('aria-current', 'page');
  });

  // 3) แถบ "ฝึกต่อ" (มีเฉพาะหน้าแรก)
  const box = document.getElementById('continue');
  if (box) {
    try {
      const last = JSON.parse(localStorage.getItem('lastPractice'));
      if (last) {
        document.getElementById('continueText').textContent =
          `คุณฝึกค้างไว้: ${last.topic} (${last.done}/${last.total} ข้อ)`;
        document.getElementById('continueLink').href = last.url;
        box.hidden = false;
      }
    } catch (e) { /* ข้อมูลเสีย ไม่ต้องแสดงแถบ */ }
  }
});
