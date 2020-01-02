import myClassApp from "./classApp";

let myApp = new myClassApp();
const PORT = 3000;

const server = myApp.myExprApp.listen(PORT, () => {
    console.log("  Press CTRL-C to stop\n");
});

export default server;