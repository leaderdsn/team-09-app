import { useEffect, useState } from 'react';
import { Questions } from '@/components/Forum/Questions/Questions';
import Services from '@/services/services';
import { Answers } from '@/components/Forum/Answers/Answers';
import { TopicsAnswer } from '@/components/Forum/types';
import { BiArrowBack } from 'react-icons/bi';

export const Forum = () => {
  const [listTopics, setListTopics] = useState([]);
  const [listAnswers, setListAnswers] = useState<null | TopicsAnswer>();
  const [listAnswersAll, setListAnswersAll] = useState<[]>();
  const [showAnswers, setShowAnswers] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTopicId, setSelectedTopicId] = useState<null | string>(null);

  useEffect(() => {
    const fetchServerData = async () => {
      const responseTasksListAction = await Services.getTasksListAction();
      setListTopics(responseTasksListAction);
      const responseAnswersAll = await Services.getAnswersAll();
      setListAnswersAll(responseAnswersAll);
    };
    fetchServerData();
  }, []);

  const getAnswers = async (id: string) => {
    const response = await Services.getAnswers(id);
    setListAnswers(response);
  };

  const chooseTopic = (id: string) => {
    setSelectedTopicId(id);
    getAnswers(id);
    setShowAnswers(true)
  };

  const updateState = async () => {
    const response = await Services.getTasksListAction();
    setListTopics(response);
  };

  const updateStateAnswer = async (id: string) => {
    const response = await Services.getAnswers(id);
    setListAnswers(response);
  };

  const comeBack = () => {
    setListAnswers(null);
    setShowAnswers(false)
  };
  
  return (
    <div>
      <div className="container  m-auto">
        {showAnswers && listAnswers ? (
          <>
            <button onClick={comeBack} className="flex items-center">
              <BiArrowBack />
              <span className="ml-2">Вернуться к списку тем</span>
            </button>{' '}
            <Answers answers={listAnswers.answer} questionId={listAnswers.id} updateState={updateStateAnswer} />
          </>
        ) : (
          <Questions questions={listTopics} chooseTopic={chooseTopic} updateState={updateState}/>
        )}
      </div>
    </div>
  );
};
