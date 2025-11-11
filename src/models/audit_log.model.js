module.exports = (sequelize, Sequelize) => {
  const AuditLog = sequelize.define(
    "audit_log",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      action: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
      tableName: "audit_logs",
    }
  );

  // Association (nếu đã có YouthUnionMember trong hệ thống)
  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.YouthUnionMember, {
      foreignKey: "member_id",
      as: "member",
    });
  };

  return AuditLog;
};
