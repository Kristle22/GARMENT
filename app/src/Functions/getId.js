function getId(key) {
  let id = localStorage.getItem(key);
  if (null === id) {
    id = 1;
    localStorage.setItem(key, 1);
    return 1;
  }
  id = parseInt(id);
  id++;
  localStorage.setItem(key, id);
  return id;
}

export default getId;