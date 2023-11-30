import Frame from "./../components/frame/frame"
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Box } from "@mui/material";
import Meta from "./../components/factor/meta"
export default function Detail() {

  const content = "# このサイトについて\nこのサイトはあらゆる作品の感想や考察を主に扱うテキストベースのブログ投稿サイトです\n# 記事投稿の際のルール\n記事を投稿する際に幾つかのルールがあります\n1. 個人を誹謗中傷する内容を禁ずる\n2. 過度に性的な内容を禁ずる\n3. 過度に暴力的な内容を禁ずる\n4. 個人情報を書くのを禁ずる\n5. あらゆる権利を侵害することを禁ずる\n\nこれらのルールを守って記事は投稿しましょう\n# コメントの際のルール\nコメントする際に幾つかのルールがあります\n1. 個人を誹謗中傷する内容を禁ずる\n2. 過度に性的な内容を禁ずる\n3. 過度に暴力的な内容を禁ずる\n4. 個人情報を書くのを禁ずる\n\nこれらのルールを守ってコメントしましょう"

  const H2 = ({ node, ...props }: any) => {
    return (
      <div>
        <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
      </div>
    );
  };
  const H1 = ({ node, ...props }: any) => {
    return (
      <div>
        <h1 id={node.position?.start.line.toString()}>{props.children}</h1>
      </div>
    );
  };

  

  return (
    <>
      <Meta pageTitle={`このサイトについて`} pageDesc={`このサイトの詳細とルールについて`}></Meta>
      <Box className="mt-6">
        <Frame>
          <ReactMarkdown remarkPlugins={[remarkGfm]}components={{
                h2: H2,
                h1: H1,
              }} className='markdown'>{content}</ReactMarkdown>  
        </Frame>
      </Box>
    </>
  )
}
