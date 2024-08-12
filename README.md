# Project ATM

## Features

- **Spring Boot Backend:** Robust backend built with Spring Boot, providing RESTful APIs for user and account management.
- **React Frontend:** A dynamic and responsive frontend application built using React, styled with Bootstrap for a modern UI.
- **PostgreSQL & H2 Databases:** Utilizes PostgreSQL for production and H2 in-memory database for testing, ensuring reliable data management.
- **Dockerized Setup:** Seamlessly deployable via Docker containers, simplifying environment setup and deployment.
- **Cross-Origin Resource Sharing (CORS):**
  - Configured CORS to allow the frontend and backend to communicate securely across different origins.
  - **Specific CORS Configuration:**
    - **Controllers:** 
      - `@CrossOrigin("http://67.207.86.85:3000")` in `AccountController` and `UserController` allows requests from the specified frontend domain.
    - **Global CORS Configuration:**
      - The `CorsConfig` class globally configures CORS settings to allow all origins and methods, facilitating development and testing.
      - **Example CORS Configuration:**
        ```java
        @Configuration
        public class CorsConfig implements WebMvcConfigurer {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*");
            }
        }
        ```
  - Customizable CORS settings to restrict or allow access based on the deployment environment.
  - 3rd party API's can be specified at .allowedOrigins("*") method.
  - Enables smooth interaction between the frontend served on one domain and the backend on another.
- **Integration Testing:** Comprehensive integration tests using JUnit and Spring's testing framework to ensure API reliability and correctness.
    - **User Management:**
        - `POST /users/new`: Create a new user.
        - `GET /users`: Retrieve a list of all users.
        - `GET /users/{id}`: Retrieve details of a specific user.
        - `PUT /users/{id}`: Fully update an existing user.
        - `PATCH /users/{id}`: Partially update an existing user.
        - `DELETE /users/{id}`: Remove a user and validate the deletion.
    - **Account Management:**
        - `POST /users/{id}/accounts/new`: Create a new account for a user.
        - `GET /users/{id}/accounts`: Retrieve all accounts for a user.
        - `GET /users/{id}/accounts/{accountId}`: Retrieve specific account details.
        - `DELETE /users/{id}/accounts/{accountId}`: Validate account deletion after user removal.

## Testing

- **Unit and Integration Testing:** 
    - Uses H2 in-memory database for fast, isolated tests.
    - Tests cover all major CRUD operations and ensure data integrity.
    - Integration tests utilize MockMvc for simulating HTTP requests and validating responses.
    - Each test method resets the application context to ensure independence between tests.
- **Continuous Integration:** Integration with CI/CD pipelines (e.g., GitHub Actions) for automated testing and deployment.
## Deployment

- **Deployment on DigitalOcean:**
  - Deployed using a DigitalOcean droplet for hosting both frontend and backend applications.
  - Ensures scalable and reliable performance with cloud infrastructure.
    
## Choose the Envirpnment
- There are two branches at the repository if you will work your on local machine choose localhost branch to clone.On 

  ```bash
  git checkout -b localhost
  ```
- Otherwise clone the main branch and configure the `@CrossOrigin("http://67.207.86.85:3000")` methods.
 
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/project-atm.git
    ```
2. **Run the application using Docker Compose:**
    ```bash
    docker-compose up --build
    ```
3. **Run integration tests:**
    ```bash
    ./mvn test
    ```
4. **Start frontend:**
   - [Click here to see detailed frontend ReactJS configuration](https://github.com/omeryldzk/ReactApp).
For detailed instructions on setting up and running the application, please refer to the [documentation](./docs/SETUP.md).
