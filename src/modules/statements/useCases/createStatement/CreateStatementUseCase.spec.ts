import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";


let inMemoryStatementsRepository : InMemoryStatementsRepository;
let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;
let createStatementUseCase:  CreateStatementUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository);
  });

  it("should be able to create a new statement", async () => {
     const user = await createUserUseCase.execute({
      name: "ELCIO",
      email: "elcio@teste.com.br",
      password: "senha123"
     });

     const user_id = user.id + "";
     const statement = await createStatementUseCase.execute({user_id, type: "deposit", amount: 150, description: "services" } as ICreateStatementDTO);

     expect(statement).toHaveProperty("id");
  });

  it("should not be able to create an withdraw without founds", async() =>{
     expect(async () => {
      const user = await createUserUseCase.execute({
        name: "ELCIO",
        email: "elcio@teste.com.br",
        password: "senha123"
       });

       const user_id = user.id + "";
       await createStatementUseCase.execute({user_id, type: "withdraw", amount: 30, description: "groceries" } as ICreateStatementDTO);

     }).rejects.toBeInstanceOf(CreateStatementError);

  })
})
