# Clothing Database UI

**Clothing Database UI** is a sophisticated web application designed to effortlessly manage your clothing data. Built with _Create React App_ and _DevExtreme CLI_, this modern solution offers an elegant user interface and robust components such as _DataGrid_, _Form_, and _Drawer_ for seamless clothing data management.

## Overview

_Clothing Database UI_ enables users to explore, add, view, and manage clothing data efficiently. The application is equipped with key features to enhance user experience.

## Features

- **DataGrid:** Effortlessly explore your clothing collection through a sophisticated table, showcasing essential details such as name, price, stock, size, id, and color.

- **Form:** Add new clothing items seamlessly using a user-friendly input form.

- **Drawer:** Access additional features effortlessly via the intuitive side navigation drawer.

- **Pie Chart:** Gain valuable insights into your data through a visually appealing **Pie Chart**. Highlighting specific data, this feature provides a dynamic and intuitive way to understand key trends and patterns within your clothing database.

## Getting Started

### Prerequisites

This project utilizes PostgreSQL for database management. Please note that the website does not grant access to any database other than the one specified. To set up the database, follow these steps:

1. Create a PostgreSQL database with the necessary tables.

   ```sql
   CREATE TABLE clothes (
       clothes_id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       color VARCHAR(50) NOT NULL,
       size VARCHAR(10) NOT NULL,
       stock INT DEFAULT 0 NOT NULL,
       price DECIMAL(10, 2) NOT NULL
   );

   CREATE TABLE user_data (
       user_id SERIAL PRIMARY KEY,
       first_name VARCHAR(50),
       last_name VARCHAR(50),
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255),
       avatar_url VARCHAR(255),
       date_of_birth DATE,
       address VARCHAR(255),
       phone_number VARCHAR(20),
       notes TEXT,
       creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       last_login_date TIMESTAMP,
       role VARCHAR(20)
   );
   ```

2. **Installation:**

   ```bash
   npm install
   ```

## Running the Website

To have the application up and running, follow these steps:

1. Navigate to `back-end/clothing` and run `npm start`.
2. Open another terminal, go to `back-end/user_data`, and run `npm start`.
3. Finally, open another terminal, navigate to `front-end`, and run `npm start`.

Explore, manage, and enjoy the enhanced experience of handling your clothing data effortlessly.

## Features

### Create Account

Creating an account is a simple process where you enter basic details like email, username, and password on a platform's sign-up page. Additional security steps may be needed. Once you submit the details and activate the account through a confirmation email or code, you can access the platform's features. Remember to choose a strong password for account security.

### Sign In

The **Sign In** feature provides a secure and straightforward authentication process for users. Easily access your clothing database by entering your credentials, ensuring a personalized and protected user experience.

### Remember Me

With the **Remember Me** functionality, the application enhances user convenience by allowing the system to remember login credentials. This feature ensures a seamless experience, reducing the need for repeated login procedures.

### Home Page

The **Home Page** serves as the central hub for navigating and managing your clothing database. Access key information at a glance, explore recent updates, and seamlessly move between different sections of the application.

### Updating Profile

The **Updating Profile** feature empowers users to maintain accurate and current personal information. Easily modify details such as name, contact information, and other profile attributes, ensuring your user profile remains up-to-date.

### Clothes Data (Removing and Editing)

Effortlessly manage your clothing data with the ability to Remove and Edit entries. Ensure accuracy and relevance by editing existing information or remove outdated entries. This feature provides flexibility and control over your clothing database.

### Adding New Clothes

The **Adding New Clothes** feature streamlines the process of expanding your clothing collection. Access a user-friendly input form to effortlessly add details for new clothing items. Enhance your database with the latest additions to your wardrobe, ensuring a comprehensive and up-to-date collection.

## Database

Modifications implemented in the DataGrid and Forms seamlessly incorporate and refresh the database with new and updated information.

## License

This project is licensed under the MIT License.

## Acknowledgements

- DevExtreme for providing powerful UI components.
- Create React App for simplifying the React setup.
- Appreciation to our contributors and users!

Thank you for looking at Clothing Database UI. This Project aims to simplify your clothing management tasks while offering an enjoyable user experience.
