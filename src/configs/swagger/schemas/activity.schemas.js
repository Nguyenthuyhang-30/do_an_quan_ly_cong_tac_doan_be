/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của hoạt động
 *         code:
 *           type: string
 *           description: Mã hoạt động
 *         name:
 *           type: string
 *           description: Tên hoạt động
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Ngày bắt đầu
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: Ngày kết thúc
 *         is_required:
 *           type: boolean
 *           description: Có bắt buộc tham gia không
 *         location:
 *           type: string
 *           description: Địa điểm tổ chức
 *         description:
 *           type: string
 *           description: Mô tả hoạt động
 *         created_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           type: integer
 *         modified_at:
 *           type: string
 *           format: date-time
 *         modified_by:
 *           type: integer
 *       example:
 *         id: 1
 *         code: "ACT001"
 *         name: "Hội thảo kỹ năng mềm"
 *         start_date: "2024-12-20T08:00:00Z"
 *         end_date: "2024-12-20T17:00:00Z"
 *         is_required: true
 *         location: "Hội trường A"
 *         description: "Hội thảo về phát triển kỹ năng mềm cho sinh viên"
 *
 *     ActivityInput:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - start_date
 *       properties:
 *         code:
 *           type: string
 *           description: Mã hoạt động (bắt buộc, unique)
 *         name:
 *           type: string
 *           description: Tên hoạt động (bắt buộc)
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Ngày bắt đầu (bắt buộc)
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: Ngày kết thúc
 *         is_required:
 *           type: boolean
 *           description: Có bắt buộc tham gia không
 *         location:
 *           type: string
 *           description: Địa điểm tổ chức
 *         description:
 *           type: string
 *           description: Mô tả hoạt động
 *       example:
 *         code: "ACT001"
 *         name: "Hội thảo kỹ năng mềm"
 *         start_date: "2024-12-20T08:00:00Z"
 *         end_date: "2024-12-20T17:00:00Z"
 *         is_required: true
 *         location: "Hội trường A"
 *         description: "Hội thảo về phát triển kỹ năng mềm cho sinh viên"
 *
 *     ActivityRegistration:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID của đăng ký
 *         member_id:
 *           type: integer
 *           description: ID thành viên
 *         activity_id:
 *           type: integer
 *           description: ID hoạt động
 *         code:
 *           type: string
 *           description: Mã đăng ký
 *         check_in:
 *           type: string
 *           format: date-time
 *           description: Thời gian check-in
 *         check_out:
 *           type: string
 *           format: date-time
 *           description: Thời gian check-out
 *         checking_attendence:
 *           type: integer
 *           description: Trạng thái điểm danh (0-Vắng, 1-Có mặt, 2-Có phép, 3-Trễ)
 *         created_at:
 *           type: string
 *           format: date-time
 *         member:
 *           $ref: '#/components/schemas/MemberBasicInfo'
 *         activity:
 *           $ref: '#/components/schemas/Activity'
 *       example:
 *         id: 1
 *         member_id: 10
 *         activity_id: 5
 *         code: "REG-5-10-1234567890"
 *         check_in: "2024-12-20T08:15:00Z"
 *         check_out: "2024-12-20T16:45:00Z"
 *         checking_attendence: 2
 *
 *     MemberBasicInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         student_code:
 *           type: string
 *         avatar_url:
 *           type: string
 *
 *     RegisterMemberInput:
 *       type: object
 *       required:
 *         - memberId
 *       properties:
 *         memberId:
 *           type: integer
 *           description: ID thành viên (bắt buộc)
 *         code:
 *           type: string
 *           description: Mã đăng ký (tùy chọn)
 *       example:
 *         memberId: 10
 *         code: "CUSTOM-REG-CODE"
 *
 *     UpdateAttendanceInput:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: integer
 *           description: Trạng thái điểm danh (0-Vắng, 1-Có mặt, 2-Có phép, 3-Trễ)
 *       example:
 *         status: 1
 *
 *     BulkCheckInInput:
 *       type: object
 *       required:
 *         - memberIds
 *       properties:
 *         memberIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: Danh sách ID thành viên cần check-in
 *       example:
 *         memberIds: [1, 2, 3, 4, 5]
 *
 *     AttendanceStatistics:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Tổng số đăng ký
 *         checkedIn:
 *           type: integer
 *           description: Số người đã check-in
 *         checkedOut:
 *           type: integer
 *           description: Số người đã check-out
 *         notCheckedIn:
 *           type: integer
 *           description: Số người chưa check-in
 *         attendanceRate:
 *           type: string
 *           description: Tỷ lệ tham dự (%)
 *         statusStats:
 *           type: object
 *           properties:
 *             absent:
 *               type: integer
 *               description: Số người vắng
 *             present:
 *               type: integer
 *               description: Số người có mặt
 *             excused:
 *               type: integer
 *               description: Số người có phép
 *             late:
 *               type: integer
 *               description: Số người đi trễ
 *       example:
 *         total: 50
 *         checkedIn: 45
 *         checkedOut: 40
 *         notCheckedIn: 5
 *         attendanceRate: "90.00"
 *         statusStats:
 *           absent: 3
 *           present: 42
 *           excused: 2
 *           late: 3
 */

module.exports = {};
