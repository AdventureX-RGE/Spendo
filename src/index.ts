import {Elysia, t} from "elysia";
import {cors} from '@elysiajs/cors'
import {ServerDataSource} from "./data-source";
import {Role, User} from "./entity/User";
import {MD5} from 'crypto-js'


ServerDataSource
    .initialize()
    .then(() => {console.log("Data Source Successfully Init")})
    .catch((e) => {console.log(`Data Source Init with Error: ${e}`)})

const userRepository = ServerDataSource.getRepository(User)


const app = new Elysia()
    .use(cors())
    .get("/", () => ({status: true}))
    .post("/users/signup", async ( {body}) => {
        const newUser = new User()
        newUser.name = body.name
        newUser.password = MD5(body.password).toString()
        const currentUserNumber = await userRepository.count()
        if (currentUserNumber == 0) { newUser.role = Role.ADMIN } else { newUser.role = Role.USER }
        await userRepository.save(newUser)
        return {
            "id": newUser.id,
            "name": newUser.name,
            "role": newUser.role,
        }
        },
        {
            body: t.Object({
                name: t.String(),
                password: t.String(),
            })
        })

    .post("/users/login", async ( {set, body}) => {
        const firstUser = await userRepository.findOneBy({
            name: body.name,
        })

        if (!firstUser) {
            set.status = 401
            throw new Error("Cannot find the user")
        }

        if (MD5(body.password).toString() == firstUser.password) {
            return {
                 "id": firstUser.id,
                "name": firstUser.name,
                "role": firstUser.role,
            }
        }
        else {
            set.status = 401
            throw new Error("Password does not match")
        }
        }, {
            body: t.Object({
                name: t.String(),
                password: t.String(),
            })
        })
    .listen(Bun.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

