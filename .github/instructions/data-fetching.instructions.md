---
description: Read this file to understand how to fetch data in the project
---
# Data Fetching Guidelines

This document outlines the best practices for fetching data in our Next.js project. Follow these guidelines to ensure consistency, performance, and maintainability across the codebase.

## 1. Use Server Components for Data Fetching
Whenever possible, fetch data in Server Components. This allows you to take advantage of Next.js's built-in data fetching capabilities and improves performance by reducing client-side JavaScript. NEVER use Client components to fetch data

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in components. This ensures that all data fetching logic is centralized and reusable.

All helper functions should be defined in the `/data` directory and should use Drizzle ORM for database interactions. This promotes consistency and type safety across the codebase.
