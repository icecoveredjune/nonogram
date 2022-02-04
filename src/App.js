import React from 'react';
import styles from './App.module.css';
import Nonogram from "./components/Nonogram";

const App = () => {
	return (
		<div className={styles.App}>
			<Nonogram />
		</div>
	);
}

export default App;
