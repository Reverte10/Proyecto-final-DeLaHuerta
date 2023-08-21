import axios from "axios"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			productores: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			log: false
		},
		actions: {
			
			
			

			registro: async (nombre, apellido, password, email, direccion, telefono, codigo_postal, comunidad_autonoma_id, provincia_id) => {

				try {

					let data = await axios.post('https://ideal-spoon-pxgr5jxjr96c4x9-3001.app.github.dev/api/registro',{
					nombre : nombre,
					apellido : apellido,
					password : password,
					email : email,
					direccion : direccion,
					telefono : telefono,
					codigo_postal : codigo_postal,
					comunidad_autonoma_id : comunidad_autonoma_id,
					provincia_id : provincia_id

					})

					console.log(data);

					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},

		// -------------------------- LOG IN & LOG OUT --------------------------
			logout: () => {
				localStorage.removeItem("token")
				setStore({log:false})

				return false
			},

			login: async (dataEmail,dataPassword) => {

				try {

					let data = await axios.post('https://vigilant-space-waddle-x6467v5jqr5c66p6-3001.app.github.dev/login',{

						email:dataEmail,

						password:dataPassword

					})

					console.log(data);

					localStorage.setItem("token",data.data.access_token)

					setStore({token:data.data.access_token})

					return true;

				} catch (error) {

					console.log(error);

					return false;

				}
			},









			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
