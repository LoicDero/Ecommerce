import { environment } from "src/environments/environment";

const port_en_production = 15042

const BASE_URL = environment.production ? 'https://wethepast.herokuapp.com:' + port_en_production : 'http://localhost:5000';


environment.production? console.log("en prod sur :", port_en_production) : console.log("pas prod")

export const SHOES_URL = BASE_URL + '/api/shoes';
export const SHOES_TAGS_URL = SHOES_URL + '/tags';
export const SHOES_BY_SEARCH_URL = SHOES_URL + '/search/';
export const SHOES_BY_TAG_URL = SHOES_URL + '/tag/';
export const SHOES_BY_ID_URL = SHOES_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
