import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import * as service from "../../service";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Button from "../../components/Button";
import logo from "../../images/black_logo.svg";
import styles from "./styles.module.scss";

const months = [
	{ name: "January", value: "01" },
	{ name: "February", value: "02" },
	{ name: "March", value: "03" },
	{ name: "April", value: "04" },
	{ name: "May", value: "05" },
	{ name: "June", value: "06" },
	{ name: "July", value: "07" },
	{ name: "August", value: "08" },
	{ name: "September", value: "09" },
	{ name: "October", value: "10" },
	{ name: "November", value: "11" },
	{ name: "December", value: "12" },
];

const genders = ["male", "female", "non-binary"];
const userTypes = ["artist", "listener"];
const api = axios.create({
	withCredentials: true
});

const SignUp = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		month: "",
		year: "",
		date: "",
		gender: "",
		userType: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().min(5).max(10).required().label("Name"),
	};
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			try {
				setIsFetching(true);
				service.signup(data).then(() => navigate('/')).catch(e => alert(e));
				setIsFetching(false);
				toast.success("Account created successfully");
				navigate("/login");
			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error(error.response.data);
				} else {
					console.log(error);
					toast.error("Something went wrong!");
				}
			}
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img src={logo} alt="logo" />
			</div>
			<h1 className={styles.heading}>Sign up for free to start listening.</h1>

			<form onSubmit={handleSubmit} className={styles.form_container}>
				<h2 className={styles.form_heading}>Sign up with your email address</h2>
				<div className={styles.input_container}>
					<TextField
						label="What's your email?"
						placeholder="Enter your email"
						name="email"
						handleInputState={handleInputState}
						schema={schema.email}
						handleErrorState={handleErrorState}
						value={data.email}
						error={errors.email}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Create a password"
						placeholder="Create a password"
						name="password"
						handleInputState={handleInputState}
						schema={schema.password}
						handleErrorState={handleErrorState}
						value={data.password}
						error={errors.password}
						type="password"
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="What should we call you?"
						placeholder="Enter a profile name"
						name="name"
						handleInputState={handleInputState}
						schema={schema.name}
						handleErrorState={handleErrorState}
						value={data.name}
						error={errors.name}
						required={true}
					/>
				</div>
				<div className={styles.date_of_birth_container}>
					<p>What's your date of birth?</p>
					<div className={styles.date_of_birth}>
						<div className={styles.month}>
							<Select
								name="month"
								handleInputState={handleInputState}
								label="Month"
								placeholder="Months"
								options={months}
								value={data.month}
								required={true}
							/>
						</div>
						<div className={styles.date}>
							<TextField
								label="Date"
								placeholder="DD"
								name="date"
								value={data.date}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						<div className={styles.year}>
							<TextField
								label="Year"
								placeholder="YYYY"
								name="year"
								value={data.year}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
					</div>
				</div>
				<div className={styles.input_container}>
					<Radio
						label="What's your gender?"
						name="gender"
						handleInputState={handleInputState}
						options={genders}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<Radio
						label="What type of user are you?"
						name="userType"
						handleInputState={handleInputState}
						options={userTypes}
						required={true}
					/>
				</div>
				<p className={styles.terms_condition}>
					By clicking on sign-up, you agree to Spotify's{" "}
					<a href="/#">Terms and Conditions of Use.</a>
				</p>
				<div className={styles.submit_btn_wrapper}>
					<Button label="Sign Up" type="submit" isFetching={isFetching} />
				</div>
				<p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
					Have an account? <Link to="/login"> Log in.</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
