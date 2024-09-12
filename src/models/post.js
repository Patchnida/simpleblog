import mongoose, {Schema} from "mongoose";

const postSchema = new Schema (
    {
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
      },
      img: {
        type: String,
      },
      writer: {
        type: String,
      },
      writerImg: {
        type: String,
      },
    },
    
    { timestamps: true } // สร้างวันเวลาที่มีการเพิ่มข้อมูลในโดยอัตโนมัติ
  );

  export const Post = mongoose.models.Post|| mongoose.model("Post", postSchema);