import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";



let inMemoryStatementsRepository : InMemoryStatementsRepository;
let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;
let getBalanceUseCase : GetBalanceUseCase;

describe("Get Balance", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository,inMemoryUsersRepository)
  });

  it("should be able to get a balance of an user", async () => {
     const user = await createUserUseCase.execute({
      name: "ELCIO",
      email: "elcio@teste.com.br",
      password: "senha123"
     });

     const user_id = user.id + "";
     const balance = await getBalanceUseCase.execute({user_id});

     expect(balance).toHaveProperty("balance");
  });

  it("should not be able to get a balance of an unexistent user", async() =>{
     expect(async () => {
      const balance = await getBalanceUseCase.execute({user_id: "unexistent"});

     }).rejects.toBeInstanceOf(GetBalanceError);

  })
})
