"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const FileUpload = db.FileUpload;
const YouthUnionMember = db.YouthUnionMember;
const YouthUnionBranch = db.YouthUnionBranch;

/**
 * FileUploadService - Service quản lý file upload
 * Kế thừa từ BaseService để sử dụng các phương thức CRUD chuẩn
 */
class FileUploadService extends BaseService {
  constructor() {
    super(FileUpload, {
      entityName: "file_upload",
      searchFields: ["file_name", "description"], // Các trường để search
      requiredFields: ["file_name", "file_url"], // Các trường bắt buộc
      selectFields: ["id", "file_name", "file_url"], // Các trường cho dropdown/select
    });
  }

  // ============================================================
  // WRAPPER METHODS - Giữ API tương thích
  // ============================================================

  /**
   * Lấy tất cả file upload
   * @returns {Promise<Object>}
   */
  static getAllFileUploads = async () => {
    const instance = new FileUploadService();
    try {
      const files = await instance.model.findAll({
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "full_name", "code"],
          },
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["id", "name", "code"],
          },
        ],
        order: [["uploaded_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách file thành công",
        data: files,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách file: ${error.message}`);
    }
  };

  /**
   * Lấy danh sách file upload có phân trang
   * @param {Object} params - { page, limit, search, memberId, branchId }
   * @returns {Promise<Object>}
   */
  static getListFileUploads = async (params) => {
    const instance = new FileUploadService();
    try {
      const { page = 1, limit = 10, search = "", memberId, branchId } = params;

      const where = {};

      // Tìm kiếm theo tên file hoặc description
      if (search) {
        where[db.Sequelize.Op.or] = [
          { file_name: { [db.Sequelize.Op.like]: `%${search}%` } },
          { description: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }

      // Lọc theo member
      if (memberId) {
        where.member_id = memberId;
      }

      // Lọc theo branch
      if (branchId) {
        where.branch_id = branchId;
      }

      const offset = (page - 1) * limit;

      const { rows, count } = await instance.model.findAndCountAll({
        where,
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "full_name", "code"],
          },
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["id", "name", "code"],
          },
        ],
        limit: parseInt(limit),
        offset: offset,
        order: [["uploaded_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách file thành công",
        data: {
          files: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách file: ${error.message}`);
    }
  };

  /**
   * Lấy file upload theo ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static getFileUploadById = async (id) => {
    const instance = new FileUploadService();
    try {
      const file = await instance.model.findByPk(id, {
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "full_name", "code", "email"],
          },
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["id", "name", "code", "description"],
          },
        ],
      });

      if (!file) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy file",
        };
      }

      return {
        code: 200,
        success: true,
        message: "Lấy thông tin file thành công",
        data: file,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin file: ${error.message}`);
    }
  };

  /**
   * Tạo mới file upload record
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static createFileUpload = async (data) => {
    const instance = new FileUploadService();
    try {
      // Validate member_id nếu có
      if (data.memberId) {
        const member = await YouthUnionMember.findByPk(data.memberId);
        if (!member) {
          return {
            code: 400,
            success: false,
            message: `Đoàn viên với ID ${data.memberId} không tồn tại`,
          };
        }
      }

      // Validate branch_id nếu có
      if (data.branchId) {
        const branch = await YouthUnionBranch.findByPk(data.branchId);
        if (!branch) {
          return {
            code: 400,
            success: false,
            message: `Chi đoàn với ID ${data.branchId} không tồn tại`,
          };
        }
      }

      const newFile = await instance.model.create({
        member_id: data.memberId || null,
        branch_id: data.branchId || null,
        file_name: data.fileName,
        file_url: data.fileUrl,
        description: data.description || null,
        uploaded_by: data.uploadedBy || null,
        uploaded_at: new Date(),
      });

      return {
        code: 201,
        success: true,
        message: "Upload file thành công",
        data: newFile,
      };
    } catch (error) {
      throw new Error(`Lỗi khi upload file: ${error.message}`);
    }
  };

  /**
   * Cập nhật thông tin file upload
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static updateFileUpload = async (id, data) => {
    const instance = new FileUploadService();
    try {
      const file = await instance.model.findByPk(id);
      if (!file) {
        return {
          code: 404,
          success: false,
          message: "Không tìm thấy file",
        };
      }

      // Validate member_id nếu có và khác null
      if (data.memberId !== undefined && data.memberId !== null) {
        const member = await YouthUnionMember.findByPk(data.memberId);
        if (!member) {
          return {
            code: 400,
            success: false,
            message: `Đoàn viên với ID ${data.memberId} không tồn tại`,
          };
        }
      }

      // Validate branch_id nếu có và khác null
      if (data.branchId !== undefined && data.branchId !== null) {
        const branch = await YouthUnionBranch.findByPk(data.branchId);
        if (!branch) {
          return {
            code: 400,
            success: false,
            message: `Chi đoàn với ID ${data.branchId} không tồn tại`,
          };
        }
      }

      await file.update({
        file_name: data.fileName || file.file_name,
        description: data.description || file.description,
        member_id: data.memberId !== undefined ? data.memberId : file.member_id,
        branch_id: data.branchId !== undefined ? data.branchId : file.branch_id,
      });

      return {
        code: 200,
        success: true,
        message: "Cập nhật thông tin file thành công",
        data: file,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật thông tin file: ${error.message}`);
    }
  };

  /**
   * Xóa file upload
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static deleteFileUpload = async (id) => {
    const instance = new FileUploadService();
    return await instance.delete(id);
  };

  /**
   * Xóa nhiều file upload
   * @param {Array<number>} ids
   * @returns {Promise<Object>}
   */
  static deleteManyFileUploads = async (ids) => {
    const instance = new FileUploadService();
    return await instance.deleteMany(ids);
  };

  // ============================================================
  // CUSTOM METHODS - Các phương thức đặc biệt
  // ============================================================

  /**
   * Lấy danh sách file theo member
   * @param {number} memberId
   * @param {Object} params - { page, limit }
   * @returns {Promise<Object>}
   */
  static getFilesByMember = async (memberId, params = {}) => {
    const instance = new FileUploadService();
    try {
      const { page = 1, limit = 10 } = params;
      const offset = (page - 1) * limit;

      const { rows, count } = await instance.model.findAndCountAll({
        where: { member_id: memberId },
        limit: parseInt(limit),
        offset: offset,
        order: [["uploaded_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách file của đoàn viên thành công",
        data: {
          files: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách file của đoàn viên: ${error.message}`
      );
    }
  };

  /**
   * Lấy danh sách file theo branch
   * @param {number} branchId
   * @param {Object} params - { page, limit }
   * @returns {Promise<Object>}
   */
  static getFilesByBranch = async (branchId, params = {}) => {
    const instance = new FileUploadService();
    try {
      const { page = 1, limit = 10 } = params;
      const offset = (page - 1) * limit;

      const { rows, count } = await instance.model.findAndCountAll({
        where: { branch_id: branchId },
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "full_name", "code"],
          },
        ],
        limit: parseInt(limit),
        offset: offset,
        order: [["uploaded_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy danh sách file của chi đoàn thành công",
        data: {
          files: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách file của chi đoàn: ${error.message}`
      );
    }
  };

  /**
   * Lấy thống kê file upload
   * @returns {Promise<Object>}
   */
  static getFileUploadStatistics = async () => {
    const instance = new FileUploadService();
    try {
      const total = await instance.model.count();

      const byMember = await instance.model.count({
        where: {
          member_id: { [db.Sequelize.Op.ne]: null },
        },
      });

      const byBranch = await instance.model.count({
        where: {
          branch_id: { [db.Sequelize.Op.ne]: null },
        },
      });

      // Top uploaders
      const topUploaders = await db.sequelize.query(
        `
        SELECT 
          m.id, 
          m.full_name, 
          m.code,
          COUNT(f.id) as file_count
        FROM file_uploads f
        INNER JOIN youth_union_members m ON f.member_id = m.id
        GROUP BY m.id, m.full_name, m.code
        ORDER BY file_count DESC
        LIMIT 10
      `,
        {
          type: db.Sequelize.QueryTypes.SELECT,
        }
      );

      // Recent uploads
      const recentUploads = await instance.model.findAll({
        limit: 10,
        order: [["uploaded_at", "DESC"]],
        attributes: ["id", "file_name", "uploaded_at"],
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "full_name"],
          },
        ],
      });

      return {
        code: 200,
        success: true,
        message: "Lấy thống kê file upload thành công",
        data: {
          total,
          byMember,
          byBranch,
          topUploaders,
          recentUploads,
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thống kê file upload: ${error.message}`);
    }
  };

  /**
   * Tìm kiếm file nâng cao
   * @param {Object} filters - { search, memberId, branchId, dateFrom, dateTo }
   * @returns {Promise<Object>}
   */
  static searchFileUploads = async (filters = {}) => {
    const instance = new FileUploadService();
    try {
      const {
        search = "",
        memberId,
        branchId,
        dateFrom,
        dateTo,
        page = 1,
        limit = 10,
      } = filters;

      const where = {};

      if (search) {
        where[db.Sequelize.Op.or] = [
          { file_name: { [db.Sequelize.Op.like]: `%${search}%` } },
          { description: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }

      if (memberId) {
        where.member_id = memberId;
      }

      if (branchId) {
        where.branch_id = branchId;
      }

      if (dateFrom || dateTo) {
        where.uploaded_at = {};
        if (dateFrom) {
          where.uploaded_at[db.Sequelize.Op.gte] = new Date(dateFrom);
        }
        if (dateTo) {
          where.uploaded_at[db.Sequelize.Op.lte] = new Date(dateTo);
        }
      }

      const offset = (page - 1) * limit;

      const { rows, count } = await instance.model.findAndCountAll({
        where,
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "full_name", "code"],
          },
          {
            model: YouthUnionBranch,
            as: "branch",
            attributes: ["id", "name", "code"],
          },
        ],
        limit: parseInt(limit),
        offset: offset,
        order: [["uploaded_at", "DESC"]],
      });

      return {
        code: 200,
        success: true,
        message: "Tìm kiếm file thành công",
        data: {
          files: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw new Error(`Lỗi khi tìm kiếm file: ${error.message}`);
    }
  };

  /**
   * Batch upload files
   * @param {Array} filesData - Array of file data objects
   * @returns {Promise<Object>}
   */
  static batchUploadFiles = async (filesData) => {
    const instance = new FileUploadService();
    const transaction = await db.sequelize.transaction();

    try {
      const uploadedFiles = [];

      for (const fileData of filesData) {
        const newFile = await instance.model.create(
          {
            member_id: fileData.memberId || null,
            branch_id: fileData.branchId || null,
            file_name: fileData.fileName,
            file_url: fileData.fileUrl,
            description: fileData.description || null,
            uploaded_by: fileData.uploadedBy || null,
            uploaded_at: new Date(),
          },
          { transaction }
        );
        uploadedFiles.push(newFile);
      }

      await transaction.commit();

      return {
        code: 201,
        success: true,
        message: `Upload ${uploadedFiles.length} file(s) thành công`,
        data: uploadedFiles,
      };
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Lỗi khi batch upload files: ${error.message}`);
    }
  };
}

module.exports = FileUploadService;
