module.exports = (sequelize, Sequelize) => {
  const MemberReview = sequelize.define(
    "member_review",
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
      review_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      point: {
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
    },
    {
      timestamps: false,
      tableName: "member_reviews",
    }
  );

  // Association với youth_union_members
  MemberReview.associate = (models) => {
    MemberReview.belongsTo(models.YouthUnionMember, {
      foreignKey: "member_id",
      as: "member",
    });
  };

  return MemberReview;
};
