# clean-todo-firebase

**clean-todo-firebase** is a task management (to-do) project that uses Clean Architecture to ensure a scalable and maintainable design. This web application is based on **React** for the user interface, **Express** for the server, and **Firebase** as the backend for data management.

## Features

- **Clean Architecture**: Implements Clean Architecture principles to separate concerns and facilitate code evolution.
- **Task Management**: Allows users to efficiently add, edit, delete, and list tasks.
- **Firebase as Backend**: Uses Firebase Firestore for data storage, providing fast and robust integration with cloud services.
- **SSR and Rehydration**: Utilizes server-side rendering (SSR) to enhance user experience and SEO optimization, with client-side component rehydration.
- **User-Friendly Interface**: Developed with **Tailwind CSS** to provide a modern and responsive user experience.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, TypeScript
- **Database**: Firebase Firestore

## Installation

To install and run the project, follow these steps:

1. Clone the repository.
2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set the Firebase environment variable:
   \`\`\`bash
   export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
   \`\`\`
4. Make sure to set up an authentication method in Firebase and configure a Firestore database.
5. Compile and run the server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Missing Features

- **Task Pagination**: The pagination for tasks is not fully implemented yet. This feature needs to be correctly integrated to handle multiple pages of tasks and navigate between them.
- **Task Detail Page**: The functionality to open a task on a separate page is not yet available. Each task should be clickable and open in its own dedicated view to allow better task management and display detailed information.
- **Correct Path Implementation**: The project currently uses relative paths for importing elements, such as:
  \`\`\`typescript
  import { Todo } from "../../../core/entities/Todo";
  \`\`\`
  Ideally, paths should be implemented in a more organized and clean way using aliases, like this:
  \`\`\`typescript
  import { Todo } from "@core/entities/Todo";
  \`\`\`
  This will make imports clearer and more maintainable as the project scales.
## Contributions

Contributions are welcome. If you would like to collaborate, feel free to open an issue or submit a pull request.