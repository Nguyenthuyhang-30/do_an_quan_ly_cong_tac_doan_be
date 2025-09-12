# NodeJS Base Server

## Init project guide

1. Tạo file `server.js`
2. Khởi tạo `package.json`:
   ```bash
   npm init -y
   ```

## Cài đặt các package cần thiết

Dành cho dự án NodeJS kết nối PostgreSQL và xây dựng các API cơ bản (CRUD):

```bash
npm install express pg sequelize
npm install --save-dev compression dotenv helmet morgan
```

**Giải thích:**

- `express`: Framework cho API.
- `pg`: Thư viện kết nối PostgreSQL.
- `sequelize`: ORM cho PostgreSQL, hỗ trợ CRUD dễ dàng.
- `compression`, `dotenv`, `helmet`, `morgan`: Các package hỗ trợ bảo mật, log, cấu hình môi trường.

## Cấu trúc dự án

```
nodejs-base-server/
│
├── node_modules/           # Thư viện phụ thuộc
├── src/                    # Mã nguồn chính
│   ├── configs/            # Cấu hình hệ thống (database, env, ...)
│   ├── controllers/        # Xử lý logic cho các route
│   ├── dbs/                # Kết nối và cấu hình database (PostgreSQL)
│   ├── helpers/            # Hàm tiện ích dùng chung
│   ├── models/             # Định nghĩa các model dữ liệu (Sequelize)
│   ├── postman/            # Tài liệu hoặc collection cho Postman
│   ├── routes/             # Định nghĩa các API endpoint (CRUD: get list, get-by-id, create-or-update, delete, delete-many)
│   ├── services/           # Xử lý nghiệp vụ, business logic
│   └── utils/              # Các hàm tiện ích khác
│   └── app.js              # Khởi tạo ứng dụng Express
│
├── .env                    # Biến môi trường
├── .gitignore              # Các file/thư mục bị bỏ qua bởi git
├── package.json            # Thông tin dự án & dependencies
├── README.md               # Tài liệu mô tả dự án
├── server.js               # Điểm khởi động server
├── yarn.lock               # Quản lý phiên bản package (nếu dùng yarn)
```

## Hướng dẫn chạy dự án

```bash
npm run dev
```
