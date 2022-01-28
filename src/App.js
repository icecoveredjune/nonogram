import React from 'react';
import styles from './App.module.css';
import Nonogram from "./components/Nonogram";
import {useSelector} from "react-redux";
import {squares} from "./consts";

function App() {
	/*const squaresMarkup = useSelector(state => state.app.squares);*/

	return (
		<div className={styles.App}>
			<Nonogram squaresMarkup={squares} />
		</div>
	);
}

export default App;
