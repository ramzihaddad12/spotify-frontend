import styles from "./styles.module.scss";

const Button = ({ label }) => {
	return (
		<button className={styles.primary_btn}>
				{label}
		</button>
	);
};

export default Button;
