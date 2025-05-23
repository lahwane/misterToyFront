import { httpService } from './http.service'

const BASE_URL = 'toy/'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
	query,
	getById,
	save,
	remove,
	getEmptyToy,
	getDefaultFilter,
	getToyLabels,
	getLabelCounts,
}

function query(filterBy = {}) {
	return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
	return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
	return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
	const method = toy._id ? 'put' : 'post'
	const routeParam = toy._id || ''

	return httpService[method](BASE_URL + routeParam, toy)
}

function getDefaultFilter() {
	return {
		txt: '',
		inStock: null,
		labels: [],
		pageIdx: 0,
		sortBy: { type: '', sortDir: 1 },
	}
}

function getEmptyToy() {
	return {
		name: '',
		price: '',
		labels: _getRandomLabels(),
	}
}

function getToyLabels() {
	return [...labels]
}

function _getRandomLabels() {
	const labelsCopy = [...labels]
	const randomLabels = []
    
	for (let i = 0; i < 2; i++) {
		const randomIdx = Math.floor(Math.random() * labelsCopy.length)
		randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
	}
	return randomLabels
}

function getLabelCounts() {
	return query().then(({ toys }) => {
		const labelCounts = {}

		toys.forEach(toy => {
			toy.labels.forEach(label => {
				if (labelCounts[label]) {
					labelCounts[label]++
				} else {
					labelCounts[label] = 1
				}
			})
		})
		const labelCountArray = Object.entries(labelCounts).map(([label, count]) => ({
			label,
			count,
		}))
		return labelCountArray
	})
}
