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

    async getMines() {
        try {
            return await MinesService.getMines();
        } catch (e) {
            console.log(e);
        }
    }

}