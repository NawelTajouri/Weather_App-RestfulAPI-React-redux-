import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";

import reducers from "./reducers/reducer";
import WeatherInfo from "./reducers/weatherReducer";
const middleware = applyMiddleware(thunk);
const store = createStore(WeatherInfo, middleware);
export default store;