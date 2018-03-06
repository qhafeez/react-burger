import axios from "axios";

const axiosInstance = axios.create({

	baseURL: "https://react-q-burger.firebaseio.com/"

});


export default axiosInstance;