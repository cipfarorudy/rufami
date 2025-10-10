# Rufami App - AI Coding Guidelines

## Architecture Overview
This is a React 19 application built with Create React App that integrates dual authentication (Azure AD + Google OAuth) with collaborative workspace features and external API consumption.

**Core Components:**
- `AzureAuthProvider.jsx`: MSAL-based Azure AD authentication wrapper
- `GoogleAuth.jsx`: Google OAuth integration in header
- `WorkspaceCollaboratif.jsx`: Project/user management with CRUD operations
- `EventsFromAPI.jsx`: Event display from external API
- `CallAzureApiButton.jsx`: Azure API calls with token authentication

**Data Flow:**
- Authentication providers wrap the entire app
- Components make direct `fetch()` calls to external APIs
- Azure API calls require MSAL token acquisition
- State managed locally with React hooks (useState/useEffect)

## Authentication Setup
**Azure AD Integration:**
- Uses `@azure/msal-browser` and `@azure/msal-react`
- Replace `VOTRE_CLIENT_ID_AZURE_AD` in `AzureAuthProvider.jsx`
- API scope: `api://VOTRE_API_CLIENT_ID/.default`
- Token acquired via `instance.acquireTokenSilent()`

**Google OAuth:**
- Uses `@react-oauth/google`
- Replace `VOTRE_CLIENT_ID_ICI` in `GoogleAuth.jsx`
- Integrated in header component

## API Integration Patterns
**External API Calls:**
- Direct `fetch()` calls without dedicated API layer
- Placeholder URLs: `https://api.exemple.com/*`
- Replace with actual endpoints before deployment
- Error handling via `.catch()` blocks

**Azure API Calls:**
- Always acquire token first: `await instance.acquireTokenSilent({ scopes: [apiScope] })`
- Include Bearer token in Authorization header
- Handle token acquisition errors

## Styling Conventions
**Tailwind CSS:**
- Utility-first approach throughout
- Responsive design with `sm:`, `lg:` prefixes
- Color scheme: gray-100 backgrounds, blue-600 primary buttons
- Layout uses flexbox/grid: `flex`, `grid grid-cols-1 lg:grid-cols-2`

**Component Structure:**
- Consistent padding: `p-6`, `px-4 py-8`
- Button styling: `bg-blue-600 text-white px-4 py-2 rounded-md`
- List items: `p-2 bg-gray-100 rounded mb-2`

## Development Workflow
**Build Commands:**
- `npm start`: Development server on localhost:3000
- `npm run build`: Production build to `/build`
- `npm test`: Jest test runner
- `npm run eject`: CRA ejection (irreversible)

**Key Files to Reference:**
- `src/App.jsx`: Main app structure and routing
- `package.json`: Dependencies and scripts
- `tailwind.config.js`: Tailwind configuration
- `postcss.config.js`: CSS processing pipeline

## Code Patterns
**State Management:**
- Local component state with `useState`
- Side effects with `useEffect`
- No global state management library

**Error Handling:**
- API errors caught in `.catch()` blocks
- Display error messages in red text: `text-red-600`

**Language:**
- UI text in French
- Code comments and console logs in French

## Deployment Notes
- Build output goes to `/build` directory
- Static hosting ready (contains `index.html`, assets, etc.)
- Requires environment variables for client IDs and API URLs
- No server-side rendering or backend included</content>
<parameter name="filePath">c:\Users\CIP FARO\rufami-app\rufami-app\.github\copilot-instructions.md