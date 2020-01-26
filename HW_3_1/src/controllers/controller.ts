import express from "express";

export interface Controller {
    initialize(expApp: express.Application): void;
}
