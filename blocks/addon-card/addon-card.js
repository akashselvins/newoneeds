export default function decorate(block) {
  const row = block.firstElementChild;

  if (!row) return;

  const [left, middle, right] = [...row.children];

  left.classList.add('left-content');
  middle.classList.add('middle-content');
  right.classList.add('right-content');
}