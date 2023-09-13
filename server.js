const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/generate-pdf') {
    // Data to pass to the PDF generation script
    const pdfData = {
      title: 'Sample PDF Report',
      content: 'This is a sample PDF report generated by the server.',
    };

    // Serialize the data to JSON and pass it as a command-line argument
    const pdfGeneration = spawn('node', ['generate-pdf.js', JSON.stringify(pdfData)]);

    pdfGeneration.stdout.on('data', (data) => {
      console.log(`PDF Generation Output: ${data}`);
    });

    pdfGeneration.stderr.on('data', (data) => {
      console.error(`PDF Generation Error: ${data}`);
    });

    pdfGeneration.on('close', (code) => {
      if (code === 0) {
        // PDF generation completed successfully
        const pdfFilePath = 'sample.pdf';
        const pdfFile = fs.readFileSync(pdfFilePath);

        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=${pdfFilePath}`,
        });

        // Send the PDF file to the client
        res.end(pdfFile);
      } else {
        // PDF generation failed
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('PDF generation failed');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
