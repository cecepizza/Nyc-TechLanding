google sheets link : https://docs.google.com/spreadsheets/d/1HRvvJaqWDMi4zJfWoE36Ky5-f7H2Y4vduat2HdSrrxg/edit?gid=0#gid=0

# Project Name
NYC Tech Hub

## Overview

This project is a web application that displays tech events, jobs, and ecosystem information for NYC. It uses Next.js for the frontend and integrates with Google Sheets for data management.

## Features

- **Event Calendar**: Displays upcoming tech events in a calendar view.
- **Job Listings**: Shows featured job opportunities in the tech industry.
- **Ecosystem Information**: Provides details about startups, VCs, and accelerators in NYC.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Google Sheets API
- **Scraping**: Playwright for event data scraping

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your configuration:
   ```env
   BACKEND_URL=http://localhost:8000
   GOOGLE_CREDENTIALS=your_google_credentials
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit `http://localhost:3000` to see the application in action.

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Runs the production build.
- **`npm run scrape`**: Scrapes event data using Playwright.

## Configuration

- **Google Sheets**: Ensure your Google Sheets API credentials are set up correctly in the `.env` file.
- **Image Domains**: Update `next.config.js` to include any external image domains.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [your email].
