# Node Hotel Application
The Node Hotel application is a Node.js-based system developed using the Express.js framework, with MongoDB as the chosen database. This application manages information related to persons (staff) and menu items. It exposes specific endpoints to handle CRUD (Create, Read, Update, Delete) operations for both persons and menu items.

## Endpoints

### Persons

-**Add a Person:**
  -**Endpoint:** `POST /person`
    - *Description:* Adds a person to the system with details such as name, role, etc.

- *Get All Persons:*
  - *Endpoint:* GET /person
  - *Description:* Retrieves a list of all persons in the system.

- *Get Persons by Work Type:*
  - *Endpoint:* GET /person/:workType
  - *Description:* Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).
