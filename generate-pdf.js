// This script generates a PDF and accepts data as a command-line argument
const fs = require('fs');

console.log('Generating PDF...');

// Read the JSON data passed as a command-line argument
const jsonData = process.argv[2];
const pdfData = JSON.parse(jsonData);

// Simulate PDF generation by creating a simple PDF file
const pdfContent = `
  <h1>${pdfData.title}</h1>
  <p>${pdfData.content}</p>
`;

// In a real scenario, you would use a library like 'pdfkit' to generate PDF content.

// Save the PDF content to a file
fs.writeFileSync('sample.pdf', pdfContent);

console.log('PDF generated successfully.');
