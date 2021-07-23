import {Comment} from "./Comment";

export interface Job {
  id: number;
  title: string;
  description: number;
  comments: Comment[];
  noOfComments: number;
  username: string;
}
