import axios from 'axios';
import {API_URL} from "../app/provider";

export default class ServerService {
    static async getServer() {
        return axios.get(`${API_URL}/control_points`)
    }

    static async editServer(server) {
        return axios.put(`${API_URL}/control_points/${server.id}`, {...server})
    }
}