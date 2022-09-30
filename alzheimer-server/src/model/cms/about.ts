import {model, Schema} from "mongoose";
import {IAbout} from "../../interface";

const AboutSchema: Schema<IAbout> = new Schema({
    section_1: {

        text: {
            type: String,
            default: ""
        },
        image: {
            url: String,
            cloudinary_id: String,

        }
    },
    section_2: {
        heading: {
            type: String,
            default: ""
        },
        point_1: {
            type: String,
            default: ""
        },
        point_2: {
            type: String,
            default: ""
        },
        point_3: {
            type: String,
            default: ""
        },
        image: {
            url: String,
            cloudinary_id: String,
        },
    },
    section_3: {
        heading: {
            type: String,
            default: ""
        },
        box_1: {
            type: String,
            default: ""
        },
        box_2: {
            type: String,
            default: ""
        },
        box_3: {
            type: String,
            default: ""
        },
        box_4: {
            type: String,
            default: ""
        },
        box_5: {
            type: String,
            default: ""
        },
        box_6: {
            type: String,
            default: ""
        },
    },
    section_4: {
        heading: {
            type: String,
            default: ""
        },
        box_1: {
            subHeading: {
                type: String,
                default: ""
            },
            text: {
                type: String,
                default: ""
            },
            point_1: {
                type: String,
                default: ""
            },
            point_2: {
                type: String,
                default: ""
            },
            point_3: {
                type: String,
                default: ""
            },
            point_4: {
                type: String,
                default: ""
            }
        },
        box_2: {
            subHeading: {
                type: String,
                default: ""
            },
            text: {
                type: String,
                default: ""
            },
            point_1: {
                type: String,
                default: ""
            },
            point_2: {
                type: String,
                default: ""
            },
            point_3: {
                type: String,
                default: ""
            },
            point_4: {
                type: String,
                default: ""
            }
        },
        box_3: {
            subHeading: {
                type: String,
                default: ""
            },
            text: {
                type: String,
                default: ""
            },
            point_1: {
                type: String,
                default: ""
            },
            point_2: {
                type: String,
                default: ""
            },
            point_3: {
                type: String,
                default: ""
            },
            point_4: {
                type: String,
                default: ""
            }
        }
    },
    section_5: {
        heading: {
            type: String,
            default: ""
        },
        point_1: {
            type: String,
            default: ""
        },
        point_2: {
            type: String,
            default: ""
        },
        point_3: {
            type: String,
            default: ""
        },
        image: {
            url: String,
            cloudinary_id: String
        }
    },
})
const About = model<IAbout>("about", AboutSchema)

export default About
