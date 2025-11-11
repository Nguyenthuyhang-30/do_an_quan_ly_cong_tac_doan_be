module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
      tableName: "roles",
    }
  );

  // Associations (nếu cần, ví dụ với role_permissions và member_roles)
  Role.associate = (models) => {
    Role.hasMany(models.RolePermission, {
      foreignKey: "role_id",
      as: "role_permissions",
    });

    Role.hasMany(models.MemberRole, {
      foreignKey: "role_id",
      as: "member_roles",
    });
  };

  return Role;
};
