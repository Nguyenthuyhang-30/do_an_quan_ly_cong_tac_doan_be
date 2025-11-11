"use strict";

const MemberTransferService = require("../services/member_transfer.service");

class MemberTransferController {
  // Điều chuyển đoàn viên
  transferMember = async (req, res) => {
    try {
      const { memberId, branchId, position, startDate, note } = req.body;
      const createdBy = req.user?.id || null; // Lấy từ middleware auth nếu có

      const result = await MemberTransferService.transferMember({
        memberId,
        branchId,
        position,
        startDate,
        note,
        createdBy,
      });

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy lịch sử điều chuyển của đoàn viên
  getMemberTransferHistory = async (req, res) => {
    try {
      const { memberId } = req.params;
      const { page, limit } = req.query;

      const result = await MemberTransferService.getMemberTransferHistory(
        memberId,
        { page, limit }
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy chi đoàn hiện tại của đoàn viên
  getCurrentBranch = async (req, res) => {
    try {
      const { memberId } = req.params;
      const result = await MemberTransferService.getCurrentBranch(memberId);

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Cập nhật thông tin điều chuyển
  updateTransferHistory = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await MemberTransferService.updateTransferHistory(
        id,
        req.body
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Kết thúc điều chuyển hiện tại
  endCurrentTransfer = async (req, res) => {
    try {
      const { memberId } = req.params;
      const { endDate } = req.body;

      const result = await MemberTransferService.endCurrentTransfer(
        memberId,
        endDate
      );

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy danh sách điều chuyển theo khoảng thời gian
  getTransfersByDateRange = async (req, res) => {
    try {
      const { startDate, endDate, branchId, page, limit } = req.query;

      const result = await MemberTransferService.getTransfersByDateRange({
        startDate,
        endDate,
        branchId: branchId ? parseInt(branchId) : null,
        page,
        limit,
      });

      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };

  // Lấy thống kê điều chuyển
  getTransferStatistics = async (req, res) => {
    try {
      const result = await MemberTransferService.getTransferStatistics();
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
}

module.exports = new MemberTransferController();
