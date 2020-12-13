import { Resolver ,Query } from 'type-graphql'

@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "Hello there!"
    }
}

@Resolver()
export class ByeResolver {
    @Query(() => String)
    bye() {
        return "Bye there!"
    }
}