module.exports = (sequelize, Sequelize) => {
  const YouthUnionMember = sequelize.define(
    "youth_union_member",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      user_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      password_hash: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      is_email_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      join_date: {
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
      avatar_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      student_code: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      facebook_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      zalo: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "youth_union_members",
    }
  );

  // Associations
  YouthUnionMember.associate = (models) => {
    YouthUnionMember.hasMany(models.member_review, {
      foreignKey: "member_id",
      as: "reviews",
    });

    YouthUnionMember.hasMany(models.member_role, {
      foreignKey: "member_id",
      as: "roles",
    });

    YouthUnionMember.hasMany(models.member_token, {
      foreignKey: "member_id",
      as: "tokens",
    });

    YouthUnionMember.hasMany(models.audit_log, {
      foreignKey: "member_id",
      as: "audit_logs",
    });

    YouthUnionMember.hasMany(models.file_upload, {
      foreignKey: "member_id",
      as: "file_uploads",
    });

    YouthUnionMember.hasMany(models.key, {
      foreignKey: "member_id",
      as: "keys",
    });

    YouthUnionMember.hasMany(models.youth_union_member_activity_map, {
      foreignKey: "member_id",
      as: "activity_maps",
    });

    YouthUnionMember.hasMany(models.youth_union_member_branch_history, {
      foreignKey: "member_id",
      as: "branch_histories",
    });
  };

  return YouthUnionMember;
};
