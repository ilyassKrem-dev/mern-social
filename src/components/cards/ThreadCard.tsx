
import Link from "next/link";
import Image from "next/image";
import { RiHeartLine, RiReplyLine, RiShareLine } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { formatDateString } from "@/lib/utils";
import LikeButton from "@/assets/other/LikeButton";
interface Props {
  id: string;
  currentUserId: string;
  checkLike:boolean | undefined;
  likes:number;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    id: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard =  ({
  id,
  currentUserId,
  checkLike,
  likes,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  
  return (
    <article
      className={`flex w-full flex-col rounded-xl  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 960px"
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="w-full flex flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className=" cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}>
              <div className="flex gap-3.5">
                <div className="flex flex-col gap-1 items-center">
                  <LikeButton 
                  id={id.toString()} 
                  userId={currentUserId}
                  checkLike={checkLike}/>
                  {likes>0&&
                  <p className=" text-[0.7rem] text-gray-1">
                    {likes >= 1000000
                    ? `${(likes / 1000000).toFixed()}m`
                    : likes >= 1000
                    ? `${(likes / 1000).toFixed()}k`
                    : likes}
                  </p>}
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <Link href={`/thread/${id}`}>
                    <FaRegCommentDots className=" text-gray-600 text-heading3-bold cursor-pointer hover:text-blue transition-all duration-300" />
                  </Link>
                  {comments.length>0&&
                  <p className=" text-[0.7rem] text-gray-1">
                    {comments.length >= 1000000
                    ? `${(comments.length / 1000000).toFixed()}`
                    : comments.length >= 1000
                    ? `${(comments.length / 1000).toFixed()}k`
                    : comments.length}
                  </p>}
                </div>
                <RiReplyLine className=" text-gray-600 text-heading3-bold cursor-pointer rotate-180 hover:text-green-500 transition-all duration-300" />
                <RiShareLine className=" text-gray-600 text-heading3-bold cursor-pointer hover:text-purple-500 transition-all duration-300" />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1 cursor-pointer">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/*Delete thread */}
        {/*Show comments logos */}

            
      </div>
        {!isComment && community && (
            <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
                <p className="text-subtle-medium text-gray-1 cursor-pointer">
                    {formatDateString(createdAt)}
                    {" "}- {community.name} Community
                </p>
                <Image
                src={community.image}
                alt={community.name}
                width={14}
                height={14}
                className="ml-1 rounded-full object-cover"
                />
            </Link>
        )}
    </article>
  );
};

export default ThreadCard;
