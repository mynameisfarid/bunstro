# BUNSTRO Framework - Setup Guide

## 📥 Installation Instructions

Karena saya tidak bisa membuat file ZIP yang bisa didownload, berikut cara manual untuk setup BUNSTRO Framework:

### Method 1: Manual Setup (Recommended)

#### Step 1: Create Project Directory

```bash
mkdir bunstro-project
cd bunstro-project
```

#### Step 2: Initialize Bun Project

```bash
bun init -y
```

#### Step 3: Create Directory Structure

```bash
mkdir -p {applications/{api,dashboard,tenant,web,blog},shared/{models,services,repositories,middleware},core,helpers,config,cli}
mkdir -p database/{migrations,seeds}
mkdir -p storage/{logs,uploads}
mkdir -p public/{css,js,images}
mkdir -p views
```

#### Step 4: Copy Files

Salin semua file yang saya berikan di artifacts ke direktori yang sesuai:

**Root Files:**
- `package.json` → Root directory
- `.env.example` → Root directory
- `README.md` → Root directory
- `SETUP_GUIDE.md` → Root directory (file ini)

**Core Files:**
- `core/Logger.ts`
- `core/Database.ts`
- `core/Router.ts` (dari artifact sebelumnya)
- `core/ApplicationManager.ts` (dari artifact sebelumnya)

**Helper Files:**
- `helpers/index.ts`

**Application Files:**
- `applications/api/index.ts`
- `applications/dashboard/index.ts`
- `applications/tenant/index.ts`
- `applications/web/index.ts`
- `applications/blog/index.ts`

**Shared Services:**
- `shared/services/UserService.ts`
- `shared/services/AuthService.ts`
- `shared/services/ProductService.ts`
- `shared/services/TenantService.ts`

**Main Entry:**
- `index.ts`

**CLI:**
- `cli/index.ts`
- `cli/commands/make-controller.ts`
- `cli/commands/make-model.ts`
- `cli/commands/make-migration.ts`

#### Step 5: Install Dependencies

```bash
bun install
```

#### Step 6: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file sesuai konfigurasi Anda:

```env
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=bunstro
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

#### Step 7: Create Database

```bash
# PostgreSQL
createdb bunstro

# Or using psql
psql -U postgres
CREATE DATABASE bunstro;
\q
```

#### Step 8: Run Migrations

```bash
bun run migrate:latest
```

#### Step 9: Start Development Server

```bash
bun run dev
```

Visit `http://localhost:3000`

---

### Method 2: Quick Copy-Paste Script

Buat file `setup.sh`:

```bash
#!/bin/bash

# Create directory structure
mkdir -p bunstro-project
cd bunstro-project

# Initialize
bun init -y

# Create directories
mkdir -p {applications/{api,dashboard,tenant,web,blog},shared/{models,services,repositories,middleware},core,helpers,config,cli/commands}
mkdir -p database/{migrations,seeds}
mkdir -p storage/{logs,uploads}
mkdir -p public/{css,js,images}
mkdir -p views

# Copy .env
cat > .env << 'EOF'
# (Paste .env.example content here)
EOF

# Copy package.json
cat > package.json << 'EOF'
# (Paste package.json content here)
EOF

# Install dependencies
bun install

echo "✅ BUNSTRO Framework initialized!"
echo "📝 Next steps:"
echo "1. Edit .env file"
echo "2. Create database: createdb bunstro"
echo "3. Run migrations: bun run migrate:latest"
echo "4. Start server: bun run dev"
```

Run script:
```bash
chmod +x setup.sh
./setup.sh
```

---

## 🗂️ Complete File List

Berikut daftar lengkap file yang perlu dibuat:

### Root Directory
```
.env.example
.gitignore
README.md
SETUP_GUIDE.md
package.json
tsconfig.json
```

### Source Files ()
```

├── index.ts
├── applications/
│   ├── api/index.ts
│   ├── dashboard/index.ts
│   ├── tenant/index.ts
│   ├── web/index.ts
│   └── blog/index.ts
├── core/
│   ├── Application.ts
│   ├── ApplicationManager.ts
│   ├── Database.ts
│   ├── Logger.ts
│   ├── Router.ts
│   └── View.ts
├── shared/
│   ├── services/
│   │   ├── UserService.ts
│   │   ├── AuthService.ts
│   │   ├── ProductService.ts
│   │   └── TenantService.ts
│   ├── models/
│   ├── repositories/
│   └── middleware/
├── helpers/
│   └── index.ts
├── config/
│   ├── app.ts
│   └── database.ts
└── cli/
    ├── index.ts
    └── commands/
        ├── make-controller.ts
        ├── make-model.ts
        ├── make-migration.ts
        ├── make-seeder.ts
        ├── migrate-run.ts
        └── migrate-rollback.ts
```

### Database Files
```
database/
├── migrations/
│   └── .gitkeep
└── seeds/
    └── .gitkeep
```

### Storage & Public
```
storage/
├── logs/
│   └── .gitkeep
└── uploads/
    └── .gitkeep

public/
├── css/
├── js/
└── images/
```

---

## 🔧 Additional Configuration Files

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "types": ["bun-types"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### .gitignore

```
# Dependencies
node_modules/
bun.lockb

# Environment
.env
.env.local

# Build
dist/
*.log

# Storage
storage/logs/*.log
storage/uploads/*
!storage/logs/.gitkeep
!storage/uploads/.gitkeep

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

### knexfile.ts (for migrations)

```typescript
import type { Knex } from 'knex';
import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: './database/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      extension: 'ts',
    },
  },
};

export default config;
```

---

## 📦 Download Alternative

Karena saya tidak bisa membuat file ZIP, berikut alternatifnya:

### Option 1: GitHub Repository
Saya sarankan Anda membuat repository GitHub dan commit semua file di atas. Kemudian Anda bisa:

```bash
git clone https://github.com/yourusername/bunstro.git
cd bunstro
bun install
```

### Option 2: Create Archive Manually

```bash
# Setelah semua file selesai dicopy
tar -czf bunstro-framework.tar.gz bunstro-project/
# atau
zip -r bunstro-framework.zip bunstro-project/
```

---

## ✅ Verification Checklist

- [ ] All dependencies installed (`bun install`)
- [ ] `.env` file configured
- [ ] Database created
- [ ] Migrations run successfully
- [ ] Development server starts without errors
- [ ] Can access http://localhost:3000
- [ ] Logs appear in console with colors
- [ ] Can generate files with CLI (`bun run cli make:controller Test`)

---

## 🆘 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Check credentials in .env match your PostgreSQL setup
psql -U postgres -h localhost
```

### Port Already in Use
```bash
# Change port in .env
SINGLE_PORT=3001

# Or kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

---

## 📞 Next Steps

1. ✅ Framework setup complete
2. 📖 Read `README.md` for usage guide
3. 🏗️ Start building your application
4. 📚 Check examples in `applications/`
5. 🔧 Customize configuration in `config/`

**Happy Coding! 🚀**