/**
 * @swagger
 * components:
 *   responses:
 *     ActivityResponse:
 *       description: Successful response with activity data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Lấy thông tin hoạt động thành công"
 *               data:
 *                 $ref: '#/components/schemas/Activity'
 *
 *     ActivityArrayResponse:
 *       description: Successful response with array of activities
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Lấy danh sách hoạt động thành công"
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Activity'
 *
 *     ActivityListResponse:
 *       description: Successful response with paginated activity list
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Lấy danh sách hoạt động thành công"
 *               data:
 *                 type: object
 *                 properties:
 *                   list:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Activity'
 *                   pagination:
 *                     $ref: '#/components/schemas/Pagination'
 *
 *     ActivityRegistrationResponse:
 *       description: Successful response with registration data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 201
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Đăng ký hoạt động thành công"
 *               data:
 *                 $ref: '#/components/schemas/ActivityRegistration'
 *
 *     ActivityRegistrationListResponse:
 *       description: Successful response with list of registrations
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Lấy danh sách thành viên đã đăng ký thành công"
 *               data:
 *                 type: object
 *                 properties:
 *                   list:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/ActivityRegistration'
 *                   pagination:
 *                     $ref: '#/components/schemas/Pagination'
 *
 *     AttendanceStatisticsResponse:
 *       description: Successful response with attendance statistics
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Lấy thống kê điểm danh thành công"
 *               data:
 *                 $ref: '#/components/schemas/AttendanceStatistics'
 *
 *     CheckInResponse:
 *       description: Successful check-in response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Check-in thành công"
 *               data:
 *                 $ref: '#/components/schemas/ActivityRegistration'
 *
 *     BulkCheckInResponse:
 *       description: Successful bulk check-in response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 200
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Check-in hàng loạt hoàn tất"
 *               data:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     description: Danh sách ID thành viên check-in thành công
 *                   failed:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         memberId:
 *                           type: integer
 *                         reason:
 *                           type: string
 *                     description: Danh sách thành viên check-in thất bại
 */

module.exports = {};
