import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import axios from "axios"

export const Login = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [resp, setResp] = useState("");

	const handlerNavigate = (e) => {
		e.preventDefault()
		navigate("/registro")
	}

	async function handlerSubmit(e) {
		e.preventDefault()

		let logged = await actions.login(email, password)

		if (logged) {
			navigate('/')
			actions.getProfile()
		} else {
			setEmail("");
			setPassword("");
			// email === "" || password === "" ?  console.log("te falta algo") : null
			email === "" || password === "" ? setResp(<p>Debes rellenar todos los campos</p>) : null
		}
		console.log(store.info_productor);
		console.log(store.is_productor);

	};

	// useEffect(() => {

	// 	actions.getProfile();


	// }, []);


	return (
		<div className=" text-center bg-success bg-opacity-25 pb-3" style={{ minHeight: '80vh' }}>

			<h1 id="log">De la huerta</h1>

			<form onSubmit={handlerSubmit} className="col-3 m-auto pb-3">

				<div className="form-group my-4">
					{/* <label>Email</label> */}
					
					<input
						type="email"
						value={email}
						className="form-control"
						placeholder="Introduzca su email"
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					{/* <label>Password</label> */}
					<input
						type="password"
						value={password}
						className="form-control"
						placeholder="Introduzca su contraseña"
						onChange={e => setPassword(e.target.value)}
					/>
				</div>

				{resp}
				{resp === "" ? store.respuesta_log : null}

				<button type="submit" className="btn btn-submit mt-5 form-control col-4 fw-bold text-white fs-5">
					Iniciar sesión
				</button>



			</form>

			<div className="col-3" id="custom-hr"></div>

			<button className="btn btn-primary mt-3 mb-3 form-control col-4 fw-bold text-white fs-5" id="btn-nu" onClick={handlerNavigate}>
				Nuevo usuario
			</button>

			{/* <a href="#" className="link-primary text-decoration-none" onClick={handlerNavigate}>Nuevo usuario</a> */}



		</div>
	);
};
