import React, { useState } from 'react';
import { AnswersItem } from '@/components/Forum/Answers/AnswersItem';
import { IPropsAnswers } from "@/components/Forum/types";
import Services from '@/services/services';

export const Answers = ({ answers, questionId, updateState }: IPropsAnswers) => {
  const [comment, setComment] = useState('');
  const addComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = {
      questionId,
      ownerId: 'a58f3243-9f16-49a8-85ef-8c68a3dab07d',
      text: comment,
    };
    Services.addComment(params).then(() => updateState(questionId!));
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
            <h2 className="pt-3 pb-2 text-lg text-gray-800 ">Добавить новый комментарий</h2>
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
