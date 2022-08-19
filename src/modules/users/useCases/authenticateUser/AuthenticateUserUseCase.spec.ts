import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let inMemoryUsersRepository : InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase : CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticte an user", async () => {
    const user = await createUserUseCase.execute({
      name: "ELCIO",
      email: "elcio@teste.com.br",
      password: "senha123"
     });

     const session = await authenticateUserUseCase.execute({
       email : "elcio@teste.com.br",
       password: "senha123"
     });



     expect(session).toHaveProperty("token");
  });

  it("should not be able to authenticte with incorret password", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "ELCIO",
        email: "elcio@teste.com.br",
        password: "senha123"
      });

      const session = await authenticateUserUseCase.execute({
        email : "elcio@teste.com.br",
        password: "errado"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it("should not be able to authenticte with incorret email", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "ELCIO",
        email: "elcio@teste.com.br",
        password: "senha123"
      });

      const session = await authenticateUserUseCase.execute({
        email : "elcio_errado@teste.com.br",
        password: "senha123"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });


});
