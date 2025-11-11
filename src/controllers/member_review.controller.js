"use strict";

const MemberReviewService = require("../services/member_review.service");

class MemberReviewController {
  // Lấy tất cả đánh giá
  async getAllMemberReviews(req, res, next) {
    try {
      const result = await MemberReviewService.getAllMemberReviews();
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy danh sách đánh giá với phân trang
  async getListMemberReviews(req, res, next) {
    try {
      const { page, limit, search, memberId, reviewType } = req.query;
      const result = await MemberReviewService.getListMemberReviews({
        page,
        limit,
        search,
        memberId,
        reviewType,
      });
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy đánh giá theo ID
  async getMemberReviewById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await MemberReviewService.getById(id);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy đánh giá của một đoàn viên
  async getReviewsByMember(req, res, next) {
    try {
      const { memberId } = req.params;
      const { page, limit } = req.query;
      const result = await MemberReviewService.getReviewsByMember(memberId, {
        page,
        limit,
      });
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy đánh giá theo loại
  async getReviewsByType(req, res, next) {
    try {
      const { type } = req.params;
      const { page, limit } = req.query;
      const result = await MemberReviewService.getReviewsByType(type, {
        page,
        limit,
      });
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Tìm kiếm đánh giá nâng cao
  async searchMemberReviews(req, res, next) {
    try {
      const {
        page,
        limit,
        search,
        memberId,
        reviewType,
        minPoint,
        maxPoint,
        dateFrom,
        dateTo,
      } = req.query;

      const result = await MemberReviewService.searchMemberReviews({
        page,
        limit,
        search,
        memberId,
        reviewType,
        minPoint,
        maxPoint,
        dateFrom,
        dateTo,
      });
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy tổng điểm của đoàn viên
  async getMemberTotalPoints(req, res, next) {
    try {
      const { memberId } = req.params;
      const result = await MemberReviewService.getMemberTotalPoints(memberId);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy thống kê đánh giá
  async getMemberReviewStatistics(req, res, next) {
    try {
      const result = await MemberReviewService.getMemberReviewStatistics();
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy lịch sử đánh giá
  async getMemberReviewHistory(req, res, next) {
    try {
      const { memberId } = req.params;
      const { year, month } = req.query;
      const result = await MemberReviewService.getMemberReviewHistory(
        memberId,
        { year, month }
      );
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Lấy danh sách cho dropdown
  async getSelectMemberReviews(req, res, next) {
    try {
      const result = await MemberReviewService.getSelect();
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Tạo đánh giá mới
  async createMemberReview(req, res, next) {
    try {
      const reviewData = req.body;
      const result = await MemberReviewService.createOrUpdate(reviewData);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Tạo nhiều đánh giá cùng lúc
  async batchCreateReviews(req, res, next) {
    try {
      const { reviews } = req.body;
      const createdBy = req.user?.id || null; // Lấy từ auth middleware
      const result = await MemberReviewService.batchCreateReviews(
        reviews,
        createdBy
      );
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật đánh giá
  async updateMemberReview(req, res, next) {
    try {
      const { id } = req.params;
      const reviewData = { ...req.body, id: parseInt(id) };
      const result = await MemberReviewService.createOrUpdate(reviewData);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật điểm đánh giá
  async updateReviewPoint(req, res, next) {
    try {
      const { id } = req.params;
      const { point } = req.body;
      const result = await MemberReviewService.updateReviewPoint(id, point);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Xóa đánh giá
  async deleteMemberReview(req, res, next) {
    try {
      const { id } = req.params;
      const result = await MemberReviewService.delete(id);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Xóa nhiều đánh giá
  async deleteManyMemberReviews(req, res, next) {
    try {
      const { ids } = req.body;
      const result = await MemberReviewService.deleteMany(ids);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }

  // Xóa đánh giá theo đoàn viên
  async deleteReviewsByMember(req, res, next) {
    try {
      const { memberId } = req.params;
      const result = await MemberReviewService.deleteReviewsByMember(memberId);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MemberReviewController();
