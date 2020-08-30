# Ecommerce Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
The backend for an ecommerce website that has been configured using Sequelize. Category, Product, and Tag models have been created along with a ProductTag model to record the many-to-many relationship between products and tags. Basic CRUD methods have been created for Category, Product, and Tag models as well, allowing users to manipulate the database as needed.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [Credits](#credits)
* [License](#license)
* [Questions](#questions)

## Installation
To install dependencies, run the following command:
```
npm install
```

## Usage
To use this application, use mysql to run the schema file in the db folder with:
```
source db/schema.sql
```
Then, seed the database with:
```
npm run seed
```
Finally sync sequelize and start the server with:
```
npm start
```

## Demo
Please refer to this [demo video](https://drive.google.com/file/d/1LunO1mKf_8yYeqBThZ-76N2yky635yH0/view) for installation and usage instructions.

## Credits
Created by Daniel Monterrosa.

Powered by [Sequelize](https://www.npmjs.com/package/sequelize), [mySQL2](https://www.npmjs.com/package/mysql2), [Express.js](https://www.npmjs.com/package/express), and [dotenv](https://www.npmjs.com/package/dotenv).

## License
Ecommerce Backend is licensed under the MIT license.

## Questions
Reach out to me with any questions by connecting with me on [GitHub](https://github.com/Dannymont94) or sending an email to dannym94@gmail.com.