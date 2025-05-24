workflow-automation-app/
├── backend/
│   ├── src/main/java/com/workflow/
│   │   ├── WorkflowApplication.java
│   │   ├── config/
│   │   │   ├── SecurityConfig.java
│   │   │   ├── CorsConfig.java
│   │   │   └── SwaggerConfig.java
│   │   ├── controller/
│   │   │   ├── WorkflowController.java
│   │   │   ├── TaskController.java
│   │   │   ├── UserController.java
│   │   │   └── AuthController.java
│   │   ├── service/
│   │   │   ├── WorkflowService.java
│   │   │   ├── TaskExecutionService.java
│   │   │   ├── NotificationService.java
│   │   │   └── AuthService.java
│   │   ├── model/
│   │   │   ├── Workflow.java
│   │   │   ├── Task.java
│   │   │   ├── User.java
│   │   │   ├── WorkflowNode.java
│   │   │   ├── WorkflowEdge.java
│   │   │   └── ExecutionLog.java
│   │   ├── repository/
│   │   │   ├── WorkflowRepository.java
│   │   │   ├── TaskRepository.java
│   │   │   ├── UserRepository.java
│   │   │   └── ExecutionLogRepository.java
│   │   ├── dto/
│   │   │   ├── WorkflowDTO.java
│   │   │   ├── TaskDTO.java
│   │   │   ├── NodeDTO.java
│   │   │   └── ExecutionResultDTO.java
│   │   ├── engine/
│   │   │   ├── WorkflowEngine.java
│   │   │   ├── NodeExecutor.java
│   │   │   ├── TriggerHandler.java
│   │   │   └── ConditionEvaluator.java
│   │   └── exception/
│   │       ├── WorkflowException.java
│   │       ├── NodeExecutionException.java
│   │       └── GlobalExceptionHandler.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   ├── application-dev.yml
│   │   └── application-prod.yml
│   ├── src/test/java/com/workflow/
│   │   ├── WorkflowApplicationTests.java
│   │   ├── controller/
│   │   └── service/
│   ├── pom.xml
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── WorkflowBuilder/
│   │   │   │   ├── WorkflowCanvas.jsx
│   │   │   │   ├── NodePalette.jsx
│   │   │   │   ├── NodeProperties.jsx
│   │   │   │   ├── WorkflowToolbar.jsx
│   │   │   │   ├── nodes/
│   │   │   │   │   ├── TriggerNode.jsx
│   │   │   │   │   ├── ConditionNode.jsx
│   │   │   │   │   ├── ActionNode.jsx
│   │   │   │   │   └── EndNode.jsx
│   │   │   │   └── templates/
│   │   │   │       ├── TemplateLibrary.jsx
│   │   │   │       └── TemplateCard.jsx
│   │   │   ├── TaskManager/
│   │   │   │   ├── TaskList.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── TaskDetails.jsx
│   │   │   │   └── ExecutionHistory.jsx
│   │   │   └── Dashboard/
│   │   │       ├── DashboardHome.jsx
│   │   │       ├── WorkflowStats.jsx
│   │   │       ├── RecentActivity.jsx
│   │   │       └── QuickActions.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── WorkflowsPage.jsx
│   │   │   ├── TasksPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useWorkflows.js
│   │   │   ├── useTasks.js
│   │   │   └── useLocalStorage.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── WorkflowContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── supabaseClient.js
│   │   │   ├── workflowService.js
│   │   │   ├── taskService.js
│   │   │   └── authService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   ├── nodeTypes.js
│   │   │   └── validators.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── components.css
│   │   │   └── workflow-builder.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
├── docker-compose.yml
├── docker-compose.dev.yml
├── .gitignore
├── .env.example
└── README.md

# Key Files Overview:

## Backend (Java Spring Boot)
- **WorkflowApplication.java**: Main application entry point
- **SecurityConfig.java**: Supabase JWT authentication configuration
- **WorkflowEngine.java**: Core workflow execution engine
- **Controllers**: REST API endpoints for workflows, tasks, users
- **Services**: Business logic for workflow management and execution
- **Models**: JPA entities for database mapping
- **DTOs**: Data transfer objects for API responses

## Frontend (React + Vite)
- **WorkflowCanvas.jsx**: Main drag-and-drop workflow builder
- **Node Components**: Visual components for different node types
- **Services**: API integration and Supabase client
- **Context**: Global state management for auth and workflows
- **Hooks**: Custom React hooks for data fetching and state

## Configuration Files
- **pom.xml**: Maven dependencies for Spring Boot
- **package.json**: NPM dependencies for React
- **docker-compose.yml**: Local development environment
- **application.yml**: Spring Boot configuration
- **tailwind.config.js**: Tailwind CSS configuration

## Development Environment
- **Backend**: Java 17+ with Spring Boot 3.x
- **Frontend**: React 18 with Vite build tool
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth with JWT tokens
- **Styling**: Tailwind CSS for UI components
- **Workflow Builder**: React Flow for visual editor