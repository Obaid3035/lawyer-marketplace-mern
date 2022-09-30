const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const authValidation = {
  name: {
    required: {
      value: true,
      message: "Name cannot be empty",
    },
  },
  firmName: {
    required: {
      value: true,
      message: "Attorney Name cannot be empty",
    },
  },
  firmUrl: {
    required: {
      value: true,
      message: "Attorney Url cannot be empty",
    },
  },
  address: {
    required: {
      value: true,
      message: "Address cannot be empty",
    },
  },
  nic: {
    required: {
      value: true,
      message: "ID cannot be empty",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email cannot be empty",
    },
    pattern: {
      value: regex.email,
      message: "Email is not valid",
    },
  },
  phone: {
    required: {
      value: true,
      message: "Phone number cannot be empty",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password cannot be empty",
    },
    minLength: {
      value: 8,
      message: "Password length must be greater than 7",
    },
  },
  resume: {
    required: {
      value: true,
      message: "Resume cannot be empty",
    },
  },
};

export const cmsValidation = {
  image: {
    required: "Please select any image",
  },
  email: {
    required: {
      value: true,
      message: "Email cannot be empty",
    },
    pattern: {
      value: regex.email,
      message: "Email is not valid",
    },
  },

  heading: {
    required: {
      value: true,
      message: "Heading cannot be empty",
    },
  },
  heading_2: {
    required: {
      value: true,
      message: "Heading-2 cannot be empty",
    },
  },
  text: {
    required: {
      value: true,
      message: "Text cannot be empty",
    },
  },
  text_2: {
    required: {
      value: true,
      message: "Text-2 cannot be empty",
    },
  },
  subHeading: {
    required: {
      value: true,
      message: "Sub-Heading cannot be empty",
    },
  },
  point_1: {
    required: {
      value: true,
      message: "Point 1 cannot be empty",
    },
  },
  point_2: {
    required: {
      value: true,
      message: "Point 2 cannot be empty",
    },
  },
  point_3: {
    required: {
      value: true,
      message: "Point 3 cannot be empty",
    },
  },
  point_4: {
    required: {
      value: true,
      message: "Point 4 cannot be empty",
    },
  },

  box_1: {
    required: {
      value: true,
      message: "Box 1 Text cannot be empty",
    },

    subHeading: {
      required: {
        value: true,
        message: "Box 1 Sub-Heading cannot be empty",
      },
    },

    text: {
      required: {
        value: true,
        message: "Box 1 Text cannot be empty",
      },
    },

    point_1: {
      required: {
        value: true,
        message: "Box 1 Point 1 cannot be empty",
      },
    },
    point_2: {
      required: {
        value: true,
        message: "Box 1 Point 2 cannot be empty",
      },
    },
    point_3: {
      required: {
        value: true,
        message: "Box 1 Point 3 cannot be empty",
      },
    },
    point_4: {
      required: {
        value: true,
        message: "Box 1 Point 4 cannot be empty",
      },
    },
  },

  box_2: {
    required: {
      value: true,
      message: "Box 2 Text cannot be empty",
    },
    subHeading: {
      required: {
        value: true,
        message: "Box 2 Sub-Heading cannot be empty",
      },
    },

    text: {
      required: {
        value: true,
        message: "Box 2 Text cannot be empty",
      },
    },

    point_1: {
      required: {
        value: true,
        message: "Box 2 Point 1 cannot be empty",
      },
    },
    point_2: {
      required: {
        value: true,
        message: "Box 2 Point 2 cannot be empty",
      },
    },
    point_3: {
      required: {
        value: true,
        message: "Box 2 Point 3 cannot be empty",
      },
    },
    point_4: {
      required: {
        value: true,
        message: "Box 2 Point 4 cannot be empty",
      },
    },
  },

  box_3: {
    required: {
      value: true,
      message: "Box 3 Text cannot be empty",
    },
    subHeading: {
      required: {
        value: true,
        message: "Box 3 Sub-Heading cannot be empty",
      },
    },

    text: {
      required: {
        value: true,
        message: "Box 3 Text cannot be empty",
      },
    },

    point_1: {
      required: {
        value: true,
        message: "Box 3 Point 1 cannot be empty",
      },
    },
    point_2: {
      required: {
        value: true,
        message: "Box 3 Point 2 cannot be empty",
      },
    },
    point_3: {
      required: {
        value: true,
        message: "Box 3 Point 3 cannot be empty",
      },
    },
    point_4: {
      required: {
        value: true,
        message: "Box 3 Point 4 cannot be empty",
      },
    },
  },

  box_4: {
    required: {
      value: true,
      message: "Box 4 Text cannot be empty",
    },
  },

  box_5: {
    required: {
      value: true,
      message: "Box 5 Text cannot be empty",
    },
  },

  box_6: {
    required: {
      value: true,
      message: "Box 6 Text cannot be empty",
    },
  },

  location: {
    required: {
      value: true,
      message: "Location cannot be empty",
    },
  },
  phone_number: {
    required: {
      value: true,
      message: "Phone number cannot be empty",
    },
  },
};
