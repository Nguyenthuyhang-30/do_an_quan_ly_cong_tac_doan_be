module.exports = (sequelize, Sequelize) => {
  const YouthUnionMemberActivityMap = sequelize.define(
    "youth_union_member_activity_map",
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
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      check_in: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      check_out: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      checking_attendence: {
        type: Sequelize.INTEGER,
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
      tableName: "youth_union_member_activity_maps",
    }
  );

  // Associations
  YouthUnionMemberActivityMap.associate = (models) => {
    YouthUnionMemberActivityMap.belongsTo(models.youth_union_member, {
      foreignKey: "member_id",
      as: "member",
    });

    YouthUnionMemberActivityMap.belongsTo(models.activity, {
      foreignKey: "activity_id",
      as: "activity",
    });
  };

  return YouthUnionMemberActivityMap;
};
