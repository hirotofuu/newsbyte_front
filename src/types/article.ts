export type Article={
  id: string,
  content: string,
  title: string,
  medium: number,
  user_id: string,
  id_name: string
  comment_ok: boolean,
  is_open_flag: boolean,
  tags_out: string,
  name: string,
  avatar: string
};

export type Comment={
  id: string,
  comment: string,
  user_id: string,
  name?: string,
  avatar?: string
};