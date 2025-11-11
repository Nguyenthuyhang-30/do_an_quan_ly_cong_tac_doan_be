"use strict";

const MemberRoleService = require("../services/member_role.service");

class MemberRoleController {
  // Gán vai trò cho đoàn viên
  assignRole = async (req, res) => {
    try {
      const { memberId, roleId } = req.body;
      const result = await MemberRoleService.assignRole(memberId, roleId);

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

  // Gỡ vai trò của đoàn viên
  removeRole = async (req, res) => {
    try {
      const { memberId, roleId } = req.params;
      const result = await MemberRoleService.removeRole(
        parseInt(memberId),
        parseInt(roleId)
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

  // Lấy danh sách vai trò của đoàn viên
  getMemberRoles = async (req, res) => {
    try {
      const { memberId } = req.params;
      const result = await MemberRoleService.getMemberRoles(parseInt(memberId));

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

  // Lấy danh sách đoàn viên theo vai trò
  getMembersByRole = async (req, res) => {
    try {
      const { roleId } = req.params;
      const { page, limit, search } = req.query;

      const result = await MemberRoleService.getMembersByRole(
        parseInt(roleId),
        { page, limit, search }
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

  // Thay đổi vai trò của đoàn viên
  changeRole = async (req, res) => {
    try {
      const { memberId, oldRoleId, newRoleId } = req.body;
      const result = await MemberRoleService.changeRole(
        memberId,
        oldRoleId,
        newRoleId
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

  // Gán nhiều vai trò cho đoàn viên
  assignMultipleRoles = async (req, res) => {
    try {
      const { memberId, roleIds } = req.body;
      const result = await MemberRoleService.assignMultipleRoles(
        memberId,
        roleIds
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

  // Lấy thống kê vai trò
  getRoleStatistics = async (req, res) => {
    try {
      const result = await MemberRoleService.getRoleStatistics();
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

module.exports = new MemberRoleController();
