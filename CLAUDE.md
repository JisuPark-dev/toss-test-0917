# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
This is a Vue 3 application with Toss Payments API integration. The project uses Vite as the build tool and requires Node.js ^20.19.0 || >=22.12.0.

## Common Commands

### Development
```bash
npm install         # Install dependencies
npm run dev         # Start development server with HMR
npm run build       # Build for production
npm run preview     # Preview production build
```

### Testing & Linting
No test runner or linting is currently configured. Consider adding Vitest for testing.

## Architecture

### Project Structure
- `src/` - Vue application source code
  - `App.vue` - Root component
  - `main.js` - Application entry point
  - `components/` - Reusable Vue components
  - `assets/` - Static assets (CSS, images)
- `toss-payment.js` - Toss Payments API wrapper (CommonJS module)
- `example.js` - Example usage of the Toss API
- `vite.config.js` - Vite configuration with `@` alias pointing to `./src/`

### Key Implementation Details

1. **Module System Mismatch**: The project uses ES modules (`"type": "module"` in package.json), but `toss-payment.js` is written in CommonJS. Convert to ES modules for consistency.

2. **Toss Payments API (`toss-payment.js`)**:
   - Implements payment operations: request, confirm, query, cancel, refund
   - Uses axios for HTTP requests
   - Requires API key authentication
   - Returns Korean error messages

3. **Vue Application**: Currently a starter template that hasn't integrated the Toss Payments functionality yet.

### Development Notes
- The Vue app and Toss Payments module are separate - they need to be integrated
- API keys should be moved to environment variables
- Consider adding TypeScript for better type safety with payment APIs