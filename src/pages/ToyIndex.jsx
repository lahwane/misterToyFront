import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadToys, removeToyOptimistic, setFilter } from '../store/actions/toy.actions'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer'

import { Loader } from '../cmps/Loader'
import { PaginationButtons } from '../cmps/PaginationButtons'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function ToyIndex() {
	const toys = useSelector(storeState => storeState.toyModule.toys)
	const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
	const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
	const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)

	const dispatch = useDispatch()

	useEffect(() => {
		loadToys().catch(err => {
			console.log('err:', err)
			showErrorMsg('Cannot load toys')
		})
	}, [filterBy])

	function onRemoveToy(toyId) {
		removeToyOptimistic(toyId)
			.then(() => {
				loadToys()
				showSuccessMsg('Toy removed')
			})
			.catch(err => {
				console.log('Cannot remove toy', err)
				showErrorMsg('Cannot remove toy')
			})
	}

	function onSetFilter(filterBy) {
		setFilter(filterBy)
	}

	function onChangePageIdx(diff) {
		let pageIdx = +filterBy.pageIdx + diff

		if (pageIdx < 0) pageIdx = maxPage - 1
		if (pageIdx >= maxPage) pageIdx = 0

		dispatch({ type: SET_FILTER_BY, filterBy: { pageIdx } })
	}

	return (
		<section className="toy-index">
			<ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

			<div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
				<button style={{ marginInline: 0 }}>
					<Link to="/toy/edit">Add Toy</Link>
				</button>
			</div>
            
			{isLoading && <Loader />}
			{!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
			{!!toys.length && maxPage > 1 && <PaginationButtons pageIdx={filterBy.pageIdx} onChangePageIdx={onChangePageIdx} />}
		</section>
	)
}
