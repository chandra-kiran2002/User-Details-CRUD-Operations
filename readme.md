# User Details CRUD Operations

Check out the live demo [here](https://magical-otter-db691c.netlify.app/).

This web application allows users to perform CRUD operations (Create, Read, Update, Delete) on user details using Bootstrap, jQuery, and a mock API. The application provides a straightforward user interface with a table displaying existing user data. Users can interact with the application through intuitive modals for adding, editing, and deleting entries.

## Overview
The Users class serves as the backbone for data management, handling fetching, displaying, and manipulation of user details. Adding a new user involves completing a modal with fields for Name, Email, and Photo Link. Editing prompts a modal with pre-existing details for modification, while deletion requires confirming the user's removal through another modal.

## Usage
Getting Started: Open the index.html file in a web browser to view the main page with the user details table.
Adding a User: Click the "Add" button to open a modal, then input Name, Email, and Photo Link. Click "Add Data" to see the new user in the table.
Editing a User: Find the user in the table, click "Edit" in the corresponding row, modify details in the modal, and save changes.
Deleting a User: Locate the user in the table, click "Delete" in the corresponding row, and confirm the deletion in the modal.
Developer Guide
Dependencies
Bootstrap 5.3.2 (CSS and JS)
jQuery 3.5.1
Class Overview
The Users class manages data operations, creating modals, and updating the table. Developers can refer to this overview for insights into the application's structure and customization.

## API Endpoint
The application communicates with a mock API at the endpoint: https://65a8ca65219bfa37186795e7.mockapi.io/api/users.

##Contribution
Feel free to contribute or customize the code according to your requirements. Please refer to the developer guide for a better understanding of the application's structure.