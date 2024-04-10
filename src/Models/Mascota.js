const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "UserMascota",
    {
      id: { type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images:{
        type: DataTypes.ARRAY(DataTypes.STRING),
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

      aggressiveness: { type: DataTypes.BOOLEAN,
        allowNull: false
       },

      genre: { type: DataTypes.STRING,
       allowNull: false 
      },

      raze: { type: DataTypes.STRING,
        allowNull: false,
      },
      size: { type: DataTypes.STRING,
        allowNull: false,
      },

      coexistence: { type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
