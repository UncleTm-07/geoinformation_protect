import {makeAutoObservable} from "mobx";
import ServerService from "../services/ServerService";

export default class ServerStore {
    servers = [];

    constructor() {
        makeAutoObservable(this);
    }

    getServerStore() {
        return this.servers
    }

    setServers(servers) {
        this.servers = servers;
    }

    async getServer() {
        try {
            return await ServerService.getServer();
        } catch (e) {
            console.log(e);
        }
    }

    async editServer(server) {
        try {
            return await ServerService.editServer(server);
        } catch (e) {
            console.log(e);
        }
    }

}