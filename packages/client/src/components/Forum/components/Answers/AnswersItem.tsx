import { TopicsAnswer } from '@/components/Forum/interfaces/interfaces';
import {
  BsReply,
  FiEdit,
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/all';
import { useMemo } from 'react';
import { formatDistance, fromUnixTime } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const AnswersItem = ({ answer }: TopicsAnswer) => {
  const formattedDate = useMemo(() => {
    return formatDistance(new Date(fromUnixTime(answer.creation_date)), new Date(), {
      addSuffix: true,
      locale: ru,
    });
  }, [answer.creation_date]);
  const clickHandler = (type: string) => {
    switch (type) {
      case 'reply':
        console.log('reply');
        break;
      case 'edit':
        console.log('edit');
        break;
      case 'delete':
        console.log('delete');
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <section className=" min-w-screen relative flex items-center justify-center  antialiased">
        <div className="container mx-auto px-0 ">
          <div className="mx-auto w-full flex-col border-b-2 border-r-2 border-gray-200  py-4 sm:rounded-lg sm:px-4 sm:py-4 sm:shadow-sm md:px-4 ">
            <div className="group/item flex flex-row">
              <div className="flex flex-col items-center">
                <img
                  className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover"
                  alt="Noob master's avatar"
                  src={answer.owner.profile_image}
                />
                <div className="flex">
                  <button className="btn-ghost btn-xs btn gap-2">
                    <MdKeyboardArrowUp />
                  </button>

                  <span className="flex w-8 items-center justify-center text-center font-medium">
                    {answer.score}
                  </span>
                  <button className="btn-ghost btn-xs btn gap-2">
                    <MdKeyboardArrowDown />
                  </button>
                </div>
              </div>

              <div className="mt-1 w-full flex-col">
                <div className="flex flex-1 items-center justify-between px-4 font-bold leading-tight">
                  <div>
                    {answer.owner.display_name}
                    <span className="ml-2 text-xs font-normal text-gray-500">{formattedDate}</span>
                  </div>
                  <div className="group/edit invisible flex justify-end space-x-2 group-hover/item:visible">
                    <button className="rounded-xl px-1 py-1" onClick={() => clickHandler('reply')}>
                      <BsReply size={20} />
                    </button>

                    <button className="rounded-xl px-1 py-1" onClick={() => clickHandler('edit')}>
                      <FiEdit />
                    </button>

                    <button className="px-1 py-1" onClick={() => clickHandler('delete')}>
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </div>

                <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-gray-600">
                  {answer.text}
                </div>
              </div>
            </div>
            <hr className="my-2 ml-28 border-gray-200" />
            <div className="md-10 ml-28 flex flex-row pt-1">
              <img
                className="h-12 w-12 rounded-full border-2 border-gray-300"
                alt="Emily's avatar"
                src="https://images.unsplash.com/photo-1581624657276-5807462d0a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
              />
              <div className="mt-1 flex-col">
                <div className="flex flex-1 items-center px-4 font-bold leading-tight">
                  Emily
                  <span className="ml-2 text-xs font-normal text-gray-500">{formattedDate}</span>
                </div>
                <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-gray-600">
                  I created it using TailwindCSS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
