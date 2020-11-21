export function removeCategory(categories, categoryID) {
  return categories.filter(c => c.id !== categoryID)
}

export function saveCategory(categories, newCategory) {
  const _categories = [...categories]
  const isEdit = !!newCategory.id

  if (isEdit) {
    const index = _categories.findIndex(w => w.id === newCategory.id)
    _categories[index] = {...newCategory, disabled: true}
  } else {
    _categories.push({...newCategory, id: _categories.length, disabled: true})
  }

  return _categories
}
