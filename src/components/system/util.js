import axios from "axios";
import qs from "querystring";


export function post_query(api, obj )
{
    const url = '/api/' + api;

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    // 쿼리문 쏘기! stringify 로 json string 으로 변환한다.
    return axios.post(url, qs.stringify( obj ), config);
}
