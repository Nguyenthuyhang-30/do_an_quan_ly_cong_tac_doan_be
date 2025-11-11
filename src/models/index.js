const { Sequelize } = require("sequelize");
const {
  db: { host, name, port, username, password, dialect },
} = require("../configs/config.postgre");

const sequelize = new Sequelize(name, username, password, {
  host,
  port,
  dialect,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Định nghĩa model Cohort
db.Cohort = require("./cohort.model")(sequelize, Sequelize);

db.Activity = require("./activity.model")(sequelize, Sequelize);

db.AuditLog = require("./audit_log.model")(sequelize, Sequelize);

db.ContentIntroduct = require("./content_introduct.model")(
  sequelize,
  Sequelize
);

db.FileUpload = require("./file_upload.model")(sequelize, Sequelize);

db.Key = require("./key.model")(sequelize, Sequelize);

db.MemberReview = require("./member_review.model")(sequelize, Sequelize);

db.MemberRole = require("./member_role.model")(sequelize, Sequelize);

db.MemberToken = require("./member_token.model")(sequelize, Sequelize);

db.Permission = require("./permission.model")(sequelize, Sequelize);

db.RolePermission = require("./role_permission.model")(sequelize, Sequelize);

db.Role = require("./role.model")(sequelize, Sequelize);

db.SliderBanner = require("./slider_banner.model")(sequelize, Sequelize);

db.YouthUnionBranch = require("./youth_union_branch.model")(
  sequelize,
  Sequelize
);

db.YouthUnionMemberActivityMap =
  require("./youth_union_member_activity_map.model")(sequelize, Sequelize);

db.YouthUnionMemberBranchHistory =
  require("./youth_union_member_branch_history.model")(sequelize, Sequelize);

db.YouthUnionMember = require("./youth_union_member.model")(
  sequelize,
  Sequelize
);

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
