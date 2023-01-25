import React, { useState } from 'react';
import { AnswersItem } from '@/components/Forum/Answers/AnswersItem';
import { IPropsAnswer } from "@/components/Forum/types";

export const Answers = ({ answers }: IPropsAnswer) => {
  const [comment, setComment] = useState('');
  const addComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = {
      owner: {
        reputation: null,
        user_id: null,
        user_type: 'registered',
        profile_image: '/avatar',
        display_name: 'Abhishek Dutt',
        link: '/users/14291243/abhishek-dutt',
      },
      text: comment,
    };
    setComment('');
  };
  const onChangeTextArea = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <div>
      {answers && answers?.map((answer) => (
        <AnswersItem key={answer.id} answer={answer} />
      ))}
      <div className="mx-auto w-full flex-col border-b-2 border-r-2 border-gray-200 sm:rounded-lg sm:px-4 sm:py-4 sm:shadow-sm">
        <form className="m-auto flex w-[60vw] flex-col rounded-lg">
          <div className="-mx-3 mb-6 ">
            <h2 className="pt-3 pb-2 text-lg text-gray-800 ">Add a new comment</h2>
            <textarea
              onChange={onChangeTextArea}
              value={comment}
              placeholder="Add your comment..."
              className="h-[120px] w-full resize-none rounded-md border-[0.1px] border-[#9EA5B1] p-2 focus:outline-1 focus:outline-blue-500 "
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button onClick={addComment} className="btn">
              Button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
