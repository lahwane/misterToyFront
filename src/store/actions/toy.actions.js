import { toyService } from '../../services/toy.service'
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_MAX_PAGE, SET_TOYS, TOY_UNDO, UPDATE_TOY } from '../reducers/toy.reducer'
import { store } from '../store'

export function loadToys() {
	const { filterBy } = store.getState().toyModule

	store.dispatch({ type: SET_IS_LOADING, isLoading: true })

	return toyService.query(filterBy)
		.then(({ toys, maxPage }) => {
			store.dispatch({ type: SET_TOYS, toys })
			store.dispatch({ type: SET_MAX_PAGE, maxPage })
		})
		.catch(err => {
			console.log('toy action -> Cannot load toys')
			throw err
		})
		.finally(() => {
			setTimeout(() => {
				store.dispatch({ type: SET_IS_LOADING, isLoading: false })
			}, 250)
		})
}

export function removeToy(toyId) {
	return toyService.remove(toyId)
		.then(() => {
			store.dispatch({ type: REMOVE_TOY, toyId })
		})
		.catch(err => {
			console.log('toy action -> Cannot remove toy', err)
			throw err
		})
}

export function removeToyOptimistic(toyId) {
	store.dispatch({ type: REMOVE_TOY, toyId })
	return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
	const type = toy._id ? UPDATE_TOY : ADD_TOY
    
	return toyService.save(toy)
		.then(toyToSave => {
			store.dispatch({ type, toy: toyToSave })
			return toyToSave
		})
		.catch(err => {
			console.log('toy action -> Cannot save toy', err)
			throw err
		})
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
	store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
