import { QuestionsItem } from '@/components/Forum/Questions/QuestionsItem';
import { IPropsQuestion } from '@/components/Forum/types';
import { AiOutlineEye } from 'react-icons/ai/index.js';
import { RiQuestionAnswerLine } from 'react-icons/ri/index.js';
import React, { useState } from 'react';
import Services from '@/services/services';

export const Questions = ({ questions, chooseTopic, updateState }: IPropsQuestion) => {
  const [topic, setTopic] = useState('');
  const addTopic = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = {
      id: Date.now(),
      tags: ['swiftui'],
      owner: {
        account_id: 2093075,
        reputation: 9615,
        user_id: 1862434,
        user_type: 'registered',
        accept_rate: 88,
        profile_image:
          'https://www.gravatar.com/avatar/23870fa310a75637e2d47f47571f61d8?s=256&d=identicon&r=PG&f=1',
        display_name: 'Asim Roy',
        link: 'https://stackoverflow.com/users/1862434/asim-roy',
      },
      is_answered: true,
      view_count: 5938,
      accepted_answer_id: 61345344,
      answer_count: 3,
      score: 9,
      last_activity_date: 1667587024,
      creation_date: Math.floor(Date.now() / 1000),
      last_edit_date: 1587476748,
      link: 'https://stackoverflow.com/questions/61344676/how-to-create-a-see-through-rectangle-in-swiftui',
      title: topic,
    };
    console.log(params);
    Services.addTopic(params).then(() => updateState());
    setTopic('');
  };
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
  };
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my-modal-4" className="btn">
        Создать
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Создание новой темы</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia for
            free!
          </p>
          <textarea
            onChange={onChangeTextArea}
            value={topic}
            placeholder="Add your comment..."
            className="h-[120px] w-full resize-none rounded-md border-[0.1px] border-[#9EA5B1] p-2 focus:outline-1 focus:outline-blue-500 "
          ></textarea>
          <div className="flex justify-end">
            <button onClick={addTopic} className="btn">
              Button
            </button>
          </div>
        </label>
      </label>
      <div className="overflow-x-auto">
        <div className="w-full ">
          <div className="my-1 overflow-x-auto rounded shadow-md">
            <table className="w-full min-w-max table-auto">
              <thead>
                <tr className="bg-gray-200 text-sm uppercase leading-normal ">
                  <th className="py-3 px-6 text-center">Рейтинг</th>
                  <th className="py-3 px-6 text-left ">Тема</th>
                  <th className="py-3 px-6 text-center">Автор</th>
                  <th className="py-3 px-6 text-center">Пользователи</th>
                  <th className="py-3 px-6 text-center">Статус</th>
                  <th className="flex justify-center py-3 px-6">
                    <AiOutlineEye size={25} />
                  </th>
                  <th className="py-3 px-6 text-center">
                    <RiQuestionAnswerLine size={20} />
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600">
                {questions && questions.map((item) => (
                  <QuestionsItem key={item.id} item={item} chooseTopic={chooseTopic} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
