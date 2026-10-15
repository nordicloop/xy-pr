/* ===== XY PR - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll effect --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* --- Mobile menu toggle --- */
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Accordion --- */
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion__body');
      const content = body.querySelector('.accordion__content');
      const isActive = item.classList.contains('active');

      // Close all siblings
      item.parentElement.querySelectorAll('.accordion__item').forEach(sibling => {
        sibling.classList.remove('active');
        sibling.querySelector('.accordion__body').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-item__question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-item__answer');
      const inner = answer.querySelector('.faq-item__answer-inner');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(sibling => {
        sibling.classList.remove('active');
        sibling.querySelector('.faq-item__answer').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  /* --- Tabs --- */
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabGroup = tab.closest('.tabs');
      const container = tabGroup?.parentElement;
      const target = tab.dataset.tab;

      tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (container) {
        container.querySelectorAll('.tab-panel').forEach(panel => {
          panel.style.display = panel.dataset.panel === target ? 'block' : 'none';
        });
      }
    });
  });

  /* --- Audience Tabs --- */
  document.querySelectorAll('.audience-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tab.closest('.audience-tabs').querySelectorAll('.audience-tab')
        .forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* --- Scroll Reveal --- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  /* --- Active nav link --- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/$/, '') || '/';
    if (currentPath.endsWith(linkPath) || (linkPath !== '/' && currentPath.includes(linkPath))) {
      link.classList.add('active');
    }
  });

  /* --- Form submission --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const origText = btn.textContent;
      btn.textContent = 'Sent!';
      btn.style.background = '#2a7d4f';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        form.reset();
      }, 2500);
    });
  }
});
