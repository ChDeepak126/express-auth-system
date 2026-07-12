export const createMonsterValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Name must be between 5 and 32 characters",
    },
  },

  position: {
    notEmpty: {
      errorMessage: "Position cannot be empty",
    },
    isString: {
      errorMessage: "Position must be a string",
    },
  },

  bounty: {
    notEmpty: {
      errorMessage: "Bounty cannot be empty",
    },
    isInt: {
      errorMessage: "Bounty must be an integer",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password cannot be empty",
    }
  }
};