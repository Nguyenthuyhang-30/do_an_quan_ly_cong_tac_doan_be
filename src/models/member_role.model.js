module.exports = (sequelize, Sequelize) => {
  const MemberRole = sequelize.define(
    "member_role",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assigned_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
      tableName: "member_roles",
    }
  );

  // Associations
  MemberRole.associate = (models) => {
    MemberRole.belongsTo(models.YouthUnionMember, {
      foreignKey: "member_id",
      as: "member",
    });

    MemberRole.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });
  };

  return MemberRole;
};
