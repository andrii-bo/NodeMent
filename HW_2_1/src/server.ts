import App from "./classApp";

let myApp = new App();
const PORT = 3000;

const server = myApp.app.listen(PORT, () => {
    console.log("  Press CTRL-C to stop\n");
});

export default server;