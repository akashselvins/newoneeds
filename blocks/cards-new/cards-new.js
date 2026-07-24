export default function decorate(block) {
  // Create popup only once
  let modal = document.querySelector('.info-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'info-modal';

    modal.innerHTML = `
      <div class="info-modal-overlay"></div>

      <div class="info-modal-content">
        <button class="modal-close" aria-label="Close">&times;</button>

        <div class="modal-body"></div>
      </div>
    `;

    document.body.append(modal);

    const closeModal = () => {
      modal.classList.remove('show');
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.info-modal-overlay').addEventListener('click', closeModal);
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

      // Store popup text like Toyota
      infoBtn.dataset.cutline = popupContent;

      infoBtn.addEventListener('click', () => {
        modal.querySelector('.modal-body').innerHTML =
          infoBtn.dataset.cutline || '';

        modal.classList.add('show');
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