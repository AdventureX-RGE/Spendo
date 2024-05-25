import {DataSource} from "typeorm";
import {User} from "./entity/User";
import {Record} from "./entity/Record";

export const ServerDataSource = new DataSource({
    type: "postgres",
    host: "hkg1.clusters.zeabur.com",
    port: 32306,
    username: "root",
    password: "iKNqS2duB0H4C9YF7T1LW56hyZltnX38",
    database: "spendo",
    synchronize: true,
    logging: false,
    entities: [User, Record]
})