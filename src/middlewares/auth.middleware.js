"use strict";

const AccessService = require("../services/access.service");

/**
 * Middleware xác thực JWT token
 */
const authenticate = (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        code: "4001",
        message: "Access token không được cung cấp",
        status: "error",
      });
    }

    // Verify token
    const decoded = AccessService.verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({
        code: "4002",
        message: "Access token không hợp lệ hoặc đã hết hạn",
        status: "error",
      });
    }

    // Gắn thông tin user vào request
    req.user = {
      memberId: decoded.memberId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(401).json({
      code: "4002",
      message: "Authentication failed",
      status: "error",
    });
  }
};

/**
 * Middleware kiểm tra role (optional - có thể mở rộng sau)
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        code: "4001",
        message: "Unauthorized",
        status: "error",
      });
    }

    // TODO: Kiểm tra role của user từ database
    // Hiện tại chỉ check user đã authenticate chưa

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
