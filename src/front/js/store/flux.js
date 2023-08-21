// import axios from "axios"
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

			// OBTENER TODOS LOS PRODUCTORES

			getProductores: () => {
				fetch("https://ominous-spork-g4x4x774557c9x46-3001.app.github.dev/", {
					method: "GET"
				})
				.then(res => res.json())
				.then(data => setStore({ productores: data.results}))
		
				.catch(err => console.error(err))
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
