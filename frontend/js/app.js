// Module navigation
function showModule(moduleName) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.add('hidden');
    });
    
    // Show selected module
    document.getElementById(`${moduleName}-module`).classList.remove('hidden');
}

// SQL Injection functions
async function testSQLi() {
    const username = document.getElementById('sqli-username').value;
    const resultsDiv = document.getElementById('sqli-results');
    
    try {
        const response = await fetch(`/sqli/search?username=${encodeURIComponent(username)}`);
        const data = await response.json();
        
        resultsDiv.innerHTML = `Query: ${data.query}\n\nResults: ${JSON.stringify(data.users, null, 2)}`;
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

async function testSQLiSecure() {
    const username = document.getElementById('sqli-username').value;
    const resultsDiv = document.getElementById('sqli-results');
    
    try {
        const response = await fetch(`/sqli/search-secure?username=${encodeURIComponent(username)}`);
        const data = await response.json();
        
        resultsDiv.innerHTML = `Query: ${data.query}\n\nResults: ${JSON.stringify(data.users, null, 2)}`;
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

// XSS functions
async function addComment() {
    const username = document.getElementById('xss-username').value;
    const comment = document.getElementById('xss-comment').value;
    
    try {
        const response = await fetch('/xss/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, comment })
        });
        
        const data = await response.json();
        loadComments();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addCommentSecure() {
    const username = document.getElementById('xss-username').value;
    const comment = document.getElementById('xss-comment').value;
    
    try {
        const response = await fetch('/xss/comment-secure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, comment })
        });
        
        const data = await response.json();
        loadComments();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadComments() {
    try {
        const response = await fetch('/xss/comments');
        const comments = await response.json();
        
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <strong>${comment.username}</strong> - ${new Date(comment.timestamp).toLocaleString()}
                <div>${comment.comment}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Authentication functions
async function loginWeak() {
    const username = document.getElementById('auth-username').value;
    const password = document.getElementById('auth-password').value;
    const resultsDiv = document.getElementById('auth-results');
    
    try {
        const response = await fetch('/auth/login-weak', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

async function loginStrong() {
    const username = document.getElementById('auth-username').value;
    const password = document.getElementById('auth-password').value;
    const resultsDiv = document.getElementById('auth-results');
    
    try {
        const response = await fetch('/auth/login-strong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

async function accessAdmin() {
    const resultsDiv = document.getElementById('auth-results');
    
    try {
        const response = await fetch('/auth/admin');
        const data = await response.json();
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

// File upload functions
async function uploadInsecure() {
    const fileInput = document.getElementById('insecure-file');
    const resultsDiv = document.getElementById('upload-results');
    
    if (!fileInput.files[0]) {
        alert('Please select a file');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    try {
        const response = await fetch('/file-upload/insecure', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

async function uploadSecure() {
    const fileInput = document.getElementById('secure-file');
    const resultsDiv = document.getElementById('upload-results');
    
    if (!fileInput.files[0]) {
        alert('Please select a file');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    try {
        const response = await fetch('/file-upload/secure', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        resultsDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultsDiv.innerHTML = `Error: ${error.message}`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showModule('sqli');
    loadComments();
});
