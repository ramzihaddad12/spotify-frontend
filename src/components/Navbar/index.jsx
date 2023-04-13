import { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import * as service from "../../service"
const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const user = useSelector((state) => state.user);

	const navigate = useNavigate();

	const handleLogout = async () => {
		await service.logout();
		navigate('/login')
	};

	const handleLogin = async () => {
		navigate('/login')
	};


	return (
		<div className={styles.container}>
			<div className={styles.left}>
				{/*<div className={styles.icon} onClick={() => {*/}
				{/*	// history.goBack()*/}
				{/*}}>*/}
				{/*	<ArrowBackIosRoundedIcon />*/}
				{/*</div>*/}
				{/*<div className={styles.icon} onClick={() => {*/}
				{/*	// history.goForward()*/}
				{/*}}>*/}
				{/*	<ArrowForwardIosRoundedIcon />*/}
				{/*</div>*/}
				{/*<Button label={"Create Playlist"}/>*/}
				{/*<Button label={"Playlists"}/>*/}
			</div>
			<div className={styles.right}>
				<div
					style={{ backgroundColor: `${menu ? "#282828" : "#000"}` }}
					className={styles.profile_menu}
					onClick={() => setMenu(!menu)}
				>
					<AccountCircleIcon />
					<p className={styles.name_display}>{user && user.name}</p>
					{menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
				</div>
			</div>
			{menu && (
				<ClickAwayListener onClickAway={() => setMenu(false)}>
					<div className={styles.menu} onClick={() => setMenu(false)}>
						{user && (<Link to="/profile">
							<div className={styles.options}>
								<p>Profile</p>
								<PersonIcon />
							</div>
						</Link>)
						}
						<div className={styles.options}>
							<p>Settings</p>
							<SettingsIcon />
						</div>
						{user ? (<div className={styles.options} onClick={handleLogout}>
							<p>Logout</p>
							<LogoutIcon/>
							</div>) :
							(<div className={styles.options} onClick={handleLogin}>
							<p>Login</p>
							<LogoutIcon />
							</div>)
						}

					</div>
				</ClickAwayListener>
			)}
		</div>
	);
};

export default Navbar;
