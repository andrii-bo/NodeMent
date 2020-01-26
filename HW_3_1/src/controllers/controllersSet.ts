import { UserController } from './userCtl';
import express from "express";

export class ControllersSet {
    protected eapp: express.Application;
    controllers = [
        new UserController(),
    ];
    constructor(papp: express.Application) {
        this.eapp = papp;        
        this.controllers.forEach(controller => controller.initialize(papp));
    };

}
