# MinIO-SvelteKit

This repository demonstrates the integration of MinIO with a SvelteKit application. MinIO is a high-performance object storage system, compatible with Amazon S3 cloud storage service. SvelteKit is a modern framework for building fast, dynamic web applications.

## Features

- **MinIO Integration**: Easily connect your SvelteKit application to a MinIO instance.
- **Video File Retrieval and Playback**: Fetch and play video files stored in MinIO directly in your SvelteKit application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- A running instance of MinIO. You can run MinIO locally or use a hosted MinIO service.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yakupsogut/MinIO-SvelteKit.git
    cd MinIO-SvelteKit
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MinIO configurations**:
    Edit the `lib/minio.js` file and add your MinIO credentials and configurations:
    ```javascript
    // lib/minio.js
   import { Client } from 'minio';

    const minioClient = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'accessKey',//or username
      secretKey: 'secretKey'//or password
    });
    
    export default minioClient;

    ```

## Usage

1. **Run the development server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:3000`.

2. **Build for production**:
    To build the application for production, run:
    ```bash
    npm run build
    ```

3. **Start the production server**:
    ```bash
    npm start
    ```

## Project Structure

- `src/`: Contains the source code of the SvelteKit application.
  - `routes/`: SvelteKit routes and pages.
  - `lib/`: Utility functions and MinIO integration logic.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MinIO](https://min.io/) - High Performance Object Storage
- [SvelteKit](https://kit.svelte.dev/) - The fastest way to build Svelte apps
