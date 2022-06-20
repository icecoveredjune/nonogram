import styles from './Modal.module.css';

const Modal = (props) => {

	return (
		<div className={`${styles.modal} ${props.visible ? styles.visible : ''}`}>
			<div className={`${styles.content}`}>
				{props.children}
			</div>
		</div>
	);
};
export default Modal;