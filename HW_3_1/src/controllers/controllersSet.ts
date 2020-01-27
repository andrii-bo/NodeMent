import { UserController } from './userCtl';
import express from "express";
import { DatabaseProvider } from 'database';

export class ControllersSet {
    protected expApp: express.Application;
    protected db: DatabaseProvider;
    controllers = [
        new UserController(this.expApp,this.db)
    ];
    constructor(papp: express.Application,db:DatabaseProvider) {
        this.expApp = papp;  
        this.db = db;        
    };

}
