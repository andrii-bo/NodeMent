public processRoutes(): void {
    this.expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    this.expApp
      .route("/user")
      .get((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Read)
      )
      .post((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Create)
      );

      this.expApp
      .route("/user/:id")
      .get((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Read)
      )
      .put((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Update)
      )
      .delete((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Delete)
      );

  }