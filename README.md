Andrei Vincent P. Padillo — Portfolio

A personal portfolio website recreated as a React application using Vite and hosted on GitHub Pages.

🔗 Live site: https://fatemorningstar.github.io/fatemorningstar-react/

About

This is my personal portfolio as a Bachelor of Science in Computer Science (BSCS) student. It showcases my introduction, background, skills, selected projects, and contact information.

Originally built using HTML and CSS, this project was recreated using React as part of an academic activity to practice component-based development, reusable components, responsive web design, and deployment using GitHub Pages.

Pages and Features

- Home — Introduction and welcome section.
- About — Personal background, skills, and additional information.
- Work — Selected projects and development work.
- Contact — Social media links and contact information.
- Budget Tracker — A simple educational tool for entering a total budget, adding expenses, and viewing the remaining amount.

«Note: The Budget Tracker is included for educational and demonstration purposes. It is a basic project feature, not a complete financial management system.»

Technologies Used

- React — Building the user interface with reusable components.
- JavaScript (ES6+) — Application logic and interactivity.
- HTML5 — Page structure and content.
- CSS3 — Styling and responsive layout.
- Vite — Development server and production build tool.
- React Router — Navigation between application pages.
- GitHub Pages — Hosting the deployed website.
- GitHub Actions — Automating the build and deployment process.

Project Structure

fatemorningstar-react/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── content/
│   ├── index.html
│   ├── about.html
│   ├── work.html
│   └── contact.html
├── images/
│   └── (site images)
├── index.html
├── main.jsx
├── style.css
├── package.json
├── vite.config.js
└── README.md

The "content/" directory contains the existing HTML page content used by the React application. The main React logic and navigation are handled in "main.jsx", while "style.css" contains the website's styling.

Running Locally

To run the project on your computer, install "Node.js" (https://nodejs.org/) first.

1. Clone the repository:
   
   git clone https://github.com/FateMorningStar/fatemorningstar-react.git

2. Open the project directory:
   
   cd fatemorningstar-react

3. Install the dependencies:
   
   npm install

4. Start the development server:
   
   npm run dev

5. Open the local URL shown in your terminal.

To create a production build, run:

npm run build

Deployment

The website is hosted on GitHub Pages. GitHub Actions builds the React application with Vite and deploys the generated production files.

Live website: https://fatemorningstar.github.io/fatemorningstar-react/

Purpose

This project demonstrates my ongoing learning in web development, particularly React, reusable components, responsive design, and website deployment. It also serves as a practical exercise in converting an existing website into a React application while preserving its original layout and functionality.
