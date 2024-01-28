import axios from 'axios';
import {API_URL} from "../app/provider";

export default class MinesService {
    static async getMines() {
        return axios.get(`${API_URL}/mines_data`)
    }
}