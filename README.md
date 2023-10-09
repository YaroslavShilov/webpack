## Task Title: Advanced Webpack Configuration and Optimization

### Task Description:

You are tasked with optimizing the build process for a large and complex web application using webpack. The application is a SPA built with JavaScript, CSS, and HTML. 
Your goal is to improve the development and production build pipelines, enhance code splitting, and optimize performance.

### Requirements:

### Webpack Configuration:

a. Set up separate webpack configurations for development and production environments using webpack's webpack.config.js file and webpack.prod.js and webpack.dev.js files.

b. Configure webpack to use html-webpack-plugin to generate HTML files dynamically based on your templates.

c. Configure webpack to use mini-css-extract-plugin for extracting CSS files in production mode.

d. Implement source mapping in the development environment for better debugging.

### Code Splitting:

a. Implement code splitting using dynamic imports. Split your application into at least three chunks: one for the main application code, one for vendor dependencies (e.g., third-party libraries), and one for asynchronous or lazy-loaded routes/modules.

b. Optimize the chunk naming to include content hashes for cache-busting.

c. Configure webpack to generate a manifest.json file to manage chunk mapping.

### Asset Optimization:

a. Optimize images by using image-webpack-loader or equivalent.

b. Compress and minify assets like JavaScript and CSS in the production build.

c. Implement tree shaking to remove unused code.


Performance Optimization:

a. Set up performance budgets to prevent assets from growing too large.

b. Implement caching strategies for assets in the production build.

### Advanced Configuration:

a. Create environment-specific configuration files (e.g., .env.development and .env.production) and use dotenv-webpack to load environment variables.

b. Implement code splitting based on routes using react-loadable or a similar library if you are using React.

### Webpack Dev Server:

a. Set up webpack dev server with hot module replacement (HMR) for faster development iteration.

b. Implement proxying for API requests during development.

### Commands:
Run the server: 
```node server/server.js```
and then run:
```npm run start```