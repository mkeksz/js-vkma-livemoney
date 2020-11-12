export function getTitle(isNew, category) {
  return isNew ? 'Новая категория' : category.title
}

export function getType(isNew) {
  return isNew ? 'new' : 'category'
}
