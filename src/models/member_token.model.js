module.exports = (sequelize, Sequelize) => {
  const MemberToken = sequelize.define(
    "member_token",
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
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      login_provider: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      modified_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
      tableName: "member_tokens",
    }
  );

  // Association với youth_union_members
  MemberToken.associate = (models) => {
    MemberToken.belongsTo(models.YouthUnionMember, {
      foreignKey: "member_id",
      as: "member",
    });
  };

  return MemberToken;
};
