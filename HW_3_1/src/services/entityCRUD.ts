import { Request, Response } from "express";

export  abstract class dmlEntity {
    abstract add(req: Request, res: Response) :void;
    abstract get(req: Request, res: Response)  :void;       
    abstract update(req: Request, res: Response)  :void;
    abstract delete(req: Request, res: Response)  :void;
} 