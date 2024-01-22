// 記事、コメント用の型

export type Article={
  id: number,
  content: string,
  title: string,
  medium: number,
  user_id: number,
  id_name: string
  comment_ok: boolean,
  is_open_flag: boolean,
  tagss_out: string,
  name: string,
  profile: string
  avatar: string,
  created_at: string,
  updated_at: string
};

export type Comment={
  id: string,
  comment: number,
  user_id: number,
  user_name: string,
  article_id: number,
  article_user_id: string,
  name?: string,
  created_at: string,
  updated_at: string
};