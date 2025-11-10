module.exports = (sequelize, Sequelize) => {
  const RolePermission = sequelize.define(
    "role_permission",
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
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "role_permissions",
    }
  );

  // Associations
  RolePermission.associate = (models) => {
    RolePermission.belongsTo(models.role, {
      foreignKey: "role_id",
      as: "role",
    });

    RolePermission.belongsTo(models.permission, {
      foreignKey: "permission_id",
      as: "permission",
    });
  };

  return RolePermission;
};
