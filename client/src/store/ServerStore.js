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

    async getServerWithAttribute(api) {
        try {
            return await ServerService.getServer(api);
        } catch (e) {
            console.log(e);
        }
    }

}