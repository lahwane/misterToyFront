import './assets/style/main.css'

import { Provider } from 'react-redux'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { UserMsg } from './cmps/UserMsg'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'

import { store } from './store/store'

import { AboutUs } from './pages/AboutUs'
import { HomePage } from './pages/HomePage'
import { ToyDashboard } from './pages/ToyDashboard'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { ToyIndex } from './pages/ToyIndex'

export function App() {
	return (
		<Provider store={store}>
			<Router>
				<section className="main-layout app">
					<AppHeader />
					<main>
						<Routes>
							<Route element={<HomePage />} path="/" />
							<Route element={<AboutUs />} path="/about" />
							<Route element={<ToyDashboard />} path="/dashboard" />
							<Route element={<ToyIndex />} path="/toy" />
							<Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
							<Route element={<ToyDetails />} path="/toy/:toyId" />
						</Routes>
					</main>
					<AppFooter />
				</section>
			</Router>
			<UserMsg />
		</Provider>
	)
}
