const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "UserMascota",
    {
      id: { type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      image: { type: DataTypes.STRING,
         allowNull: false 
        },

      name: { type: DataTypes.STRING,
         allowNull: false
        },

      type: { type: DataTypes.STRING,
         allowNull: false 
        },

      age: { type: DataTypes.INTEGER,
         allowNull: false
         },

      aggressiveness: { type: DataTypes.ENUM("yes", "no"),
        allowNull: false
       },

      genre: { type: DataTypes.ENUM("he", "she"),
       allowNull: false 
      },

      raze: { type: DataTypes.STRING,
        allowNull: false,
      },
      size: { type: DataTypes.INTEGER,
        allowNull: false,
      },

      coexistence: { type: DataTypes.ENUM("yes", "no"),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
