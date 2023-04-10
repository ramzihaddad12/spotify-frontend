import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import * as service from "../../auth-service";
import { useNavigate } from "react-router-dom";

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
const userTypes = ["artist", "listener"];


const genders = ["male", "female", "non-binary"];

const EditProfile = () => {
	const [user, setUser] = useState(null);
	const [data, setData] = useState({
		name: "",
		month: "",
		year: "",
		date: "",
		gender: "",
	});

	const navigate = useNavigate();
	const [errors, setErrors] = useState({});

	const handleInputState = (name, value) => {
		console.log("handleInputState")
		console.log(name);
		console.log(value);
		setData({ ...data, [name]: value });
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

	const schema = {
		name: Joi.string().min(5).max(10).required().label("Name"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { ...data, _id: user._id };
		console.log("payload");
		console.log(payload)
		const res = await service.updateUser(user._id, payload);
		navigate('/')
	};
	async function fetchUser() {
		try {
			const response = await service.profile();
			setUser(response);
		} catch (err) {
			console.error(err);
		}
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setData(data => ({ ...data, [name]: value }));
	};

	async function fetchFormData() {
		console.log("user");
		console.log(user);
		if (user) {
			const dk = {
				name: user.name,
				month: user.month,
				year: user.year,
				date: user.date,
				gender: user.gender,
				userType: user.userType,

			};
			setData(dk);
		}
	}

	useEffect(() => {
		async function fetchData() {
			await fetchUser();
		}

		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			if (user) {
				await fetchFormData();
			}
		}

		fetchData();
	}, [user]);


	return (
		<div className={styles.container}>
			<h1>Profile</h1>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				<div className={styles.input_container}>
					<TextField
						label="What's your email?"
						placeholder="Enter your email"
						value={user ? user.email : ""}
						required={true}
						disabled={true}
						style={{ color: "red" }}
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
						onChange={handleInputChange}
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
								onChange={handleInputChange}
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
								onChange={handleInputChange}
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
								onChange={handleInputChange}
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
						onChange={handleInputChange}
						options={genders}
						value={data.gender}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<Radio
						label="What type of user are you?"
						name="userType"
						value={data.userType}
						onChange={handleInputChange}
						handleInputState={handleInputState}
						options={userTypes}
						required={true}
					/>
				</div>
				<div className={styles.submit_btn_wrapper}>
					<Button
						label="Update"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
