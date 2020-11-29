export function removeCategory(categories, categoryID) {
  return categories.filter(c => c.id !== categoryID)
}

export function saveCategory(categories, {category, rollback}) {
  const _categories = [...categories]
  const isEdit = !!category.id

  if (rollback) _categories.push({...category})
  else if (isEdit) {
    const index = _categories.findIndex(w => w.id === category.id)
    _categories[index] = {...category}
  } else {
    _categories.push({...category, id: _categories.length})
  }

  return _categories
}
