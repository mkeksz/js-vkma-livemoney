import {useSelector} from 'react-redux'


export function useCategories(type) {
  return useSelector(({categories}) => {
    return categories.filter(cat => cat.type === type)
  })
}
