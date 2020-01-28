import { UserController } from './userCtl';
import express from "express";
import { DatabaseProvider } from 'database';
import { Controller } from './controller';

export class ControllersSet {
    protected expApp: express.Application;
    protected db: DatabaseProvider;
    protected controllers: Controller[] = [];

    constructor(expApp: express.Application, db: DatabaseProvider) {
        this.expApp = expApp;
        this.db = db;
        this.controllers.push(new UserController(expApp, db));
    };

}
