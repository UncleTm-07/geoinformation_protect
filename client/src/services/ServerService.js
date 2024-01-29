import axios from 'axios';
import {API_URL} from "../app/provider";

export default class ServerService {
    static async getServer(api) {
        return axios.get(`${API_URL}/control_points?api=${api}`)
    }
}