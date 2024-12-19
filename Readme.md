# Kelp Coding Challenge

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](https://expressjs.com/)

### CSV to JSON Converter API with Age Distribution Report

This project is an API that converts a CSV file into a JSON object, stores the data into a PostgreSQL database, and generates an age distribution report. It leverages Express.js for the backend and PostgreSQL for database storage.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v10+
- PostgreSQL Database
- A CSV file containing user data (e.g., names, ages)

### Steps to Set Up

1. Clone the repository:
   ```bash
   git clone https://github.com/sid1003/KelpCodingChallenge.git
   ```
   
2. Navigate to the project directory:
    ```bash
   cd KelpCodingChallenge
   ```

3. Install Dependencies:
   ```bash
   npm install
   ```
   
4. Create and configure the .env file:

    - Create a .env file in the root of your project:

    ```bash
        touch .env
    ```

    - Add the following PostgreSQL credentials and file path to your .env file

     ```bash
        DB_HOST=your_database_host
        DB_PORT=your_database_port
        DB_NAME=your_database_name
        DB_USER=your_database_user
        DB_PASSWORD=your_database_password
        FILE_LOCATION=path_to_your_csv_file
        PORT=your_database_port
    ```
    
5. Run the server:
   ```bash
   npm run dev
   ``` 
   
## Usage

After the server is up and running, you can interact with the API to process the CSV file. It will automatically convert the CSV data into JSON format, push it to PostgreSQL, and provide a summary of age distribution in the console.

## License

##### MIT License

Now, this version includes all the necessary steps for setting up the project, configuring your environment, and running it. Feel free to copy and paste it into your README.md file.