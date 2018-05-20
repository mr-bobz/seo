/*
    Main App, server entry point
    @author: Bobby Joseph <bobbyj79@gmail.com>
*/

import app from './app';

// Determine port to listen on
const port = process.env.PORT || 9000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
