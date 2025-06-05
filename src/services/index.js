// Utility function for adding delays to simulate API calls
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Export all services
export * as moduleService from './api/moduleService'
export * as lessonService from './api/lessonService'
export * as progressService from './api/progressService'
export * as codeSnippetService from './api/codeSnippetService'