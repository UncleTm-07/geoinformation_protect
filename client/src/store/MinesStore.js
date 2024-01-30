import {makeAutoObservable} from "mobx";
import MinesService from "../services/MinesService";

export default class MinesStore {
    mines = [];

    constructor() {
        makeAutoObservable(this);
    }

    getMinesStore() {
        return this.mines
    }

    setMines(mines) {
        this.mines = mines;
    }

    async getMines(controlPointId) {
        try {
            return await MinesService.getMines(controlPointId);
        } catch (e) {
            console.log(e);
        }
    }

}