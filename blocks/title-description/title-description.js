/**
 * Title Description block
 * Exports a default async `decorate` function that ensures a title and description
 * exist and applies the block class for styling.
 * @param {Element} block
 */
export default async function decorate(block) {
  block.classList.add('title-description');

  // Ensure there's a heading — prefer existing h1/h2/h3, otherwise create one
  let title = block.querySelector('h1, h2, h3');
  if (!title) {
    title = document.createElement('h2');
    title.textContent = 'Title';
    block.prepend(title);
  }

  // Ensure there's a paragraph description
  let desc = block.querySelector('p');
  if (!desc) {
    desc = document.createElement('p');
    desc.textContent = 'A short description goes here.';
    block.append(desc);
  }

  // Move any stray text nodes into the description if paragraph is empty
  if (desc && !desc.textContent.trim()) {
    const text = Array.from(block.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      .map(n => n.textContent.trim())
      .join(' ');
    if (text) desc.textContent = text;
  }
}
