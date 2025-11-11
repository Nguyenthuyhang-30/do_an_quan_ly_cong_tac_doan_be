"use strict";

const BaseService = require("./base.service");
const db = require("../models");
const { Op } = require("sequelize");

const MemberReview = db.member_review;
const YouthUnionMember = db.youth_union_member;

class MemberReviewService extends BaseService {
  constructor() {
    super(MemberReview);
  }

  /**
   * Lấy tất cả đánh giá với thông tin đoàn viên
   */
  async getAllMemberReviews() {
    try {
      const reviews = await MemberReview.findAll({
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "fullName", "email", "phoneNumber"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      return {
        message: "Lấy tất cả đánh giá thành công",
        status: 200,
        metadata: reviews,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy danh sách đánh giá với phân trang và tìm kiếm
   */
  async getListMemberReviews({
    page = 1,
    limit = 10,
    search = "",
    memberId = null,
    reviewType = null,
  }) {
    try {
      const offset = (page - 1) * limit;
      const whereClause = {};

      // Filter theo đoàn viên
      if (memberId) {
        whereClause.member_id = memberId;
      }

      // Filter theo loại đánh giá
      if (reviewType) {
        whereClause.review_type = reviewType;
      }

      // Tìm kiếm theo tiêu đề hoặc mô tả
      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const { count, rows } = await MemberReview.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "fullName", "email", "phoneNumber"],
          },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
      });

      return {
        message: "Lấy danh sách đánh giá thành công",
        status: 200,
        metadata: {
          data: rows,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: count,
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy danh sách đánh giá của một đoàn viên
   */
  async getReviewsByMember(memberId, { page = 1, limit = 10 } = {}) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await MemberReview.findAndCountAll({
        where: { member_id: memberId },
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "fullName", "email"],
          },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
      });

      return {
        message: "Lấy đánh giá của đoàn viên thành công",
        status: 200,
        metadata: {
          data: rows,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: count,
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy đánh giá theo loại
   */
  async getReviewsByType(reviewType, { page = 1, limit = 10 } = {}) {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await MemberReview.findAndCountAll({
        where: { review_type: reviewType },
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "fullName"],
          },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
      });

      return {
        message: `Lấy đánh giá loại ${reviewType} thành công`,
        status: 200,
        metadata: {
          data: rows,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: count,
            totalPages: Math.ceil(count / limit),
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tìm kiếm đánh giá nâng cao
   */
  async searchMemberReviews({
    page = 1,
    limit = 10,
    search = "",
    memberId = null,
    reviewType = null,
    minPoint = null,
    maxPoint = null,
    dateFrom = null,
    dateTo = null,
  }) {
    try {
      const offset = (page - 1) * limit;
      const whereClause = {};

      // Tìm kiếm text
      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ];
      }

      // Filter theo đoàn viên
      if (memberId) {
        whereClause.member_id = memberId;
      }

      // Filter theo loại đánh giá
      if (reviewType) {
        whereClause.review_type = reviewType;
      }

      // Filter theo điểm
      if (minPoint !== null || maxPoint !== null) {
        whereClause.point = {};
        if (minPoint !== null) whereClause.point[Op.gte] = minPoint;
        if (maxPoint !== null) whereClause.point[Op.lte] = maxPoint;
      }

      // Filter theo ngày tạo
      if (dateFrom || dateTo) {
        whereClause.created_at = {};
        if (dateFrom) whereClause.created_at[Op.gte] = new Date(dateFrom);
        if (dateTo) whereClause.created_at[Op.lte] = new Date(dateTo);
      }

      const { count, rows } = await MemberReview.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "fullName", "email"],
          },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
      });

      return {
        message: "Tìm kiếm đánh giá thành công",
        status: 200,
        metadata: {
          data: rows,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: count,
            totalPages: Math.ceil(count / limit),
          },
          filters: {
            search,
            memberId,
            reviewType,
            minPoint,
            maxPoint,
            dateFrom,
            dateTo,
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tính tổng điểm đánh giá của đoàn viên
   */
  async getMemberTotalPoints(memberId) {
    try {
      const reviews = await MemberReview.findAll({
        where: { member_id: memberId },
        attributes: ["point", "review_type"],
      });

      const totalPoints = reviews.reduce(
        (sum, review) => sum + (review.point || 0),
        0
      );

      const pointsByType = reviews.reduce((acc, review) => {
        const type = review.review_type || "other";
        acc[type] = (acc[type] || 0) + (review.point || 0);
        return acc;
      }, {});

      return {
        message: "Tính tổng điểm đánh giá thành công",
        status: 200,
        metadata: {
          memberId,
          totalPoints,
          reviewCount: reviews.length,
          pointsByType,
          averagePoint:
            reviews.length > 0 ? (totalPoints / reviews.length).toFixed(2) : 0,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy thống kê đánh giá
   */
  async getMemberReviewStatistics() {
    try {
      const [
        totalReviews,
        reviewsByType,
        topMembers,
        recentReviews,
        pointStats,
      ] = await Promise.all([
        // Tổng số đánh giá
        MemberReview.count(),

        // Phân loại theo loại đánh giá
        MemberReview.findAll({
          attributes: [
            "review_type",
            [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
            [db.sequelize.fn("SUM", db.sequelize.col("point")), "totalPoints"],
            [db.sequelize.fn("AVG", db.sequelize.col("point")), "avgPoints"],
          ],
          group: ["review_type"],
          raw: true,
        }),

        // Top 5 đoàn viên có nhiều đánh giá nhất
        MemberReview.findAll({
          attributes: [
            "member_id",
            [db.sequelize.fn("COUNT", db.sequelize.col("id")), "reviewCount"],
            [db.sequelize.fn("SUM", db.sequelize.col("point")), "totalPoints"],
          ],
          include: [
            {
              model: YouthUnionMember,
              as: "member",
              attributes: ["id", "code", "fullName"],
            },
          ],
          group: ["member_id", "member.id"],
          order: [[db.sequelize.literal('"reviewCount"'), "DESC"]],
          limit: 5,
          raw: false,
        }),

        // 5 đánh giá gần đây
        MemberReview.findAll({
          include: [
            {
              model: YouthUnionMember,
              as: "member",
              attributes: ["id", "code", "fullName"],
            },
          ],
          order: [["created_at", "DESC"]],
          limit: 5,
        }),

        // Thống kê điểm
        MemberReview.findOne({
          attributes: [
            [db.sequelize.fn("MAX", db.sequelize.col("point")), "maxPoint"],
            [db.sequelize.fn("MIN", db.sequelize.col("point")), "minPoint"],
            [db.sequelize.fn("AVG", db.sequelize.col("point")), "avgPoint"],
            [db.sequelize.fn("SUM", db.sequelize.col("point")), "totalPoints"],
          ],
          raw: true,
        }),
      ]);

      return {
        message: "Lấy thống kê đánh giá thành công",
        status: 200,
        metadata: {
          totalReviews,
          reviewsByType,
          topMembers,
          recentReviews,
          pointStats: {
            maxPoint: parseFloat(pointStats.maxPoint || 0),
            minPoint: parseFloat(pointStats.minPoint || 0),
            avgPoint: parseFloat(pointStats.avgPoint || 0).toFixed(2),
            totalPoints: parseInt(pointStats.totalPoints || 0),
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tạo nhiều đánh giá cùng lúc
   */
  async batchCreateReviews(reviews, createdBy) {
    const transaction = await db.sequelize.transaction();

    try {
      const reviewsWithCreator = reviews.map((review) => ({
        ...review,
        created_by: createdBy,
      }));

      const createdReviews = await MemberReview.bulkCreate(reviewsWithCreator, {
        transaction,
        returning: true,
      });

      await transaction.commit();

      return {
        message: "Tạo nhiều đánh giá thành công",
        status: 201,
        metadata: {
          createdCount: createdReviews.length,
          reviews: createdReviews,
        },
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Xóa đánh giá theo đoàn viên
   */
  async deleteReviewsByMember(memberId) {
    const transaction = await db.sequelize.transaction();

    try {
      const deletedCount = await MemberReview.destroy({
        where: { member_id: memberId },
        transaction,
      });

      await transaction.commit();

      return {
        message: "Xóa đánh giá của đoàn viên thành công",
        status: 200,
        metadata: {
          deletedCount,
        },
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Cập nhật điểm đánh giá
   */
  async updateReviewPoint(reviewId, point) {
    try {
      const review = await MemberReview.findByPk(reviewId);

      if (!review) {
        return {
          message: "Không tìm thấy đánh giá",
          status: 404,
        };
      }

      review.point = point;
      await review.save();

      return {
        message: "Cập nhật điểm đánh giá thành công",
        status: 200,
        metadata: review,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy lịch sử đánh giá của đoàn viên theo thời gian
   */
  async getMemberReviewHistory(memberId, { year = null, month = null } = {}) {
    try {
      const whereClause = { member_id: memberId };

      if (year) {
        const startDate = new Date(year, month ? month - 1 : 0, 1);
        const endDate = month
          ? new Date(year, month, 0, 23, 59, 59)
          : new Date(year, 11, 31, 23, 59, 59);

        whereClause.created_at = {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        };
      }

      const reviews = await MemberReview.findAll({
        where: whereClause,
        include: [
          {
            model: YouthUnionMember,
            as: "member",
            attributes: ["id", "code", "fullName"],
          },
        ],
        order: [["created_at", "ASC"]],
      });

      const totalPoints = reviews.reduce(
        (sum, review) => sum + (review.point || 0),
        0
      );

      return {
        message: "Lấy lịch sử đánh giá thành công",
        status: 200,
        metadata: {
          memberId,
          period: { year, month },
          reviews,
          summary: {
            totalReviews: reviews.length,
            totalPoints,
            averagePoint:
              reviews.length > 0
                ? (totalPoints / reviews.length).toFixed(2)
                : 0,
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MemberReviewService();
