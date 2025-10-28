# Base Service Architecture

## 📋 Tổng quan

**BaseService** là class cơ sở cung cấp các phương thức CRUD chuẩn cho tất cả các Service trong hệ thống. Giúp giảm code trùng lặp và dễ dàng bảo trì.

## 🎯 Lợi ích

- ✅ **Giảm code trùng lặp**: Không cần viết lại logic CRUD cho mỗi Service
- ✅ **Dễ bảo trì**: Sửa logic ở một nơi, áp dụng cho tất cả Service
- ✅ **Chuẩn hóa response**: Format response thống nhất
- ✅ **Validation tự động**: Validate required fields và unique fields
- ✅ **Tính mở rộng**: Dễ dàng override hoặc thêm method mới
- ✅ **Type-safe**: Có JSDoc đầy đủ

## 🚀 Cách sử dụng

### 1. Tạo Service mới kế thừa BaseService

```javascript
const BaseService = require("./base.service");
const db = require("../models");
const YourModel = db.YourModel;

class YourService extends BaseService {
  constructor() {
    super(YourModel, {
      entityName: "your_entity", // Tên entity (dùng trong message)
      searchFields: ["name", "code"], // Các trường để search
      requiredFields: ["name", "code"], // Các trường bắt buộc
      uniqueFields: ["code", "email"], // Các trường unique
      selectFields: ["id", "name", "code"], // Các trường cho dropdown
    });
  }

  // Wrapper methods để giữ API tương thích
  static getAll = async () => {
    const instance = new YourService();
    return await instance.getAll();
  };

  static getList = async (params) => {
    const instance = new YourService();
    return await instance.getList(params);
  };

  static getById = async (id) => {
    const instance = new YourService();
    return await instance.getById(id);
  };

  static createOrUpdate = async (data, id = null) => {
    const instance = new YourService();
    return await instance.createOrUpdate(data, id);
  };

  static delete = async (id) => {
    const instance = new YourService();
    return await instance.delete(id);
  };

  static deleteMany = async (ids) => {
    const instance = new YourService();
    return await instance.deleteMany(ids);
  };

  static getSelect = async () => {
    const instance = new YourService();
    return await instance.getSelect();
  };

  // ============================================
  // CUSTOM METHODS - Thêm logic đặc biệt ở đây
  // ============================================

  static customMethod = async () => {
    const instance = new YourService();
    // Your custom logic here
  };
}

module.exports = YourService;
```

### 2. Cấu hình Options

```javascript
{
  entityName: "cohort",                   // Tên entity hiển thị trong message
  searchFields: ["name", "code"],         // Các trường search (dùng ILIKE)
  requiredFields: ["code", "name"],       // Các trường bắt buộc khi create/update
  uniqueFields: ["code"],                 // Các trường unique cần check
  selectFields: ["id", "code", "name"]    // Các trường trả về cho dropdown/select
}
```

## 📚 API Methods

### 1. `getAll(customOrder)`

Lấy tất cả records.

```javascript
const result = await YourService.getAll();
// hoặc custom order
const result = await instance.getAll([["name", "ASC"]]);
```

**Response:**

```javascript
{
  code: 200,
  success: true,
  message: "Lấy danh sách your_entity thành công",
  data: [...]
}
```

---

### 2. `getList({ page, limit, search, customWhere, customOrder })`

Lấy danh sách có phân trang và tìm kiếm.

```javascript
const result = await YourService.getList({
  page: 1,
  limit: 10,
  search: "keyword",
  customWhere: { status: "active" }, // Optional
  customOrder: [["name", "ASC"]], // Optional
});
```

**Response:**

```javascript
{
  code: 200,
  success: true,
  message: "Lấy danh sách your_entity thành công",
  data: {
    list: [...],
    pagination: {
      currentPage: 1,
      totalPages: 5,
      totalItems: 50,
      itemsPerPage: 10
    }
  }
}
```

---

### 3. `getById(id, options)`

Lấy record theo ID.

```javascript
const result = await YourService.getById(1);
// hoặc với options
const result = await instance.getById(1, {
  include: [{ model: OtherModel }],
});
```

**Response:**

```javascript
{
  code: 200,
  success: true,
  message: "Lấy thông tin your_entity thành công",
  data: {...}
}
```

---

### 4. `createOrUpdate(data, id)`

Tạo mới hoặc cập nhật record.

```javascript
// Tạo mới
const result = await YourService.createOrUpdate({
  name: "New Item",
  code: "NEW001",
});

// Cập nhật
const result = await YourService.createOrUpdate(
  {
    name: "Updated Item",
    code: "UPD001",
  },
  1
);
```

**Response (Create):**

```javascript
{
  code: 201,
  success: true,
  message: "Tạo your_entity thành công",
  data: {...}
}
```

**Response (Update):**

```javascript
{
  code: 200,
  success: true,
  message: "Cập nhật your_entity thành công",
  data: {...}
}
```

---

### 5. `delete(id)`

Xóa record theo ID.

```javascript
const result = await YourService.delete(1);
```

**Response:**

```javascript
{
  code: 200,
  success: true,
  message: "Xóa your_entity thành công",
  data: { id: 1 }
}
```

---

### 6. `deleteMany(ids)`

Xóa nhiều records theo danh sách IDs.

```javascript
const result = await YourService.deleteMany([1, 2, 3]);
```

**Response:**

```javascript
{
  code: 200,
  success: true,
  message: "Xóa thành công 3 your_entity",
  data: {
    deletedIds: [1, 2, 3],
    deletedCount: 3
  }
}
```

---

### 7. `getSelect(customOrder, customWhere)`

Lấy danh sách cho dropdown/select.

```javascript
const result = await YourService.getSelect();
// hoặc với custom
const result = await instance.getSelect([["name", "ASC"]], {
  status: "active",
});
```

**Response:**

```javascript
{
  code: 200,
  success: true,
  message: "Lấy danh sách your_entity cho select thành công",
  data: [
    { id: 1, code: "C001", name: "Item 1" },
    { id: 2, code: "C002", name: "Item 2" }
  ]
}
```

---

### 8. `count(whereCondition)`

Đếm số lượng records.

```javascript
const instance = new YourService();
const count = await instance.count({ status: "active" });
```

---

### 9. `exists(whereCondition)`

Kiểm tra sự tồn tại của record.

```javascript
const instance = new YourService();
const isExist = await instance.exists({ code: "C001" });
```

## 🎨 Override Methods

Bạn có thể override bất kỳ method nào để customize logic:

```javascript
class YourService extends BaseService {
  constructor() {
    super(YourModel, {...});
  }

  // Override getAll để thêm logic riêng
  async getAll(customOrder = null) {
    // Custom logic before
    console.log('Getting all records...');

    // Call parent method
    const result = await super.getAll(customOrder);

    // Custom logic after
    console.log('Got', result.data.length, 'records');

    return result;
  }

  // Override validation
  validateData(data) {
    // Custom validation
    if (data.start_year > data.end_year) {
      return {
        code: 400,
        success: false,
        message: "Năm bắt đầu phải nhỏ hơn năm kết thúc",
        data: null
      };
    }

    // Call parent validation
    return super.validateData(data);
  }
}
```

## 📝 Ví dụ thực tế: CohortService

```javascript
const BaseService = require("./base.service");
const db = require("../models");
const Cohort = db.Cohort;

class CohortService extends BaseService {
  constructor() {
    super(Cohort, {
      entityName: "cohort",
      searchFields: ["name", "code"],
      requiredFields: ["code", "name", "start_year"],
      uniqueFields: ["code"],
      selectFields: ["id", "code", "name"],
    });
  }

  // Wrapper methods
  static getAllCohorts = async () => {
    const instance = new CohortService();
    return await instance.getAll();
  };

  static getListCohorts = async (params) => {
    const instance = new CohortService();
    return await instance.getList(params);
  };

  static getCohortById = async (id) => {
    const instance = new CohortService();
    return await instance.getById(id);
  };

  static createOrUpdateCohort = async (data, id = null) => {
    const instance = new CohortService();
    return await instance.createOrUpdate(data, id);
  };

  static deleteCohort = async (id) => {
    const instance = new CohortService();
    return await instance.delete(id);
  };

  static deleteManyCohorts = async (ids) => {
    const instance = new CohortService();
    return await instance.deleteMany(ids);
  };

  static getSelectCohorts = async () => {
    const instance = new CohortService();
    return await instance.getSelect();
  };

  // Custom method
  static getCohortsByYear = async (year) => {
    const instance = new CohortService();
    try {
      const cohorts = await instance.model.findAll({
        where: { start_year: year },
        order: [["name", "ASC"]],
      });

      return {
        code: 200,
        success: true,
        message: `Lấy danh sách cohort năm ${year} thành công`,
        data: cohorts,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy cohort theo năm: ${error.message}`);
    }
  };
}

module.exports = CohortService;
```

## 🔄 Migration từ Service cũ

### Before (271 dòng):

```javascript
class CohortService {
  static getAllCohorts = async () => {
    try {
      const cohorts = await Cohort.findAll({
        order: [["created_at", "DESC"]],
      });
      return {
        code: 200,
        success: true,
        message: "Lấy danh sách cohort thành công",
        data: cohorts,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách cohort: ${error.message}`);
    }
  };
  // ... 250+ dòng nữa
}
```

### After (90 dòng):

```javascript
class CohortService extends BaseService {
  constructor() {
    super(Cohort, {
      entityName: "cohort",
      searchFields: ["name", "code"],
      requiredFields: ["code", "name", "start_year"],
      uniqueFields: ["code"],
      selectFields: ["id", "code", "name"],
    });
  }

  static getAllCohorts = async () => {
    const instance = new CohortService();
    return await instance.getAll();
  };
  // Chỉ cần wrapper methods, logic đã có sẵn!
}
```

## 🎯 Best Practices

1. **Luôn tạo instance mới** trong static methods để tránh conflicts
2. **Override methods** khi cần logic đặc biệt
3. **Sử dụng customWhere và customOrder** thay vì viết lại toàn bộ method
4. **Validate ở Service layer**, không phụ thuộc vào database constraints
5. **Throw Error** để Controller xử lý và format response

## 🛠️ Troubleshooting

### Lỗi: "Không tìm thấy..."

- Kiểm tra `id` có đúng không
- Kiểm tra record có tồn tại trong database không

### Lỗi: "Dữ liệu không hợp lệ"

- Kiểm tra `requiredFields` trong constructor
- Đảm bảo data truyền vào đúng format

### Lỗi: "... đã tồn tại"

- Kiểm tra `uniqueFields` trong constructor
- Đảm bảo giá trị unique fields không bị trùng

## 📦 Structure

```
src/services/
├── base.service.js       # Base class chứa logic CRUD chung
├── cohort.service.js     # Service kế thừa BaseService
├── student.service.js    # Service kế thừa BaseService
├── teacher.service.js    # Service kế thừa BaseService
└── README.md            # File này
```

## 🔮 Tương lai

- [ ] Thêm soft delete support
- [ ] Thêm audit log tự động
- [ ] Thêm cache layer
- [ ] Thêm transaction support
- [ ] Thêm bulk operations

---

**Created by:** Copilot  
**Date:** 28/10/2025  
**Version:** 1.0.0
