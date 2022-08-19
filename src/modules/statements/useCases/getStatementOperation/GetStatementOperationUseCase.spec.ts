import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";


let inMemoryStatementsRepository : InMemoryStatementsRepository;
let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;
let createStatementUseCase:  CreateStatementUseCase;
let getStatementOperationUseCase : GetStatementOperationUseCase;

describe("Get Statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository);
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  });

  it("should be able to get statement", async () => {
     const user = await createUserUseCase.execute({
      name: "ELCIO",
      email: "elcio@teste.com.br",
      password: "senha123"
     });

     const user_id = user.id + "";
     const statement = await createStatementUseCase.execute({user_id, type: "deposit", amount: 150, description: "services" } as ICreateStatementDTO);
     const statement_id = statement.id + "";

     const operation = await getStatementOperationUseCase.execute({user_id, statement_id})

     expect(operation).toHaveProperty("amount");
  });

  it("should not be able to get an unexistent statement", async() =>{
     expect(async () => {
      const user = await createUserUseCase.execute({
        name: "ELCIO",
        email: "elcio@teste.com.br",
        password: "senha123"
       });

       const user_id = user.id + "";
       const operation = await getStatementOperationUseCase.execute({user_id, statement_id: "fake_Statement_id"})

     }).rejects.toBeInstanceOf(GetStatementOperationError);

  })
})
