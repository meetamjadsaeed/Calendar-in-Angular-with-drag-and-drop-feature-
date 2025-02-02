# Dynamic Calendar with Drag and Drop

## Description

This project is a dynamic calendar built with Angular, featuring drag-and-drop functionality for managing appointments. It utilizes various Angular features and patterns to ensure efficient and scalable development.

## Features

- **Appointments**: Users can create, delete, view and update appointments.
- **Drag & Drop Appointments**: Appointments can be moved via drag and drop.
- **Dynamic Calendar Navigation**: Navigate forward and backwards in the calendar.
- **Persisted Appointments**: Appointments remain persistent when navigating the calendar.
- **Select Date and Time**: Users can select the appointment date and time.

## Technologies and Patterns Used

- **Dependency Injection**: Ensures services and components are loosely coupled and easily testable.
- **Lazy Loading**: Efficiently loads modules/routes as needed, improving performance.
- **Angular Forms**: Utilizes value changes and validators for robust form handling.
- **RxJS**: Employed extensively for reactive programming.
- **Standalone Components/Shared Modules**: Promotes reusability and modularity of components.
- **Angular Material**: Provides styling and UI components.
- **Angular CDK**: Used for implementing drag and drop functionality.

## Getting Started

### Prerequisites

- Node.js (version 14.x or above)
- npm (version 6.x or above) or yarn (version 1.x or above)
- Angular CLI (version 12.x or above)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/meetamjadsaeed/Calendar-in-Angular-with-drag-and-drop-feature-.git
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project

To start the development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser to see the application in action.

### Building the Project

To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Modules and Routing

- **Lazy Loading**: Modules are lazy-loaded to improve performance.
- **Router**: Configured with routes and router-outlets to manage navigation.

### Forms and Validation

- **Angular Forms**: Utilized for handling user input with reactive forms.
- **Validators**: Implemented to ensure form data integrity.

### RxJS

- **Reactive Programming**: RxJS is used extensively to handle asynchronous data streams.

### Styling and Drag & Drop

- **Angular Material**: Provides a modern and responsive design.
- **Angular CDK**: Used for implementing drag and drop functionality.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Could you make sure to follow the code style and include appropriate tests?

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [Angular CDK](https://material.angular.io/cdk/categories)
