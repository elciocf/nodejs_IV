import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";



let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;
let showUserProfileUseCase : ShowUserProfileUseCase;

describe("Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be show a user profile", async () => {
     const user = await createUserUseCase.execute({
      name: "ELCIO",
      email: "elcio@teste.com.br",
      password: "senha123"
     });

     const user_id = user.id + "";

     const profile = await showUserProfileUseCase.execute(user_id);

     expect(profile).toHaveProperty("id");
  });

  it("should not be able to show an profile of a unexistent user", async() =>{
     expect(async () => {
        await showUserProfileUseCase.execute("unexistent");
     }).rejects.toBeInstanceOf(ShowUserProfileError);

  })
})
