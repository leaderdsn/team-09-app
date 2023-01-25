import { useEffect, useState } from 'react';
import { Questions } from '@/components/Forum/Questions/Questions';
import Services from '@/services/services';
import { Answers } from '@/components/Forum/Answers/Answers';
import { BiArrowBack } from 'react-icons/bi';

export const Forum = () => {
  const [listTopics, setListTopics] = useState([]);
  const [listAnswers, setListAnswers] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTopicId, setSelectedTopicId] = useState(-1);

  useEffect(() => {
    const fetchServerData = async () => {
      const response = await Services.getTasksListAction();
      setListTopics(response);
    };
    fetchServerData();
  }, []);
  const getAnswers = async (id: number) => {
    const response = await Services.getAnswers(id);
    setListAnswers(response);
  };
  const chooseTopic = (id: number) => {
    setSelectedTopicId(id);
    getAnswers(id);
  };

  const updateState = async () => {
    const response = await Services.getTasksListAction();
    console.log('updateState', response)
    setListTopics(response);
  };

  const comeBack = () => {
    setListAnswers([]);
  };
  return (
    <div>
      <div className="container  m-auto">
        {listAnswers.length ? (
          <>
            <button onClick={comeBack} className="flex items-center">
              <BiArrowBack />
              <span className="ml-2">Вернуться к списку тем</span>
            </button>{' '}
            <Answers answers={listAnswers} />
          </>
        ) : (
          <Questions questions={listTopics} chooseTopic={chooseTopic} updateState={updateState} />
        )}
      </div>
    </div>
  );
};
