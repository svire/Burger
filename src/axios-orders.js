import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-7289d.firebaseio.com"
});

export default instance;
//https://react-my-burger-7289d.firebaseio.com/ingredients
