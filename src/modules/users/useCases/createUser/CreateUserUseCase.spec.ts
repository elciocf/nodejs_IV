import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";


let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
     const user = await createUserUseCase.execute({
      name: "ELCIO",
      email: "elcio@teste.com.br",
      password: "senha123"
     });

     expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with an email that already exists", async() =>{
     expect(async () => {
          const user = {
            name: "ELCIO",
            email: "elcio@teste.com.br",
            password: "senha123"
        };

        await createUserUseCase.execute(user);
        await createUserUseCase.execute(user);
     }).rejects.toBeInstanceOf(CreateUserError);

  })
})
