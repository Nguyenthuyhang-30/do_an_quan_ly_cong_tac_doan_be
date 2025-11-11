module.exports = (sequelize, Sequelize) => {
  const YouthUnionMemberBranchHistory = sequelize.define(
    "youth_union_member_branch_history",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      position: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      modified_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      modified_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "youth_union_member_branch_histories",
    }
  );

  // Associations
  YouthUnionMemberBranchHistory.associate = (models) => {
    YouthUnionMemberBranchHistory.belongsTo(models.YouthUnionMember, {
      foreignKey: "member_id",
      as: "member",
    });

    YouthUnionMemberBranchHistory.belongsTo(models.YouthUnionBranch, {
      foreignKey: "branch_id",
      as: "branch",
    });
  };

  return YouthUnionMemberBranchHistory;
};
