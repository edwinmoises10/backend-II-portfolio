
import handlebars from "express-handlebars"

export const viewsMotor = (server) => {
    server.engine("handlebars", handlebars.engine());
    server.set("views", `${process.cwd()}/src/views`);
    server.set("view engine", "handlebars");

}
