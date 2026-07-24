export default function decorate(block) {
  // Create popup only once
  if (!document.querySelector('.tcom-cutline-info')) {
    const popup = document.createElement('section');

    popup.className = 'tcom-cutline-info';

    popup.innerHTML = `
      <button class="btn-close" aria-label="Close">
        ✕
      </button>

      <div class="content-wrapper">
        <div class="content"></div>
      </div>
    `;

    document.body.append(popup);

    popup.querySelector('.btn-close').addEventListener('click', () => {
      popup.classList.remove('is-open');
    });
  }

  [...block.children].forEach((card) => {
    const cols = [...card.children];

    if (cols.length < 3) return;

    /* ---------------- IMAGE ---------------- */

    cols[0].classList.add('card-image');

    const picture = cols[0].querySelector('picture');

    /* ---------------- POPUP CONTENT ---------------- */

    let popupContent = '';

    if (cols.length > 3) {
      popupContent = cols[3].innerHTML.trim();
      cols[3].remove();
    }

    /* ---------------- INFO BUTTON ---------------- */

    if (picture) {
      const infoBtn = document.createElement('button');

      infoBtn.className = 'info-button';
      infoBtn.textContent = 'Info';
      infoBtn.setAttribute('aria-label', 'Info');

      // Same approach Toyota uses
      infoBtn.dataset.cutline = popupContent;

      infoBtn.addEventListener('click', () => {
        const popup = document.querySelector('.tcom-cutline-info');

        popup.querySelector('.content').innerHTML =
          infoBtn.dataset.cutline;

        popup.classList.add('is-open');
      });

      cols[0].append(infoBtn);
    }

    /* ---------------- CONTENT ---------------- */

    cols[1].classList.add('card-content');

    /* ---------------- PRICE ---------------- */

    cols[2].classList.add('card-price');

    const p = cols[2].querySelector('p');

    if (p) {
      p.innerHTML = p.innerHTML.replace(
        /(\$\d+)/,
        '<span class="price">$1</span>',
      );
    }
  });
}