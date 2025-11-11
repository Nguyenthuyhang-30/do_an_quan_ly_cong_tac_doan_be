"use strict";

const AccessService = require("../services/access.service");

/**
 * AccessController - Xử lý HTTP requests cho authentication
 */
class AccessController {
  /**
   * Đăng ký tài khoản mới
   * POST /api/v1/access/signup
   */
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp::`, req.body);

      const { email, password, userName, fullName, phoneNumber } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          code: "4000",
          message: "Email và password là bắt buộc",
          status: "error",
        });
      }

      const result = await AccessService.signUp({
        email,
        password,
        userName,
        fullName,
        phoneNumber,
      });

      // Xử lý response code
      const statusCode = result.code === "0000" ? 201 : 400;

      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("SignUp controller error:", error);
      next(error);
    }
  };

  /**
   * Đăng nhập
   * POST /api/v1/access/signin
   */
  signIn = async (req, res, next) => {
    try {
      console.log(`[P]::signIn::`, req.body);

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          code: "4000",
          message: "Email và password là bắt buộc",
          status: "error",
        });
      }

      const result = await AccessService.signIn({ email, password });

      const statusCode = result.code === "0000" ? 200 : 401;

      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("SignIn controller error:", error);
      next(error);
    }
  };

  /**
   * Đăng xuất
   * POST /api/v1/access/signout
   */
  signOut = async (req, res, next) => {
    try {
      console.log(`[P]::signOut::`, req.user);

      // Lấy memberId từ token (đã được decode bởi middleware)
      const memberId = req.user?.memberId;

      if (!memberId) {
        return res.status(401).json({
          code: "4001",
          message: "Unauthorized",
          status: "error",
        });
      }

      const result = await AccessService.signOut(memberId);

      return res.status(200).json(result);
    } catch (error) {
      console.error("SignOut controller error:", error);
      next(error);
    }
  };

  /**
   * Refresh access token
   * POST /api/v1/access/refresh
   */
  refreshToken = async (req, res, next) => {
    try {
      console.log(`[P]::refreshToken::`);

      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          code: "4000",
          message: "Refresh token là bắt buộc",
          status: "error",
        });
      }

      const result = await AccessService.refreshToken(refreshToken);

      const statusCode = result.code === "0000" ? 200 : 401;

      return res.status(statusCode).json(result);
    } catch (error) {
      console.error("RefreshToken controller error:", error);
      next(error);
    }
  };
}

module.exports = new AccessController();
