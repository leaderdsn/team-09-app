import React, { useState } from 'react';
import { AnswersItem } from '@/components/Forum/Answers/AnswersItem';
import { IPropsAnswer } from "@/components/Forum/types";

export const Answers = ({ answers }: IPropsAnswer) => {
  const [comment, setComment] = useState('');
  const addComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = {
      id: new Date(),
      owner: {
        account_id: 18716710,
        reputation: 1220,
        user_id: 14291243,
        user_type: 'registered',
        profile_image: 'https://i.stack.imgur.com/GKu79.png?s=256&g=1',
        display_name: 'Abhishek Dutt',
        link: 'https://stackoverflow.com/users/14291243/abhishek-dutt',
      },
      creation_date: 1667546643,
      score: 55,
      text: comment,
    };
    console.log(params);
    setComment('');
  };
  const onChangeTextArea = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <div>
      {answers?.map((answer) => (
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
