export default function decorate(block) {
  // Create modal only once
  if (!document.querySelector('.info-modal')) {
    const modal = document.createElement('div');

    modal.className = 'info-modal';

    modal.innerHTML = `
      <div class="info-modal-overlay"></div>

      <div class="info-modal-content">

        <button class="modal-close">&times;</button>

        <div class="modal-body"></div>

      </div>
    `;

    document.body.append(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('show');
    });

    modal.querySelector('.info-modal-overlay').addEventListener('click', () => {
      modal.classList.remove('show');
    });
  }

  [...block.children].forEach((card) => {
    const cols = [...card.children];

    if (cols.length < 3) return;

    /* Image */

    cols[0].classList.add('card-image');

    const picture = cols[0].querySelector('picture');

    let popupContent = '';

    if (cols[3]) {
      popupContent = cols[3].innerHTML;
      cols[3].remove();
    }

    if (picture) {
  const infoBtn = document.createElement('button');

  infoBtn.className = 'info-button';
  infoBtn.textContent = 'Info';
  infoBtn.setAttribute('aria-label', 'Info');

  // Store popup content like Toyota
  infoBtn.dataset.cutline = popupContent;

  infoBtn.addEventListener('click', () => {
    const modal = document.querySelector('.info-modal');

    modal.querySelector('.modal-body').innerHTML =
      infoBtn.dataset.cutline || '';

    modal.classList.add('show');
  });

  cols[0].append(infoBtn);
}

    /* Content */

    cols[1].classList.add('card-content');

    /* Price */

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