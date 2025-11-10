module.exports = (sequelize, Sequelize) => {
  const Key = sequelize.define(
    "key",
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
      token: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      is_revoke: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      is_use: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      expires: {
        type: Sequelize.DATE,
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
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "keys",
    }
  );

  // Association với youth_union_members (nếu model đó đã có)
  Key.associate = (models) => {
    Key.belongsTo(models.youth_union_member, {
      foreignKey: "member_id",
      as: "member",
    });
  };

  return Key;
};
