module.exports = (sequelize, Sequelize) => {
  const FileUpload = sequelize.define(
    "file_upload",
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
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      file_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      uploaded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      uploaded_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "file_uploads",
    }
  );

  // Nếu có model YouthUnionMember và YouthUnionBranch trong hệ thống
  FileUpload.associate = (models) => {
    FileUpload.belongsTo(models.youth_union_member, {
      foreignKey: "member_id",
      as: "member",
    });

    FileUpload.belongsTo(models.youth_union_branch, {
      foreignKey: "branch_id",
      as: "branch",
    });
  };

  return FileUpload;
};
